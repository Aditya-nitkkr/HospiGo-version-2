import AddressNearby from './AddressNearby.js';

const LocationNearby = {
  "title": "location-nearby",
  "x-stoplight": {
    "id": "gpmrvu628jbn5"
  },
  "type": "array",
  "x-examples": {
    "Example 1": [
      {
        "place_id": "223483692",
        "licence": "© LocationIQ.com CC BY 4.0, Data © OpenStreetMap contributors, ODbL 1.0",
        "osm_type": "way",
        "osm_id": "19301621",
        "boundingbox": [
          "39.307405567782",
          "39.307505567782",
          "-84.292824851595",
          "-84.292724851595"
        ],
        "lat": "39.3074555677816",
        "lon": "-84.2927748515948",
        "display_name": "3894, Spring Mill Way, Hunter’s Point, Landen, Warren County, Ohio, 45039, United States of America",
        "class": "place",
        "type": "house",
        "importance": 0.62025,
        "address": {
          "name": "Empire State Building",
          "house_number": "3894",
          "road": "Spring Mill Way",
          "residential": "Hunter’s Point",
          "village": "Landen",
          "county": "Warren County",
          "state": "Ohio",
          "postcode": "45039",
          "country": "United States of America",
          "country_code": "us",
          "city": "Landen"
        }
      }
    ]
  },
  "items": {
    "type": "object",
    "properties": {
      "place_id": {
        "type": "string",
        "description": "Unique identifier for the place."
      },
      "licence": {
        "type": "string",
        "description": "License information for the data."
      },
      "osm_type": {
        "type": "string",
        "description": "Type of OpenStreetMap object."
      },
      "osm_id": {
        "type": "string",
        "description": "Unique identifier for the OpenStreetMap object."
      },
      "lat": {
        "type": "string",
        "description": "Latitude of the location."
      },
      "lon": {
        "type": "string",
        "description": "Longitude of the location."
      },
      "display_name": {
        "type": "string",
        "description": "Formatted address for display."
      },
      "class": {
        "type": "string",
        "description": "The category of this result"
      },
      "type": {
        "type": "string",
        "description": "The 'type' of the class/category of this result"
      },
      "address": AddressNearby,
      "boundingbox": {
        "type": "array",
        "description": "List of bounding box coordinates [min_lat, max_lat, min_lon, max_lon].",
        "items": {
          "type": "string"
        }
      }
    },
    "required": [
      "place_id",
      "licence",
      "lat",
      "lon",
      "display_name",
      "boundingbox"
    ]
  },
  "x-readme-ref-name": "location-nearby",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default LocationNearby
