import axios from "axios";
import cheerio from "cheerio";
import { RegionType, ScrapeItem, Scraper } from "./scraper";
import { getFIPSByCountyName } from "./util";

export default class US_MD implements Scraper {
  async run() {
    const { data } = await axios.get(
      "https://health.maryland.gov/phpa/OIDEOR/Pages/monkeypox.aspx"
    );

    const $ = cheerio.load(data);

    const entries: ScrapeItem[] = [];    

    const tables = $("table.contenttable");

    const countyTable = tables.filter((i, el) =>
      $(el).text()?.includes("County")
    );
    
    countyTable.find("tr").each((i, el) => {
      const data = $(el).find("td");
      // skip header row if it's labeled as a body row
      if (i === 0 && data.text().startsWith('County')) return;

      // county name, count, percentage
      if (data.length !== 3) throw new Error("Unknown columns found");

      // normalize some saints, 's, etc, zero width spaces
      let countyName = $(data[0])
        .text()
        .trim()
        .replace(/[\u200B-\u200D\uFEFF]|,/g, "")
        .replace(/ County$/i, "")
        .replace("Saint", "St.")
        .replace(/'s$/, "")

      const fips = countyName.toLowerCase().startsWith("total")
        ? "24"
        : getFIPSByCountyName(countyName, "MD");

      if (!countyName || !fips) {
        throw new Error(`Unknown county ${countyName} fips ${fips}!`);
      }

      // suppressing <10 cases, but showing all counties so we must assume no cases for now.
      if ($(data[1]).text() === '*') return;

      const cases = parseInt($(data[1]).text().replace(/,/g, ""));
      if (!cases) throw new Error("Bad count!");

      const region_type =
        countyName === "Total" ? RegionType.STATE : RegionType.COUNTY;

      if (countyName.toLowerCase().startsWith("total")) {
        countyName = "Maryland";
      }

      entries.push({
        country: "United States",
        region_type,
        source_name: "MD DOH",
        region: countyName,
        geoid: `US-${fips}`,
        cases,
      });
    });

    return entries;
  }
}
