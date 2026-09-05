import Address from './Address.js';
import AddressNormalized from './AddressNormalized.js';
import Distance from './Distance.js';
import Extratags from './Extratags.js';
import Geojson from './Geojson.js';
import Geokml from './Geokml.js';
import Geotext from './Geotext.js';
import Namedetails from './Namedetails.js';
import Postaladdress from './Postaladdress.js';
import Svg from './Svg.js';

const LocationReverse = {
  "title": "location-reverse",
  "x-stoplight": {
    "id": "7039d5df8864b"
  },
  "type": "object",
  "properties": {
    "place_id": {
      "type": "string",
      "description": "Unique identifier for the place.",
      "examples": [
        "223483692"
      ]
    },
    "licence": {
      "type": "string",
      "description": "License information for the data.",
      "examples": [
        "© LocationIQ.com CC BY 4.0, Data © OpenStreetMap contributors, ODbL 1.0"
      ]
    },
    "osm_type": {
      "type": "string",
      "description": "Type of OpenStreetMap object.",
      "examples": [
        "way"
      ]
    },
    "osm_id": {
      "type": "string",
      "description": "Unique identifier for the OpenStreetMap object.",
      "examples": [
        "19301621"
      ]
    },
    "lat": {
      "type": "string",
      "description": "Latitude of the location.",
      "examples": [
        "39.3074555677816"
      ]
    },
    "lon": {
      "type": "string",
      "description": "Longitude of the location.",
      "examples": [
        "-84.2927748515948"
      ]
    },
    "display_name": {
      "type": "string",
      "description": "Formatted address for display.",
      "examples": [
        "3894, Spring Mill Way, Hunter’s Point, Landen, Warren County, Ohio, 45039, United States of America"
      ]
    },
    "address": {
      "anyOf": [
        Address,
        AddressNormalized
      ]
    },
    "boundingbox": {
      "type": "array",
      "description": "List of bounding box coordinates [min_lat, max_lat, min_lon, max_lon].",
      "items": {
        "type": "string",
        "examples": [
          "39.307405567782"
        ]
      }
    },
    "distance": Distance,
    "namedetails": Namedetails,
    "extratags": Extratags,
    "geojson": Geojson,
    "geokml": Geokml,
    "svg": Svg,
    "geotext": Geotext,
    "postaladdress": Postaladdress
  },
  "required": [
    "place_id",
    "licence",
    "lat",
    "lon",
    "display_name",
    "boundingbox"
  ],
  "x-readme-ref-name": "location-reverse",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default LocationReverse
