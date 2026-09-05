const AddressNormalized = {
  "title": "address-normalized",
  "x-stoplight": {
    "id": "q798lnglnqkb4"
  },
  "type": "object",
  "description": "The default address section returns a wide range of elements - from common ones such as `road` and `country` to obscure ones such as `hamlet`, `cycleway`, `park`. This was done to maintain backward compatibility with OpenStreetMap's Nominatim. To make parsing easier for developers, the `normalizeaddress` parameter rolls up elements in the `address` section of the response to the list of elements defined below.\n",
  "properties": {
    "name": {
      "type": "string",
      "description": "House name or Point of Interest (POI)"
    },
    "house_number": {
      "type": "string",
      "description": "House or Building number",
      "examples": [
        "3894"
      ]
    },
    "road": {
      "type": "string",
      "description": "Roads, Highways, Freeways, Motorways",
      "examples": [
        "Spring Mill Way"
      ]
    },
    "neighbourhood": {
      "type": "string",
      "description": "Neighbourhoods, Allotments, Quarters, Communities"
    },
    "suburb": {
      "type": "string",
      "description": "Suburbs, Subdivisions"
    },
    "island": {
      "type": "string",
      "description": "Islands, Islets"
    },
    "city": {
      "type": "string",
      "description": "Cities, Towns, Villages, Municipalities, Districts, Boroughs, Hamlets",
      "examples": [
        "Landen"
      ]
    },
    "county": {
      "type": "string",
      "description": "Counties",
      "examples": [
        "Warren County"
      ]
    },
    "state": {
      "type": "string",
      "description": "States, Provinces, Regions, State Districts",
      "examples": [
        "Ohio"
      ]
    },
    "state_code": {
      "type": "string",
      "description": "State or Province Code",
      "examples": [
        "oh"
      ]
    },
    "postcode": {
      "type": "string",
      "description": "Postal Codes, Zipcodes",
      "examples": [
        "45039"
      ]
    },
    "country": {
      "type": "string",
      "description": "Countries, Nation-states",
      "examples": [
        "United States of America"
      ]
    },
    "country_code": {
      "type": "string",
      "description": "Country Code - 2 letter (ISO 3166-1 alpha-2)",
      "examples": [
        "us"
      ]
    }
  },
  "x-examples": {
    "Example 1": {
      "name": "Empire State Building",
      "house_number": "350",
      "road": "5th Avenue",
      "neighbourhood": "Manhattan Community Board 5",
      "suburb": "Manhattan",
      "city": "New York",
      "county": "New York County",
      "state": "New York",
      "postcode": "10001",
      "country": "United States of America",
      "country_code": "us"
    },
    "Result from Ocean": {
      "name": "South Pacific Ocean"
    },
    "Example 2": {
      "name": "South Pacific Ocean"
    }
  },
  "x-readme-ref-name": "address-normalized"
} as const;
export default AddressNormalized
