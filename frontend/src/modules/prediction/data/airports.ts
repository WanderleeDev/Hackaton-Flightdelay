export interface Airport {
  value: string;
  label: string;
  country: string;
  lat: number;
  lng: number;
}

export const AIRPORTS: Airport[] = [
  {
    value: "ATL",
    label: "Hartsfield-Jackson Atlanta Int'l",
    country: "USA",
    lat: 33.6407,
    lng: -84.4277,
  },
  {
    value: "LAX",
    label: "Los Angeles Int'l",
    country: "USA",
    lat: 33.9416,
    lng: -118.4085,
  },
  {
    value: "ORD",
    label: "O'Hare Int'l",
    country: "USA",
    lat: 41.9742,
    lng: -87.9073,
  },
  {
    value: "DFW",
    label: "Dallas/Fort Worth Int'l",
    country: "USA",
    lat: 32.8998,
    lng: -97.0403,
  },
  {
    value: "JFK",
    label: "John F. Kennedy Int'l",
    country: "USA",
    lat: 40.6413,
    lng: -73.7781,
  },
  {
    value: "MEX",
    label: "Ciudad de México Int'l",
    country: "Mexico",
    lat: 19.4361,
    lng: -99.0719,
  },
  {
    value: "CUN",
    label: "Cancún Int'l",
    country: "Mexico",
    lat: 21.0367,
    lng: -86.8771,
  },
  {
    value: "YYZ",
    label: "Toronto Pearson Int'l",
    country: "Canada",
    lat: 43.6777,
    lng: -79.6248,
  },

  {
    value: "GRU",
    label: "São Paulo/Guarulhos Int'l",
    country: "Brazil",
    lat: -23.4356,
    lng: -46.4731,
  },
  {
    value: "EZE",
    label: "Ministro Pistarini (Ezeiza)",
    country: "Argentina",
    lat: -34.8222,
    lng: -58.5358,
  },
  {
    value: "BOG",
    label: "El Dorado Int'l",
    country: "Colombia",
    lat: 4.7016,
    lng: -74.1469,
  },
  {
    value: "SCL",
    label: "Arturo Merino Benítez",
    country: "Chile",
    lat: -33.393,
    lng: -70.7858,
  },
  {
    value: "LIM",
    label: "Jorge Chávez Int'l",
    country: "Peru",
    lat: -12.0219,
    lng: -77.1143,
  },

  {
    value: "LHR",
    label: "London Heathrow",
    country: "UK",
    lat: 51.47,
    lng: -0.4543,
  },
  {
    value: "CDG",
    label: "Charles de Gaulle",
    country: "France",
    lat: 49.0097,
    lng: 2.5479,
  },
  {
    value: "MAD",
    label: "Adolfo Suárez Madrid–Barajas",
    country: "Spain",
    lat: 40.4839,
    lng: -3.568,
  },
  {
    value: "FRA",
    label: "Frankfurt Airport",
    country: "Germany",
    lat: 50.0379,
    lng: 8.5622,
  },
  {
    value: "AMS",
    label: "Amsterdam Schiphol",
    country: "Netherlands",
    lat: 52.3105,
    lng: 4.7683,
  },

  {
    value: "HND",
    label: "Tokyo Haneda",
    country: "Japan",
    lat: 35.5494,
    lng: 139.7798,
  },
  {
    value: "SIN",
    label: "Singapore Changi",
    country: "Singapore",
    lat: 1.3644,
    lng: 103.9915,
  },
  {
    value: "DXB",
    label: "Dubai Int'l",
    country: "UAE",
    lat: 25.2532,
    lng: 55.3657,
  },
  {
    value: "SYD",
    label: "Sydney Kingsford Smith",
    country: "Australia",
    lat: -33.9399,
    lng: 151.1753,
  },
];
