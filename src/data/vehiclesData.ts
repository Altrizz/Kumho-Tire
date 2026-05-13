
export interface VehicleVersion {
  name: string;
  tireSize: string;
}

export interface VehicleModel {
  name: string;
  years: number[];
  versions: VehicleVersion[];
}

export interface Brand {
  name: string;
  models: VehicleModel[];
}

export const BRANDS: Brand[] = [
  {
    name: "TOYOTA",
    models: [
      { name: "HILUX", years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024], versions: [{ name: "DX", tireSize: "225/70 R17" }, { name: "SR", tireSize: "265/65 R17" }, { name: "SRV", tireSize: "265/60 R18" }, { name: "SRX", tireSize: "265/60 R18" }, { name: "GR-Sport", tireSize: "265/60 R18" }] },
      { name: "COROLLA", years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024], versions: [{ name: "XLI", tireSize: "205/55 R16" }, { name: "XEI", tireSize: "205/55 R16" }, { name: "SEG", tireSize: "225/45 R17" }, { name: "GR-Sport", tireSize: "225/45 R17" }] },
      { name: "ETIOS", years: [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023], versions: [{ name: "X", tireSize: "175/65 R14" }, { name: "XS / XLS", tireSize: "185/60 R15" }, { name: "Platinum", tireSize: "185/60 R15" }] },
      { name: "YARIS", years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024], versions: [{ name: "XS", tireSize: "185/60 R15" }, { name: "XLS / S", tireSize: "185/60 R15" }, { name: "GR-Sport", tireSize: "195/50 R16" }] },
      { name: "SW4", years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024], versions: [{ name: "SR", tireSize: "265/65 R17" }, { name: "SRX", tireSize: "265/60 R18" }, { name: "GR-Sport", tireSize: "265/60 R18" }, { name: "Diamond", tireSize: "265/60 R18" }] },
      { name: "RAV4", years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023], versions: [{ name: "XLE", tireSize: "225/65 R17" }, { name: "Limited", tireSize: "235/55 R18" }] },
    ]
  },
  {
    name: "VOLKSWAGEN",
    models: [
      { name: "GOL TREND", years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021], versions: [{ name: "Trendline", tireSize: "175/70 R14" }, { name: "Comfortline", tireSize: "195/55 R15" }, { name: "Highline", tireSize: "195/50 R16" }] },
      { name: "AMAROK", years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024], versions: [{ name: "Trendline", tireSize: "245/70 R16" }, { name: "Comfortline", tireSize: "245/65 R17" }, { name: "Highline", tireSize: "255/60 R18" }, { name: "Extreme / Black Style", tireSize: "255/50 R20" }] },
      { name: "VENTO", years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024], versions: [{ name: "Comfortline", tireSize: "205/55 R16" }, { name: "Highline", tireSize: "225/45 R17" }, { name: "GLI", tireSize: "225/45 R18" }] },
      { name: "POLO", years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024], versions: [{ name: "Track", tireSize: "185/65 R15" }, { name: "Trendline", tireSize: "185/65 R15" }, { name: "Highline", tireSize: "195/55 R16" }, { name: "GTS", tireSize: "205/50 R17" }] },
      { name: "T-CROSS", years: [2019, 2020, 2021, 2022, 2023, 2024], versions: [{ name: "Trendline", tireSize: "205/60 R16" }, { name: "Comfortline", tireSize: "205/55 R17" }, { name: "Highline", tireSize: "205/55 R17" }] },
      { name: "TAOS", years: [2021, 2022, 2023, 2024], versions: [{ name: "Comfortline", tireSize: "215/55 R18" }, { name: "Highline", tireSize: "215/55 R18" }] },
      { name: "SAVEIRO", years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024], versions: [{ name: "Cabina Simple", tireSize: "175/70 R14" }, { name: "Cabina Doble", tireSize: "205/60 R15" }, { name: "Cross", tireSize: "205/60 R15" }] },
    ]
  },
  {
    name: "FIAT",
    models: [
      { name: "CRONOS", years: [2018, 2019, 2020, 2021, 2022, 2023, 2024], versions: [{ name: "Attractive", tireSize: "175/65 R14" }, { name: "Drive", tireSize: "185/60 R15" }, { name: "Precision", tireSize: "195/55 R16" }, { name: "HGT", tireSize: "205/45 R17" }] },
      { name: "PALIO", years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018], versions: [{ name: "Attractive", tireSize: "175/65 R14" }, { name: "Essence", tireSize: "185/60 R15" }, { name: "Sporting", tireSize: "195/55 R16" }] },
      { name: "TORO", years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024], versions: [{ name: "Endurance", tireSize: "215/65 R16" }, { name: "Freedom", tireSize: "215/65 R16" }, { name: "Volcano", tireSize: "225/60 R18" }, { name: "Ultra", tireSize: "225/60 R18" }, { name: "Ranch", tireSize: "225/60 R18" }] },
      { name: "STRADA", years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024], versions: [{ name: "Endurance / Working", tireSize: "175/70 R14" }, { name: "Freedom", tireSize: "195/65 R15" }, { name: "Volcano", tireSize: "205/60 R15" }, { name: "Ranch", tireSize: "205/55 R16" }] },
      { name: "MOBI", years: [2016, 2017, 2018, 2019, 2020, 2021, 2022], versions: [{ name: "Easy", tireSize: "175/65 R14" }, { name: "Way / Like", tireSize: "175/65 R14" }] },
      { name: "ARGO", years: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024], versions: [{ name: "Drive", tireSize: "175/65 R14" }, { name: "Precision", tireSize: "185/60 R15" }, { name: "HGT / Trekking", tireSize: "205/50 R17" }] },
      { name: "PULSE", years: [2022, 2023, 2024], versions: [{ name: "Drive", tireSize: "195/60 R16" }, { name: "Audace", tireSize: "195/60 R16" }, { name: "Impetus", tireSize: "205/50 R17" }, { name: "Abarth", tireSize: "215/50 R17" }] },
    ]
  },
  {
    name: "FORD",
    models: [
      { name: "RANGER", years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024], versions: [{ name: "XL", tireSize: "255/70 R16" }, { name: "XLS", tireSize: "255/70 R16" }, { name: "XLT", tireSize: "265/65 R17" }, { name: "Limited", tireSize: "265/60 R18" }, { name: "Raptor", tireSize: "285/70 R17" }] },
      { name: "FIESTA", years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019], versions: [{ name: "S / SE", tireSize: "185/60 R15" }, { name: "Titanium", tireSize: "195/50 R16" }] },
      { name: "ECOSPORT", years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022], versions: [{ name: "S / SE", tireSize: "205/65 R15" }, { name: "Freestyle", tireSize: "205/60 R16" }, { name: "Titanium / Storm", tireSize: "205/50 R17" }] },
      { name: "FOCUS", years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019], versions: [{ name: "S / SE", tireSize: "205/55 R16" }, { name: "Titanium", tireSize: "215/50 R17" }] },
      { name: "KA", years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021], versions: [{ name: "S", tireSize: "175/65 R14" }, { name: "SE", tireSize: "195/55 R15" }, { name: "Freestyle / SEL", tireSize: "195/55 R15" }] },
      { name: "MAVERICK", years: [2021, 2022, 2023, 2024], versions: [{ name: "XLT", tireSize: "225/65 R17" }, { name: "Lariat", tireSize: "225/60 R18" }, { name: "Lariat FX4", tireSize: "225/65 R17" }] },
      { name: "TERRITORY", years: [2020, 2021, 2022, 2023, 2024], versions: [{ name: "SEL", tireSize: "235/55 R17" }, { name: "Titanium", tireSize: "235/50 R18" }] },
    ]
  },
  {
    name: "CHEVROLET",
    models: [
      { name: "S10", years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024], versions: [{ name: "LS", tireSize: "245/70 R16" }, { name: "LT", tireSize: "245/70 R16" }, { name: "LTZ", tireSize: "255/60 R18" }, { name: "High Country", tireSize: "255/60 R18" }] },
      { name: "ONIX", years: [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024], versions: [{ name: "LS / Joy", tireSize: "185/70 R14" }, { name: "LT", tireSize: "185/65 R15" }, { name: "Premier / RS", tireSize: "195/55 R16" }] },
      { name: "CRUZE", years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023], versions: [{ name: "LT", tireSize: "215/50 R17" }, { name: "Premier", tireSize: "215/50 R17" }] },
      { name: "TRACKER", years: [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024], versions: [{ name: "MT / AT (Base)", tireSize: "215/60 R16" }, { name: "LTZ", tireSize: "215/55 R17" }, { name: "Premier", tireSize: "215/55 R17" }] },
      { name: "EQUINOX", years: [2018, 2019, 2020, 2021, 2022, 2023, 2024], versions: [{ name: "LS", tireSize: "225/65 R17" }, { name: "Premier", tireSize: "235/50 R19" }] },
    ]
  },
  {
    name: "RENAULT",
    models: [
      { name: "SANDERO", years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024], versions: [{ name: "Life / Zen", tireSize: "185/65 R15" }, { name: "Intens", tireSize: "185/65 R15" }, { name: "RS", tireSize: "205/45 R17" }] },
      { name: "DUSTER", years: [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024], versions: [{ name: "Zen", tireSize: "215/65 R16" }, { name: "Intens / Iconic", tireSize: "215/60 R17" }] },
      { name: "KANGOO", years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024], versions: [{ name: "Express / Confort", tireSize: "185/65 R15" }, { name: "Stepway", tireSize: "195/65 R15" }] },
      { name: "ALASKAN", years: [2020, 2021, 2022, 2023, 2024], versions: [{ name: "Confort", tireSize: "255/60 R18" }, { name: "Emotion", tireSize: "255/60 R18" }, { name: "Iconic", tireSize: "255/60 R18" }] },
      { name: "STEPWAY", years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024], versions: [{ name: "Zen", tireSize: "185/65 R15" }, { name: "Intens", tireSize: "205/55 R16" }] },
    ]
  },
  {
    name: "PEUGEOT",
    models: [
      { name: "208", years: [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024], versions: [{ name: "Like / Active", tireSize: "185/65 R15" }, { name: "Allure", tireSize: "195/55 R16" }, { name: "Feline", tireSize: "195/55 R16" }, { name: "GT", tireSize: "205/45 R17" }] },
      { name: "308", years: [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019], versions: [{ name: "Active", tireSize: "205/55 R16" }, { name: "Allure / Feline", tireSize: "225/45 R17" }, { name: "GTi", tireSize: "225/40 R18" }] },
      { name: "2008", years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024], versions: [{ name: "Active", tireSize: "205/60 R16" }, { name: "Allure", tireSize: "205/60 R16" }, { name: "Feline / Sport", tireSize: "205/60 R16" }] },
      { name: "3008", years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024], versions: [{ name: "Allure", tireSize: "225/55 R18" }, { name: "GT Line", tireSize: "225/55 R18" }] },
    ]
  },
  {
    name: "NISSAN",
    models: [
      { name: "FRONTIER", years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024], versions: [{ name: "S", tireSize: "255/70 R16" }, { name: "X-Gear", tireSize: "255/60 R18" }, { name: "XE / Platinum", tireSize: "255/60 R18" }, { name: "PRO-4X", tireSize: "255/65 R17" }] },
      { name: "VERSA", years: [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024], versions: [{ name: "Sense", tireSize: "195/65 R15" }, { name: "Advance", tireSize: "205/55 R16" }, { name: "Exclusive", tireSize: "205/50 R17" }] },
      { name: "KICKS", years: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024], versions: [{ name: "Sense", tireSize: "205/60 R16" }, { name: "Advance", tireSize: "205/55 R17" }, { name: "Exclusive", tireSize: "205/55 R17" }] },
    ]
  },
  {
    name: "JEEP",
    models: [
      { name: "RENEGADE", years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024], versions: [{ name: "Sport", tireSize: "215/65 R16" }, { name: "Longitude / Trailhawk", tireSize: "225/55 R18" }, { name: "1.3T", tireSize: "235/45 R19" }] },
      { name: "COMPASS", years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024], versions: [{ name: "Sport", tireSize: "225/60 R17" }, { name: "Longitude", tireSize: "225/55 R18" }, { name: "Limited / Trailhawk", tireSize: "235/45 R19" }] },
    ]
  },
  {
    name: "HONDA",
    models: [
      { name: "CIVIC", years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022], versions: [{ name: "LXS", tireSize: "205/55 R16" }, { name: "EXS", tireSize: "205/55 R16" }, { name: "EX / EX-L / Touring", tireSize: "215/50 R17" }] },
      { name: "HR-V", years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024], versions: [{ name: "LX", tireSize: "215/55 R17" }, { name: "EX", tireSize: "215/55 R17" }, { name: "EXL", tireSize: "215/55 R17" }] },
      { name: "CR-V", years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024], versions: [{ name: "LX", tireSize: "225/65 R17" }, { name: "EX", tireSize: "225/60 R18" }, { name: "EXT", tireSize: "235/60 R18" }] },
    ]
  }
];

