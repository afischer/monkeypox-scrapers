import axios from "axios";
import cheerio from "cheerio";
import { RegionType, ScrapeItem, Scraper } from "./scraper";
import { getFIPSByCountyName } from "./util";

export default class US_NY implements Scraper {
  async run() {
    const { data } = await axios.get(
      "https://www.health.ny.gov/diseases/communicable/zoonoses/monkeypox/"
    );

    const $ = cheerio.load(data);

    const entries: ScrapeItem[] = [];

    $(".box table tr").each((i, el) => {
      if (i === 0) return;

      const data = $(el).find("td");
      if (data.length !== 2) throw new Error("Unknown columns found");

      let countyName = $(data[0]).text();

      const fips =
        countyName === "Total" ? "36" : getFIPSByCountyName(countyName, "NY");

      if (!countyName || !fips) {
        throw new Error(`Unknown county ${countyName} fips ${fips}!`);
      }

      const cases = parseInt($(data[1]).text().replace(/,/g, ""));
      if (!cases) throw new Error("Bad count!");

      const region_type =
        countyName === "Total"
          ? RegionType.STATE
          : countyName === "NYC"
          ? RegionType.CITY
          : RegionType.COUNTY;

      if (countyName === "NYC") countyName = "New York City";
      if (countyName === "Total") countyName = "New York";

      entries.push({
        country: "United States",
        region_type,
        source_name: "NY DOH",
        region: countyName,
        geoid: `US-${fips}`,
        cases,
      });
    });

    return entries;
  }
}
