import axios from "axios";
import { RegionType, ScrapeItem, Scraper } from "./scraper";
import { getFIPSByCountyName } from "./util";

type CountyEntryData = { CountyName: string; Cases: number }[];

export default class US_IL implements Scraper {
  async run() {
    const { data } = await axios.get<CountyEntryData>(
      "https://idph.illinois.gov/DPHPublicInformation/api/Monkeypox/getMonkeypoxCountyCases"
    );

    const entries: ScrapeItem[] = [];    

    data.forEach((county, i) => {
      const fips = county.CountyName === 'Illinois' ? '17' : getFIPSByCountyName(county.CountyName, "IL");

      if (!county.CountyName || !fips) {
        throw new Error(`Unknown county ${county.CountyName} fips ${fips}!`);
      }
      if (county.Cases < 0 || typeof county.Cases !== 'number') {
        throw new Error(`Bad count ${county.Cases} for ${county.CountyName}!`);
      }

      entries.push({
        country: "United States",
        region_type:
          county.CountyName === "Illinois"
            ? RegionType.STATE
            : county.CountyName === "Chicago"
            ? RegionType.CITY
            : RegionType.COUNTY,
        source_name: "IL DPH",
        region: county.CountyName,
        geoid: `US-${fips}`,
        cases: county.Cases,
      });
    });

    // add Chicago counts to cook county
    const chicagoData = entries.find(c => c.region === 'Chicago')
    if (!chicagoData) {
      throw new Error("Couldn't find Chicago...")
    }
    entries.forEach(c => {
      if (c.region === 'Cook') {
        c.cases += chicagoData?.cases;
      }
    })

    return entries;
  }
}
