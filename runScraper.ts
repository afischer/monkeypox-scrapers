import { ScrapeItem } from "./scrapers/scraper";

const run = async () => {
  const [_, __, scraperName] = process.argv;
  const runTimestamp = new Date().toISOString();

  console.error(`Running scraper ${scraperName}`);
  const ScraperToRun = require(`./scrapers/${scraperName}`).default;
  const scraper = new ScraperToRun();
  const data = await scraper.run();
  
  if (!data || data.length < 2) {
    throw new Error(`Missing data for scraper ${scraperName}!`)
  }

  // apped timestamp to data;
  // data.forEach((entry: ScrapeItem & {timestamp: string}) => { entry.timestamp = runTimestamp });
  console.log(JSON.stringify(data, null, 2));
}

run()