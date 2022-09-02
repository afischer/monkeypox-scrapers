import axios from "axios";
import cheerio from "cheerio";
import { RegionType, ScrapeItem, Scraper } from "./scraper";
import { getFIPSByCountyName } from "./util";

export default class US_FL implements Scraper {
  async run() {
    // using all acquired statuses, confirmed+probable; all cases currently in FL
    // CDC seems to be counting out of country cases in their total
    const { data } = await axios.post(
      "https://www.flhealthcharts.gov/ChartsReports/rdPage.aspx",
      // set end date year to 2029...
      "rdReport=FrequencyMerlin.FrequencyReport_DimensionGrid&chkList_AcquiredStatus=1%2C2%2C3%2C4%2C5%2C9&chkList_AgeGroup=&chkList_County=1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10%2C11%2C12%2C14%2C15%2C16%2C17%2C18%2C19%2C20%2C21%2C22%2C23%2C24%2C25%2C26%2C27%2C28%2C29%2C30%2C31%2C32%2C33%2C34%2C35%2C36%2C37%2C38%2C39%2C40%2C41%2C42%2C43%2C13%2C44%2C45%2C46%2C47%2C48%2C49%2C50%2C51%2C52%2C53%2C54%2C57%2C58%2C59%2C55%2C56%2C60%2C61%2C62%2C63%2C64%2C65%2C66%2C67&chkList_Diseases=51&chkList_DiseaseStatus=CONFIRMED%2CPROBABLE&rdDgLoadSaved=MyBookmarkCollection_af77e1d2-e3e4-430b-a721-b0ff438808f5.xml&rdDgReset=True&txtCounties=&txtDateFrom=01%2F01%2F2022&txtDiseases=&txtEndDt=08%2F21%2F2029&rdSubReport=True&rdResizeFrame=True",
    );
    
    const $ = cheerio.load(data);

    const entries: ScrapeItem[] = [];
    
    $("#rowTable .rdDgPanel tbody tbody tr").each((i, el) => {
      if (i === 0) return;

      // there are these annoying hidden rows. Skip any that don't have the counts
      if (
        !($(el)
          .html() ?? "")
          .includes("lbl_x005B_Measures_x005D_._x005B_Counts_x005D")
      ) {
        return;
      }


      const countyName = $(el).find('tr td span.rdOgPositionLabelYAxis').text().trim();
      const caseCountText = $(el).find(".rdOgDataCell span").text().trim();

      const cases = caseCountText.includes("<")
        ? // if we have <11, we can only assume there's at least one case.
          1
        : parseInt(
            caseCountText
              // zero width spaces, commas, stars, less than
              .replace(/[\u200B-\u200D\uFEFF]|,|\*|</g, "")
          );


      // STATE
      if (i === 1) {
        if (!!countyName) {
          throw new Error(`Found county name ${countyName} for statewide cases!`);
        }
        entries.push({
          country: "United States",
          region_type: RegionType.STATE,
          source_name: "FL DOH",
          region: "Florida",
          geoid: `US-12`,
          cases: cases,
        });
        return
      };

      // COUNTIES
      const fips = getFIPSByCountyName(countyName, "FL");
      
      if (!countyName || !fips) {
        throw new Error(`Unknown county ${countyName} fips ${fips}!`);
      }
      
      entries.push({
        country: "United States",
        region_type: RegionType.COUNTY,
        source_name: "FL DOH",
        region: countyName,
        geoid: `US-${fips}`,
        cases,
      });
    });

    return entries;
  }
}
