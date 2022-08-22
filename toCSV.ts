import path from "path";
import fs from "fs";
import papa from "papaparse";


async function usCSV() {
  const dataFiles = await fs.promises.readdir(path.join(__dirname, 'data'));

  const usData = dataFiles.flatMap(filename => {
    if (!filename.startsWith('US')) return [];
    return require(path.join(__dirname, 'data', filename))
  }).sort((a, b) => a.geoid.localeCompare(b.geoid));
  
  const dateStr = new Date().toISOString().split("T")[0];

  // add date
  usData.forEach(entry => entry.date = dateStr)

  const csvStr = papa.unparse(usData, {
    header: false,
    columns: ['date', 'geoid', 'country', 'region', 'region_type', 'cases', 'source_name']
  })
  
  console.log("\n" + csvStr);
}

usCSV();