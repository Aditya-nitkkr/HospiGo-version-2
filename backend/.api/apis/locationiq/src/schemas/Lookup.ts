import Address from './Address.js';
import Extratags from './Extratags.js';

const Lookup = {
  "type": "object",
  "x-examples": {
    "Example 1": {
      "place_id": 115462561,
      "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
      "osm_type": "way",
      "osm_id": 50637691,
      "boundingbox": [
        "52.3994612",
        "52.3996426",
        "13.0479574",
        "13.0481754"
      ],
      "lat": "52.399550700000006",
      "lon": "13.048066846939687",
      "display_name": "Brandenburger Tor, Brandenburger Straße, Historische Innenstadt, Innenstadt, Potsdam, Brandenburg, 14467, Germany",
      "class": "tourism",
      "type": "attraction",
      "address": {
        "tourism": "Brandenburger Tor",
        "road": "Brandenburger Straße",
        "suburb": "Historische Innenstadt",
        "city": "Potsdam",
        "state": "Brandenburg",
        "postcode": "14467",
        "country": "Germany",
        "country_code": "de"
      },
      "extratags": {
        "image": "http://commons.wikimedia.org/wiki/File:Potsdam_brandenburger_tor.jpg",
        "heritage": "4",
        "wikidata": "Q695045",
        "architect": "Carl von Gontard;Georg Christian Unger",
        "wikipedia": "de:Brandenburger Tor (Potsdam)",
        "wheelchair": "yes",
        "description": "Kleines Brandenburger Tor in Potsdam",
        "heritage:website": "http://www.bldam-brandenburg.de/images/stories/PDF/DML%202012/04-p-internet-13.pdf",
        "heritage:operator": "bldam",
        "architect:wikidata": "Q68768;Q95223",
        "year_of_construction": "1771"
      }
    }
  },
  "properties": {
    "place_id": {
      "type": "integer",
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
      "type": "integer",
      "description": "Unique identifier for the OpenStreetMap object."
    },
    "boundingbox": {
      "type": "array",
      "description": "List of bounding box coordinates [min_lat, max_lat, min_lon, max_lon].",
      "items": {
        "type": "string"
      }
    },
    "lat": {
      "type": "string",
      "description": "Latitude of the location."
    },
    "lon": {
      "type": "string",
      "description": "Longitude of the location.\n"
    },
    "display_name": {
      "type": "string",
      "description": "Formatted address for display."
    },
    "class": {
      "type": "string",
      "description": "Categorization of map features based on their nature."
    },
    "type": {
      "type": "string",
      "description": "It denotes the specific kind of feature within a class."
    },
    "address": Address,
    "extratags": Extratags
  },
  "title": "lookup",
  "x-readme-ref-name": "lookup",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default Lookup
