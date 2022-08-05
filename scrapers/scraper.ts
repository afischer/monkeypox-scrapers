export enum RegionType {
  COUNTRY = "country",
  STATE = "state",
  COUNTY = "county",
  CITY = "city"
}

export type ScrapeItem = {
  geoid: string; // geography identifier
  country: string; // country name
  region: string | null; // subgeography name
  cases: number;
  region_type: RegionType;
  source_name: string;
};

export interface Scraper {
  run: () => Promise<ScrapeItem[]>
}