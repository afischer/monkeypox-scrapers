import axios from "axios";
import { parseNumber } from "./util";
import { RegionType, ScrapeItem, Scraper } from "./scraper";
import { getFIPSByStateName } from "./util";

export default class US_CDC implements Scraper {
  async run() {
    const { data } = await axios.get(
      "https://www.cdc.gov/poxvirus/monkeypox/response/modules/MX-response-case-count-US.json"
    );

    const entries: { State: string; Cases: number }[] = data.data;
    // sometimes they throw in a string as a number...
    entries.forEach(entry => {entry.Cases = parseNumber(entry.Cases)});
    
    const usaTotal = entries.reduce((acc, curr) => (acc += curr.Cases), 0);

    return [
      {
        geoid: "US",
        country: "United States",
        region: null,
        cases: usaTotal,
        region_type: RegionType.COUNTRY,
        source_name: "CDC",
      },
      ...entries.map((cdcEntry) => ({
        geoid: `US-${getFIPSByStateName(cdcEntry.State)}`,
        country: "United States", // country name
        region: cdcEntry.State, // geography name
        cases: typeof cdcEntry.Cases === 'string' ? parseInt(cdcEntry.Cases) : cdcEntry.Cases,
        region_type: RegionType.STATE,
        source_name: "CDC",
      })),
    ];
  }
}
