const stateFIPS: Record<string, string> = {
  'alabama': "01",
  'alaska': "02",
  'arizona': "04",
  'arkansas': "05",
  'california': "06",
  'colorado': "08",
  'connecticut': "09",
  'delaware': "10",
  'district of columbia': "10",
  'florida': "12",
  'georgia': "13",
  'hawaii': "15",
  'idaho': "16",
  'illinois': "17",
  'indiana': "18",
  'iowa': "19",
  'kansas': "20",
  'kentucky': "21",
  'louisiana': "22",
  'maine': "23",
  'maryland': "24",
  'massachusetts': "25",
  'michigan': "26",
  'minnesota': "27",
  'mississippi': "28",
  'missouri': "29",
  'montana': "30",
  'nebraska': "31",
  'nevada': "32",
  'new hampshire': "33",
  'new jersey': "34",
  'new mexico': "35",
  'new york': "36",
  'north carolina': "37",
  'north dakota': "38",
  'ohio': "39",
  'oklahoma': "40",
  'oregon': "41",
  'pennsylvania': "42",
  'rhode island': "44",
  'south carolina': "45",
  'south dakota': "46",
  'tennessee': "47",
  'texas': "48",
  'utah': "49",
  'vermont': "50",
  'virginia': "51",
  'washington': "53",
  'west virginia': "54",
  'wisconsin': "55",
  'wyoming': "56",
  'american samoa': "60",
  'guam': "66",
  'northern mariana islands': "69",
  'puerto rico': "72",
  'virgin islands': "78",
  'non-us resident': "NONRESIDENT",
}

const countyFips: Record<string, Record<string, string>> = {
  NY: {
    "new york city": "3651000",
    nyc: "3651000",
    albany: "36001",
    allegany: "36003",
    bronx: "36005",
    broome: "36007",
    cattaraugus: "36009",
    cayuga: "36011",
    chautauqua: "36013",
    chemung: "36015",
    chenango: "36017",
    clinton: "36019",
    columbia: "36021",
    cortland: "36023",
    delaware: "36025",
    dutchess: "36027",
    erie: "36029",
    essex: "36031",
    franklin: "36033",
    fulton: "36035",
    genesee: "36037",
    greene: "36039",
    hamilton: "36041",
    herkimer: "36043",
    jefferson: "36045",
    kings: "36047",
    lewis: "36049",
    livingston: "36051",
    madison: "36053",
    monroe: "36055",
    montgomery: "36057",
    nassau: "36059",
    "new york": "36061",
    niagara: "36063",
    oneida: "36065",
    onondaga: "36067",
    ontario: "36069",
    orange: "36071",
    orleans: "36073",
    oswego: "36075",
    otsego: "36077",
    putnam: "36079",
    queens: "36081",
    rensselaer: "36083",
    richmond: "36085",
    rockland: "36087",
    "st. lawrence": "36089",
    saratoga: "36091",
    schenectady: "36093",
    schoharie: "36095",
    schuyler: "36097",
    seneca: "36099",
    steuben: "36101",
    suffolk: "36103",
    sullivan: "36105",
    tioga: "36107",
    tompkins: "36109",
    ulster: "36111",
    warren: "36113",
    washington: "36115",
    wayne: "36117",
    westchester: "36119",
    wyoming: "36121",
    yates: "36123",
  },
  CA: {
    alameda: "06001",
    alpine: "06003",
    amador: "06005",
    butte: "06007",
    calaveras: "06009",
    colusa: "06011",
    "contra costa": "06013",
    "del norte": "06015",
    "el dorado": "06017",
    fresno: "06019",
    glenn: "06021",
    humboldt: "06023",
    imperial: "06025",
    inyo: "06027",
    kern: "06029",
    kings: "06031",
    lake: "06033",
    lassen: "06035",
    "los angeles": "06037",
    madera: "06039",
    marin: "06041",
    mariposa: "06043",
    mendocino: "06045",
    merced: "06047",
    modoc: "06049",
    mono: "06051",
    monterey: "06053",
    napa: "06055",
    nevada: "06057",
    orange: "06059",
    placer: "06061",
    plumas: "06063",
    riverside: "06065",
    sacramento: "06067",
    "san benito": "06069",
    "san bernardino": "06071",
    "san diego": "06073",
    "san francisco": "06075",
    "san joaquin": "06077",
    "san luis obispo": "06079",
    "san mateo": "06081",
    "santa barbara": "06083",
    "santa clara": "06085",
    "santa cruz": "06087",
    shasta: "06089",
    sierra: "06091",
    siskiyou: "06093",
    solano: "06095",
    sonoma: "06097",
    stanislaus: "06099",
    sutter: "06101",
    tehama: "06103",
    trinity: "06105",
    tulare: "06107",
    tuolumne: "06109",
    ventura: "06111",
    yolo: "06113",
    yuba: "06115",
    // https://www2.census.gov/geo/docs/reference/codes/files/st06_ca_places.txt
    "long beach": "0643000",
    berkeley: "0606000",
    pasadena: "0656000",
  },
  FL: {
    alachua: "12001",
    baker: "12003",
    bay: "12005",
    bradford: "12007",
    brevard: "12009",
    broward: "12011",
    calhoun: "12013",
    charlotte: "12015",
    citrus: "12017",
    clay: "12019",
    collier: "12021",
    columbia: "12023",
    "desoto": "12027",
    dixie: "12029",
    duval: "12031",
    escambia: "12033",
    flagler: "12035",
    franklin: "12037",
    gadsden: "12039",
    gilchrist: "12041",
    glades: "12043",
    gulf: "12045",
    hamilton: "12047",
    hardee: "12049",
    hendry: "12051",
    hernando: "12053",
    highlands: "12055",
    hillsborough: "12057",
    holmes: "12059",
    "indian river": "12061",
    jackson: "12063",
    jefferson: "12065",
    lafayette: "12067",
    lake: "12069",
    lee: "12071",
    leon: "12073",
    levy: "12075",
    liberty: "12077",
    madison: "12079",
    manatee: "12081",
    marion: "12083",
    martin: "12085",
    "miami-dade": "12086",
    monroe: "12087",
    nassau: "12089",
    okaloosa: "12091",
    okeechobee: "12093",
    orange: "12095",
    osceola: "12097",
    "palm beach": "12099",
    pasco: "12101",
    pinellas: "12103",
    polk: "12105",
    putnam: "12107",
    "st. johns": "12109",
    "st. lucie": "12111",
    "santa rosa": "12113",
    sarasota: "12115",
    seminole: "12117",
    sumter: "12119",
    suwannee: "12121",
    taylor: "12123",
    union: "12125",
    volusia: "12127",
    wakulla: "12129",
    walton: "12131",
    washington: "12133",
  },
  OR: {
    baker: "41001",
    benton: "41003",
    clackamas: "41005",
    clatsop: "41007",
    columbia: "41009",
    coos: "41011",
    crook: "41013",
    curry: "41015",
    deschutes: "41017",
    douglas: "41019",
    gilliam: "41021",
    grant: "41023",
    harney: "41025",
    "hood river": "41027",
    jackson: "41029",
    jefferson: "41031",
    josephine: "41033",
    klamath: "41035",
    lake: "41037",
    lane: "41039",
    lincoln: "41041",
    linn: "41043",
    malheur: "41045",
    marion: "41047",
    morrow: "41049",
    multnomah: "41051",
    polk: "41053",
    sherman: "41055",
    tillamook: "41057",
    umatilla: "41059",
    union: "41061",
    wallowa: "41063",
    wasco: "41065",
    washington: "41067",
    wheeler: "41069",
    yamhill: "41071",
  },
  WA: {
    adams: "53001",
    asotin: "53003",
    benton: "53005",
    chelan: "53007",
    clallam: "53009",
    clark: "53011",
    columbia: "53013",
    cowlitz: "53015",
    douglas: "53017",
    ferry: "53019",
    franklin: "53021",
    garfield: "53023",
    grant: "53025",
    "grays harbor": "53027",
    island: "53029",
    jefferson: "53031",
    king: "53033",
    kitsap: "53035",
    kittitas: "53037",
    klickitat: "53039",
    lewis: "53041",
    lincoln: "53043",
    mason: "53045",
    okanogan: "53047",
    pacific: "53049",
    "pend oreille": "53051",
    pierce: "53053",
    "san juan": "53055",
    skagit: "53057",
    skamania: "53059",
    snohomish: "53061",
    spokane: "53063",
    stevens: "53065",
    thurston: "53067",
    wahkiakum: "53069",
    "walla walla": "53071",
    whatcom: "53073",
    whitman: "53075",
    yakima: "53077",
  },
  MI: {
    alcona: "26001",
    alger: "26003",
    allegan: "26005",
    alpena: "26007",
    antrim: "26009",
    arenac: "26011",
    baraga: "26013",
    barry: "26015",
    bay: "26017",
    benzie: "26019",
    berrien: "26021",
    branch: "26023",
    calhoun: "26025",
    cass: "26027",
    charlevoix: "26029",
    cheboygan: "26031",
    chippewa: "26033",
    clare: "26035",
    clinton: "26037",
    crawford: "26039",
    delta: "26041",
    dickinson: "26043",
    eaton: "26045",
    emmet: "26047",
    genesee: "26049",
    gladwin: "26051",
    gogebic: "26053",
    "grand traverse": "26055",
    gratiot: "26057",
    hillsdale: "26059",
    houghton: "26061",
    huron: "26063",
    ingham: "26065",
    ionia: "26067",
    iosco: "26069",
    iron: "26071",
    isabella: "26073",
    jackson: "26075",
    kalamazoo: "26077",
    kalkaska: "26079",
    kent: "26081",
    keweenaw: "26083",
    lake: "26085",
    lapeer: "26087",
    leelanau: "26089",
    lenawee: "26091",
    livingston: "26093",
    luce: "26095",
    mackinac: "26097",
    macomb: "26099",
    manistee: "26101",
    marquette: "26103",
    mason: "26105",
    mecosta: "26107",
    menominee: "26109",
    midland: "26111",
    missaukee: "26113",
    monroe: "26115",
    montcalm: "26117",
    montmorency: "26119",
    muskegon: "26121",
    newaygo: "26123",
    oakland: "26125",
    oceana: "26127",
    ogemaw: "26129",
    ontonagon: "26131",
    osceola: "26133",
    oscoda: "26135",
    otsego: "26137",
    ottawa: "26139",
    "presque isle": "26141",
    roscommon: "26143",
    saginaw: "26145",
    "st. clair": "26147",
    "st. joseph": "26149",
    sanilac: "26151",
    schoolcraft: "26153",
    shiawassee: "26155",
    tuscola: "26157",
    "van buren": "26159",
    washtenaw: "26161",
    wayne: "26163",
    wexford: "26165",
    // https://www2.census.gov/geo/docs/reference/codes/files/st26_mi_places.txt
    "detroit city": "2622000",
  },
  ME: {
    androscoggin: "23001",
    aroostook: "23003",
    cumberland: "23005",
    franklin: "23007",
    hancock: "23009",
    kennebec: "23011",
    knox: "23013",
    lincoln: "23015",
    oxford: "23017",
    penobscot: "23019",
    piscataquis: "23021",
    sagadahoc: "23023",
    somerset: "23025",
    waldo: "23027",
    washington: "23029",
    york: "23031",
  },
  MN: {
    aitkin: "27001",
    anoka: "27003",
    becker: "27005",
    beltrami: "27007",
    benton: "27009",
    "big stone": "27011",
    "blue earth": "27013",
    brown: "27015",
    carlton: "27017",
    carver: "27019",
    cass: "27021",
    chippewa: "27023",
    chisago: "27025",
    clay: "27027",
    clearwater: "27029",
    cook: "27031",
    cottonwood: "27033",
    "crow wing": "27035",
    dakota: "27037",
    dodge: "27039",
    douglas: "27041",
    faribault: "27043",
    fillmore: "27045",
    freeborn: "27047",
    goodhue: "27049",
    grant: "27051",
    hennepin: "27053",
    houston: "27055",
    hubbard: "27057",
    isanti: "27059",
    itasca: "27061",
    jackson: "27063",
    kanabec: "27065",
    kandiyohi: "27067",
    kittson: "27069",
    koochiching: "27071",
    "lac qui parle": "27073",
    lake: "27075",
    "lake of the woods": "27077",
    "le sueur": "27079",
    lincoln: "27081",
    lyon: "27083",
    mcleod: "27085",
    mahnomen: "27087",
    marshall: "27089",
    martin: "27091",
    meeker: "27093",
    "mille lacs": "27095",
    morrison: "27097",
    mower: "27099",
    murray: "27101",
    nicollet: "27103",
    nobles: "27105",
    norman: "27107",
    olmsted: "27109",
    "otter tail": "27111",
    pennington: "27113",
    pine: "27115",
    pipestone: "27117",
    polk: "27119",
    pope: "27121",
    ramsey: "27123",
    "red lake": "27125",
    redwood: "27127",
    renville: "27129",
    rice: "27131",
    rock: "27133",
    roseau: "27135",
    "st. louis": "27137",
    scott: "27139",
    sherburne: "27141",
    sibley: "27143",
    stearns: "27145",
    steele: "27147",
    stevens: "27149",
    swift: "27151",
    todd: "27153",
    traverse: "27155",
    wabasha: "27157",
    wadena: "27159",
    waseca: "27161",
    washington: "27163",
    watonwan: "27165",
    wilkin: "27167",
    winona: "27169",
    wright: "27171",
    "yellow medicine": "27173",
  },
  MD: {
    allegany: "24001",
    "anne arundel": "24003",
    baltimore: "24005",
    calvert: "24009",
    caroline: "24011",
    carroll: "24013",
    cecil: "24015",
    charles: "24017",
    dorchester: "24019",
    frederick: "24021",
    garrett: "24023",
    harford: "24025",
    howard: "24027",
    kent: "24029",
    montgomery: "24031",
    "prince george": "24033",
    "queen anne": "24035",
    "st. mary": "24037",
    somerset: "24039",
    talbot: "24041",
    washington: "24043",
    wicomico: "24045",
    worcester: "24047",
    "baltimore city": "24510",
  },
  IL: {
    adams: "17001",
    alexander: "17003",
    bond: "17005",
    boone: "17007",
    brown: "17009",
    bureau: "17011",
    calhoun: "17013",
    carroll: "17015",
    cass: "17017",
    champaign: "17019",
    christian: "17021",
    clark: "17023",
    clay: "17025",
    clinton: "17027",
    coles: "17029",
    cook: "17031",
    crawford: "17033",
    cumberland: "17035",
    dekalb: "17037",
    "de witt": "17039",
    douglas: "17041",
    dupage: "17043",
    edgar: "17045",
    edwards: "17047",
    effingham: "17049",
    fayette: "17051",
    ford: "17053",
    franklin: "17055",
    fulton: "17057",
    gallatin: "17059",
    greene: "17061",
    grundy: "17063",
    hamilton: "17065",
    hancock: "17067",
    hardin: "17069",
    henderson: "17071",
    henry: "17073",
    iroquois: "17075",
    jackson: "17077",
    jasper: "17079",
    jefferson: "17081",
    jersey: "17083",
    "jo daviess": "17085",
    johnson: "17087",
    kane: "17089",
    kankakee: "17091",
    kendall: "17093",
    knox: "17095",
    lake: "17097",
    "lasalle": "17099",
    lawrence: "17101",
    lee: "17103",
    livingston: "17105",
    logan: "17107",
    mcdonough: "17109",
    mchenry: "17111",
    mclean: "17113",
    macon: "17115",
    macoupin: "17117",
    madison: "17119",
    marion: "17121",
    marshall: "17123",
    mason: "17125",
    massac: "17127",
    menard: "17129",
    mercer: "17131",
    monroe: "17133",
    montgomery: "17135",
    morgan: "17137",
    moultrie: "17139",
    ogle: "17141",
    peoria: "17143",
    perry: "17145",
    piatt: "17147",
    pike: "17149",
    pope: "17151",
    pulaski: "17153",
    putnam: "17155",
    randolph: "17157",
    richland: "17159",
    "rock island": "17161",
    "st. clair": "17163",
    saline: "17165",
    sangamon: "17167",
    schuyler: "17169",
    scott: "17171",
    shelby: "17173",
    stark: "17175",
    stephenson: "17177",
    tazewell: "17179",
    union: "17181",
    vermilion: "17183",
    wabash: "17185",
    warren: "17187",
    washington: "17189",
    wayne: "17191",
    white: "17193",
    whiteside: "17195",
    will: "17197",
    williamson: "17199",
    winnebago: "17201",
    woodford: "17203",
    // https://www2.census.gov/geo/docs/reference/codes/files/st17_il_places.txt
    chicago: "1714000",
  },
};

export function getFIPSByStateName(stateName: string): string {
  return stateFIPS[stateName.toLowerCase()];
}

export function getFIPSByCountyName(countyName: string, statePostal: string): string {
  return countyFips[statePostal][countyName.toLowerCase()];
}

export const parseNumber = (num: number | string) => {
  if (typeof num === "number") return num;
  return parseInt(num.replace(",", ""));
};