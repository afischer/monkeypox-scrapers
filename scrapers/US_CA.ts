import axios from "axios";
import cheerio from "cheerio";
import { RegionType, ScrapeItem, Scraper } from "./scraper";
import { getFIPSByCountyName } from "./util";

export default class US_NY implements Scraper {
  async run() {
    const { data } = await axios.get(
      "https://www.cdph.ca.gov/Programs/CID/DCDC/Pages/Monkeypox-Data.aspx"
    );

    const $ = cheerio.load(data);

    const entries: ScrapeItem[] = [];

    const tables = $(".ms-rteTable-4");

    // CITY/COUNTY CASES
    const countyTable = tables.filter((i, el) =>
      $(el).text()?.includes("Local Health Jurisdiction")
    );

    // Some cities are their own "Local Health Jurisdictions," so we need to 
    // add them as well as push a city
    const cityParentCounties: Record<string, string> = {
      "Long Beach": "Los Angeles",
      Berkeley: "Alameda",
      "Pasadena": "Los Angeles",
    };

    const knownCities = new Set(Object.keys(cityParentCounties))

    const additionalCasesFromCities: Record<string, number> = {};

    countyTable.find("tr").each((i, el) => {
      if (i === 0) return;

      const data = $(el).find("td");

      if (data.length !== 2) throw new Error("Unknown columns found");

      let geoName = $(data[0]).text().trim().replace(/[\u200B-\u200D\uFEFF]/g, "");

      const fips = getFIPSByCountyName(geoName.trim(), "CA");

      if (!geoName || !fips) {
        throw new Error(`Unknown county ${geoName} fips ${fips}!`);
      }

      const cases = $(data[1]).text().includes("<")
        // if we have <11, we can only assume there's at least one case.
        ? 1
        : parseInt(
            $(data[1])
              .text()
              // zero width spaces, commas, stars, less than
              .replace(/[\u200B-\u200D\uFEFF]|,|\*|</g, "")
          );
      if (!cases) throw new Error("Bad count!");

      let region_type = RegionType.COUNTY;

      // add cases to map of 
      if (knownCities.has(geoName)) {
        region_type = RegionType.CITY;
        const parentCountyName = cityParentCounties[geoName];
        if (!additionalCasesFromCities[parentCountyName]) {
          additionalCasesFromCities[parentCountyName] = 0;
        }
        additionalCasesFromCities[parentCountyName] += cases;
      }

      entries.push({
        country: "United States",
        region_type,
        source_name: "CA CPDH",
        region: geoName,
        geoid: `US-${fips}`,
        cases,
      });
    });

    // before returning, add additional cases from cities
    entries.forEach(entry => {
      if (!entry.region) return;
      const additionalCases = additionalCasesFromCities[entry.region];
      if (additionalCases) {
        entry.cases += additionalCases;
      }
    })


    // STATEWIDE CASES
    const statewideTable = tables.filter((i, el) =>
      $(el).text()?.includes("Statewide Cases")
    );

    const statewideCasesEl = $(statewideTable).find('tr:nth-child(2)');

    const statewideCases = parseInt(
      statewideCasesEl
        .text()
        .replace(/[\u200B-\u200D\uFEFF]|,|\*|</g, ""))
    
    entries.push({
      country: "United States",
      region_type: RegionType.STATE,
      source_name: "CA CPDH",
      region: "California",
      geoid: `US-06`,
      cases: statewideCases,
    });

    // return!
    return entries;
  }
}
