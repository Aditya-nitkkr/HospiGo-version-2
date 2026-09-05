const Matchlevel = {
  "type": "string",
  "x-examples": {
    "Example 1": "venue"
  },
  "description": "Specifies the most granular address element that matches the geocoding query.\n\n matchlevel       | details\n -----------------|---------------\n  venue           | The returned address is of a Point of Interest (PoI) level.\n  building        | The returned address is of a house level.\n  street          | The returned address is on a street level.\n  neighbourhood   | The returned address is on a neighbourhood level.\n  island          | The returned address is on a island level.\n  borough         | The returned address is on a borough level.\n  city            | The returned address is on a city level.\n  county          | The returned address is on a county level.\n  state           | The returned address is on a state level.\n  country         | The returned address is on a country level.\n  marine          | The returned address is on a marine level.\n  postalcode      | The returned address is on a postalcode level.",
  "title": "matchlevel",
  "x-readme-ref-name": "matchlevel"
} as const;
export default Matchlevel
