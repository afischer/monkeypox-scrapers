import axios from "axios";
import Papa from "papaparse";
import { RegionType, Scraper } from "./scraper";
import { getFIPSByStateName } from "./util";

export default class US_NY_NYC implements Scraper {
  async run() {
    // from https://www1.nyc.gov/site/doh/data/health-tools/monkeypox.page
    const { data } = await axios.get(
      "https://raw.githubusercontent.com/nychealth/monkeypox-data/main/totals/summary-cases.csv"
    );

    const csvData = Papa.parse<[string, string, string]>(data);

    const bxCases = csvData.data.find((x) => x[1] === "boro_bronx");
    const bkCases = csvData.data.find((x) => x[1] === "boro_brook");
    const mnCases = csvData.data.find((x) => x[1] === "boro_manhattan");
    const qnCases = csvData.data.find((x) => x[1] === "boro_queens");
    const siCases = csvData.data.find((x) => x[1] === "boro_statenisland");
    // TODO: pull from html
    // const totalCases = csvData.data.find((x) => x[0] === "total_rpt");

    if (
      !bxCases ||
      !bkCases ||
      !mnCases ||
      !qnCases ||
      !siCases 
      /* || !totalCases*/
    ) {
      throw new Error("Missing boro!");
    }
    
    const baseItem = {
      country: "United States",
      region_type: RegionType.COUNTY,
      source_name: "NYC DOH",
    }

    return [
      // {
      //   ...baseItem,
      //   region_type: RegionType.CITY,
      //   region: "New York City",
      //   geoid: "US-3651000",
      //   cases: parseInt(totalCases[2]),
      // },
      {
        ...baseItem,
        region: "Bronx",
        geoid: "US-36005",
        cases: parseInt(bxCases[2]),
      },
      {
        ...baseItem,
        region: "Kings",
        geoid: "US-36047",
        cases: parseInt(bkCases[2]),
      },
      {
        ...baseItem,
        region: "New York",
        geoid: "US-36061",
        cases: parseInt(mnCases[2]),
      },
      {
        ...baseItem,
        region: "Queens",
        geoid: "US-36081",
        cases: parseInt(qnCases[2]),
      },
      {
        ...baseItem,
        region: "Richmond",
        geoid: "US-36085",
        cases: parseInt(siCases[2]),
      },
    ];
  }
}
