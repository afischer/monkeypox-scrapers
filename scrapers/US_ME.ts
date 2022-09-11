import axios from "axios";
import cheerio from "cheerio";
import { RegionType, ScrapeItem, Scraper } from "./scraper";
import { getFIPSByCountyName } from "./util";

export default class US_ME implements Scraper {
  async run() {
    const { data } = await axios.get(
      "https://www.maine.gov/dhhs/mecdc/infectious-disease/epi/zoonotic/monkeypox.shtml#cases"
    );

    const $ = cheerio.load(data);

    const entries: ScrapeItem[] = [];    

    // covidBlok lol
    $(".covidBlok table.cases tbody tr").each((i, el) => {
      const data = $(el).find("td");
      // skip header row if it's labeled as a body row
      if (i === 0 && data.text().startsWith('County')) return;

      if (data.length !== 2) throw new Error("Unknown columns found");

      let countyName = $(data[0]).text().trim();

      const fips = countyName.toLowerCase().startsWith("total")
        ? "23"
        : getFIPSByCountyName(countyName, "ME");

      if (!countyName || !fips) {
        throw new Error(`Unknown county ${countyName} fips ${fips}!`);
      }

      const cases = parseInt($(data[1]).text().replace(/,/g, ""));
      if (!cases) throw new Error("Bad count!");

      const region_type =
        countyName === "Total" ? RegionType.STATE : RegionType.COUNTY;

      if (countyName.toLowerCase().startsWith("total")) {
        countyName = "Maine";
      }

      entries.push({
        country: "United States",
        region_type,
        source_name: "ME DHHS",
        region: countyName,
        geoid: `US-${fips}`,
        cases,
      });
    });

    return entries;
  }
}
