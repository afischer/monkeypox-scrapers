import axios from "axios";
import cheerio from "cheerio";
import { RegionType, ScrapeItem, Scraper } from "./scraper";
import { getFIPSByCountyName } from "./util";

export default class US_MI implements Scraper {
  async run() {
    const { data } = await axios.get(
      "https://www.michigan.gov/mdhhs/keep-mi-healthy/communicablediseases/diseasesandimmunization/mpv"
    );

    const $ = cheerio.load(data);

    const entries: ScrapeItem[] = [];

    const tables = $("table");

    // CITY/COUNTY CASES
    const countyTable = tables.filter((i, el) =>
      $(el).text()?.includes("Jurisdiction")
    );

    // Some cities are their own "Local Health Jurisdictions," so we need to
    // add them as well as push a city
    const cityParentCounties: Record<string, string> = {
      "Detroit City": "Wayne",
    };

    const knownCities = new Set(Object.keys(cityParentCounties));

    const additionalCasesFromCities: Record<string, number> = {};

    countyTable.find("tr").each((i, el) => {
      if (i === 0) return;

      const data = $(el).find("td");

      // Jurisdiction, Cumulative, Cases referred in last 14 days
      if (data.length !== 3) throw new Error("Unknown columns found");

      let geoName = $(data[0])
        .text()
        .trim()
        .replace(/[\u200B-\u200D\uFEFF]/g, "");

      // some name fixes
      if (geoName === "Total") geoName = "Michigan";
      if (geoName.startsWith("St ")) geoName = geoName.replace("St ", "St. ");
      
      const fips =
        geoName === "Michigan"
          ? "26"
          : getFIPSByCountyName(geoName.trim(), "MI");

      if (!geoName || !fips) {
        throw new Error(`Unknown county ${geoName} fips ${fips}!`);
      }

      const cases = parseInt($(data[1]).text())
      if (!cases) throw new Error("Bad count!");

      let region_type =
        geoName === "Michigan" ? RegionType.STATE : RegionType.COUNTY;

      // build cumulative parent county counts for cities
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
        source_name: "MDDHS",
        region: geoName,
        geoid: `US-${fips}`,
        cases,
      });
    });

    // before returning, add additional cases from cities
    entries.forEach((entry) => {
      if (!entry.region) return;
      const additionalCases = additionalCasesFromCities[entry.region];
      if (additionalCases) {
        entry.cases += additionalCases;
      }
    });

    // return!
    return entries;
  }
}
