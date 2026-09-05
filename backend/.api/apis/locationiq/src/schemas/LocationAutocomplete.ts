import AddressAutocomplete from './AddressAutocomplete.js';

const LocationAutocomplete = {
  "title": "location-autocomplete",
  "x-stoplight": {
    "id": "05c483aae353e"
  },
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "place_id": {
        "type": "string",
        "description": "Unique identifier for the place."
      },
      "osm_id": {
        "type": "string",
        "description": "Unique identifier for the OpenStreetMap object."
      },
      "osm_type": {
        "type": "string",
        "description": "Type of OpenStreetMap object."
      },
      "licence": {
        "type": "string",
        "description": "License information for the data."
      },
      "lat": {
        "type": "string",
        "description": "Latitude of the location."
      },
      "lon": {
        "type": "string",
        "description": "Longitude of the location."
      },
      "boundingbox": {
        "type": "array",
        "description": "List of bounding box coordinates [min_lat, max_lat, min_lon, max_lon].",
        "items": {
          "type": "string"
        }
      },
      "class": {
        "type": "string",
        "description": "The category of this result"
      },
      "type": {
        "type": "string",
        "description": "The 'type' of the class/category of this result"
      },
      "display_name": {
        "type": "string",
        "description": "Formatted address for display."
      },
      "display_place": {
        "type": "string",
        "description": "Only the name part of the address; if the `type` is a `city`, just the city's name. If the `type` is `highway`, just the road's name. This is helpful when a client library wants to display this information separately."
      },
      "display_address": {
        "type": "string",
        "description": "The complete address without the text already present in `display_place`."
      },
      "address": AddressAutocomplete
    }
  },
  "x-examples": {
    "Example 1": [
      {
        "place_id": "322123240136",
        "osm_id": "34633854",
        "osm_type": "way",
        "licence": "https://locationiq.com/attribution",
        "lat": "40.7484284",
        "lon": "-73.98565462",
        "boundingbox": [
          "40.7479226",
          "40.7489422",
          "-73.9864855",
          "-73.9848259"
        ],
        "class": "office",
        "type": "yes",
        "display_name": "Empire State Building, 350, 5th Avenue, Midtown South, Manhattan, New York, New York, 10001, USA",
        "display_place": "Empire State Building",
        "display_address": "350, 5th Avenue, Midtown South, Manhattan, New York, New York, 10001, USA",
        "address": {
          "name": "Empire State Building",
          "house_number": "350",
          "road": "5th Avenue",
          "neighbourhood": "Midtown South",
          "suburb": "Manhattan",
          "city": "New York",
          "state": "New York",
          "postcode": "10001",
          "country": "United States of America",
          "country_code": "us"
        }
      }
    ]
  },
  "x-readme-ref-name": "location-autocomplete",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default LocationAutocomplete
