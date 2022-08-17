import Papa from "papaparse";
import axios from "axios";
import { parseNumber } from "./util";
import { RegionType, ScrapeItem, Scraper } from "./scraper";
import { getFIPSByStateName } from "./util";

type CSVData = {
  Location: string;
  Cases: string;
  "Case Range": number;
  AsOf: string;
};

export default class US_CDC implements Scraper {
  async run() {
    const { data } = await axios.get(
      "https://www.cdc.gov/wcms/vizdata/poxvirus/monkeypox/data/USmap_counts.csv"
    );

    const csvData = Papa.parse<CSVData>(data, { header: true });

    return csvData.data
      .filter((cdcEntry) => cdcEntry.Location !== "")
      .map((cdcEntry) => {
        if (cdcEntry.Location === "Total") {
          return {
            geoid: `US`,
            country: "United States", // country name
            region: null,
            cases: parseInt(cdcEntry.Cases),
            region_type: RegionType.COUNTRY,
            source_name: "CDC",
          };
        }
        return {
          geoid: `US-${getFIPSByStateName(cdcEntry.Location)}`,
          country: "United States", // country name
          region: cdcEntry.Location, // geography name
          cases: parseInt(cdcEntry.Cases),
          region_type: RegionType.STATE,
          source_name: "CDC",
        };
      });
  }
}
