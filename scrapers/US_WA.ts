import axios from "axios";
import cheerio from "cheerio";
import { RegionType, ScrapeItem, Scraper } from "./scraper";
import { getFIPSByCountyName } from "./util";

export default class US_WA implements Scraper {
  async run() {
    const { data } = await axios.get(
      "https://doh.wa.gov/you-and-your-family/illness-and-disease-z/monkeypox/monkeypox-mpv-data"
    );

    const $ = cheerio.load(data);

    const entries: ScrapeItem[] = [];    

    const tables = $("table.tablesaw-stack");

    // CITY/COUNTY CASES
    const countyTable = tables.filter((i, el) =>
      $(el).text()?.includes("Number of cases")
    );

    countyTable.find("tbody tr").each((i, el) => {
      const data = $(el).find("td");
      
      if (data.length !== 2) throw new Error("Unknown columns found");

      let countyName = $(data[0]).text().trim();

      const fips = countyName.toLowerCase().startsWith("total")
        ? "53"
        : getFIPSByCountyName(countyName, "WA");

      if (!countyName || !fips) {
        throw new Error(`Unknown county ${countyName} fips ${fips}!`);
      }

      const cases = parseInt($(data[1]).text().replace(/,/g, ""));
      if (!cases) throw new Error("Bad count!");

      const region_type =
        countyName === "Total" ? RegionType.STATE : RegionType.COUNTY;

      if (countyName.toLowerCase().startsWith("total")) {
        countyName = "Washington";
      }

      entries.push({
        country: "United States",
        region_type,
        source_name: "WA DOH",
        region: countyName,
        geoid: `US-${fips}`,
        cases,
      });
    });

    return entries;
  }
}
