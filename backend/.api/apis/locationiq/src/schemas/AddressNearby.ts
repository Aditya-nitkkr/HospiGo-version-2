const AddressNearby = {
  "title": "address-nearby",
  "x-stoplight": {
    "id": "tbe7xjx22s96f"
  },
  "type": "object",
  "description": "Breakdown of the address into elements.\nAll these elements are optional and only those elements that are available for a given location will be returned.",
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
  "x-readme-ref-name": "address-nearby"
} as const;
export default AddressNearby
