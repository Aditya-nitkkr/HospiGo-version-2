const Address = {
  "title": "address",
  "type": "object",
  "description": "Breakdown of the address into elements.\nAll these elements are optional and only those elements that are available for a given location will be returned.",
  "properties": {
    "house_number": {
      "type": "string",
      "description": "House number",
      "examples": [
        "3894"
      ]
    },
    "road": {
      "type": "string",
      "description": "Road name",
      "examples": [
        "Spring Mill Way"
      ]
    },
    "neighbourhood": {
      "type": "string",
      "description": "Neighbourhood"
    },
    "hamlet": {
      "type": "string",
      "description": "Hamlet"
    },
    "suburb": {
      "type": "string",
      "description": "Suburb"
    },
    "village": {
      "type": "string",
      "description": "Village name",
      "examples": [
        "Landen"
      ]
    },
    "town": {
      "type": "string",
      "description": "Town name"
    },
    "city_district": {
      "type": "string",
      "description": "Administrative area between city level and town level"
    },
    "city": {
      "type": "string",
      "description": "City name",
      "examples": [
        "Landen"
      ]
    },
    "region": {
      "type": "string",
      "description": "Region name"
    },
    "county": {
      "type": "string",
      "description": "County name",
      "examples": [
        "Warren County"
      ]
    },
    "state_district": {
      "type": "string",
      "description": "District name"
    },
    "state": {
      "type": "string",
      "description": "State name",
      "examples": [
        "Ohio"
      ]
    },
    "state_code": {
      "type": "string",
      "description": "State code",
      "examples": [
        "oh"
      ]
    },
    "postcode": {
      "type": "string",
      "description": "Postal code",
      "examples": [
        "45039"
      ]
    },
    "country": {
      "type": "string",
      "description": "Country name",
      "examples": [
        "United States of America"
      ]
    },
    "country_code": {
      "type": "string",
      "description": "Country code",
      "examples": [
        "us"
      ]
    },
    "name": {
      "type": "string",
      "description": "Name of the entity/road in the given location"
    },
    "water": {
      "type": "string",
      "x-stoplight": {
        "id": "7nunw3epqpcqo"
      },
      "description": "The name of an ocean or sea, if the location falls within a body of water outside any country's administrative regions."
    }
  },
  "x-examples": {
    "Example 1": {
      "house_number": "3894",
      "road": "Spring Mill Way",
      "residential": "Hunter’s Point",
      "village": "Landen",
      "city": "Landen",
      "county": "Warren County",
      "state": "Ohio",
      "postcode": "45039",
      "country": "United States of America",
      "country_code": "us",
      "state_code": "oh"
    },
    "Result from Ocean": {
      "house_number": "3894",
      "road": "Spring Mill Way",
      "residential": "Hunter’s Point",
      "village": "Landen",
      "city": "Landen",
      "county": "Warren County",
      "state": "Ohio",
      "postcode": "45039",
      "country": "United States of America",
      "country_code": "us",
      "state_code": "oh"
    },
    "Example 2": {
      "name": "South Pacific Ocean",
      "water": "South Pacific Ocean"
    }
  },
  "x-readme-ref-name": "address"
} as const;
export default Address
