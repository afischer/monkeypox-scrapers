import axios from "axios";
import cheerio from "cheerio";
import { RegionType, ScrapeItem, Scraper } from "./scraper";
import { getFIPSByCountyName } from "./util";

export default class US_MN implements Scraper {
  async run() {
    const { data } = await axios.get(
      "https://www.health.state.mn.us/diseases/monkeypox/stats/index.html"
    );

    const $ = cheerio.load(data);

    const tables = $("table");

    const countyTable = tables.filter((i, el) =>
      $(el).text()?.includes("County")
    );

    const entries: ScrapeItem[] = [];

    // counties
    countyTable.find("tr").each((i, el) => {
      const data = $(el).find("td");
      // skip header row if it's labeled as a body row
      if (i === 0 && $(el).hasClass("table_head_shade")) return;
      if (i === 0 && data.text().startsWith("County")) return;

      if (data.length !== 2) throw new Error("Unknown columns found");

      let countyName = $(data[0]).text().trim();

      if (countyName === "Unknown") return; // skip unknowns

      const fips = countyName.toLowerCase().startsWith("total")
        ? "27"
        : getFIPSByCountyName(countyName, "MN");

      if (!countyName || !fips) {
        throw new Error(`Unknown county ${countyName} fips ${fips}!`);
      }

      // if there's a <5, we can only assume 1 case
      const cases = $(data[1]).text().startsWith("<")
        ? 1
        : parseInt($(data[1]).text().replace(/,/g, ""));
      if (cases !== 0 && !cases) throw new Error("Bad count!");

      const region_type =
        countyName === "Total" ? RegionType.STATE : RegionType.COUNTY;

      if (countyName.toLowerCase().startsWith("total")) {
        countyName = "Minnesota";
      }

      entries.push({
        country: "United States",
        region_type,
        source_name: "MN DOH",
        region: countyName,
        geoid: `US-${fips}`,
        cases,
      });
    });

    // STATEWIDE
    const [_, statewideCases] =
      $("body .well strong")
        .text()
        .match(/(\d+) confirmed cases/i) ?? [];

    if (!statewideCases || !parseInt(statewideCases)) {
      throw new Error("Missing state total!");
    }

    entries.push({
      country: "United States",
      region_type: RegionType.STATE,
      source_name: "MN DOH",
      region: "Minnesotta",
      geoid: `US-27`,
      cases: parseInt(statewideCases),
    });

    return entries;
  }
}
