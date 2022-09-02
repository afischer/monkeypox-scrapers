import axios from "axios";
import cheerio from "cheerio";
import { RegionType, ScrapeItem, Scraper } from "./scraper";
import { getFIPSByCountyName } from "./util";

export default class US_OR implements Scraper {
  async run() {
    const { data } = await axios.get(
      "https://www.oregon.gov/oha/ph/monkeypox/Pages/index.aspx"
    );

    const $ = cheerio.load(data);

    const entries: ScrapeItem[] = [];

    // STATE
    const fullText = $("#ctl00_MainContentPlaceHolder_PageContentPlaceHolder_RichHtmlField5__ControlWrapper_OregonRichHtmlField").text()
    const [_, caseCountTxt] = fullText.match(/Total cases: (\d+)/i) ?? []
    const stateCases = parseInt(caseCountTxt.replace(/,/g, ""));

    if (!stateCases) throw new Error("Could not get state case figure!");

    entries.push({
      country: "United States",
      region_type: RegionType.STATE,
      source_name: "OHA",
      region: "Oregon",
      geoid: `US-41`,
      cases: stateCases,
    });

    // COUNTIES
    $(".ExternalClass83C15C7BD23A4DEEB7B86EBC1FF316CF table tbody tr").each(
      (i, el) => {
        const data = $(el).find("td");
        if (data.length !== 2) throw new Error("Unknown columns found");

        let countyName = $(data[0]).text().trim();
        
        const fips = getFIPSByCountyName(countyName, "OR");

        if (!countyName || !fips) {
          throw new Error(`Unknown county ${countyName} fips ${fips}!`);
        }

        const cases = parseInt($(data[1]).text().replace(/,/g, ""));
        if (!cases) throw new Error("Bad count!");
        
        entries.push({
          country: "United States",
          region_type: RegionType.COUNTY,
          source_name: "OHA",
          region: countyName,
          geoid: `US-${fips}`,
          cases,
        });
      }
    );

    return entries;
  }
}
