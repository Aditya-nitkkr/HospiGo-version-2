const Reverse = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "lat": {
            "type": "number",
            "format": "float",
            "examples": [
              40.748442
            ],
            "description": "Latitude of the location to generate an address for."
          },
          "lon": {
            "type": "number",
            "format": "float",
            "examples": [
              -73.985658
            ],
            "description": "Longitude of the location to generate an address for."
          },
          "format": {
            "type": "string",
            "default": "xml",
            "enum": [
              "xml",
              "json",
              "xmlv1.1"
            ],
            "examples": [
              "json"
            ],
            "description": "Output Format. Defaults to xml. \n\n> This version (v1) of our Reverse Geocoding API is compatible with OpenStreetMap's Nominatim Geocoder in both JSON & XML formats. However, all our enhancements such as additional datasets and algorithms are supported only in `json` or `xmlv1.1` format options."
          },
          "zoom": {
            "type": "integer",
            "minimum": 0,
            "maximum": 18,
            "default": 18,
            "examples": [
              18
            ],
            "description": "Level of detail required where `0` is country and `18` is house/building. Defaults to `18`.\nIn terms of address details the zoom levels are as follows:\n\nzoom | address detail\n-----|---------------\n  3   | country\n  5   | state\n  8   | county\n  10  | city\n  14  | suburb\n  16  | street\n  18  | building"
          },
          "accept-language": {
            "type": "string",
            "default": "en",
            "examples": [
              "en"
            ],
            "description": "Preferred language order for showing search results, overrides the value specified in the `Accept-Language` HTTP header. Defaults to `en`. \n\nTo use native language for the response when available, use `accept-language=native`. \n\nEither uses standard <a href=\"https://tools.ietf.org/html/rfc2616#section-14.4\" target=\"_blank\">rfc2616 accept-language string</a> or a simple comma separated list of language codes."
          },
          "addressdetails": {
            "type": "integer",
            "enum": [
              0,
              1
            ],
            "default": 1,
            "description": "Include a breakdown of the address of this result into elements. Important components include (but not limited to) country, postcode, state, county, city, town. Only those elements that are available for a given location will be returned."
          },
          "normalizeaddress": {
            "type": "integer",
            "enum": [
              0,
              1
            ],
            "default": 0,
            "description": "Makes parsing of the `address` object easier by returning a predictable and defined list of elements. Defaults to `0` for backward compatibility. We recommend setting this to `1` for new projects.\n\n  Element Name  | Description\n  ------------- | -----------\n  name          | House name or Point of Interest (POI) such as a Cafe or School\n  house_number  | House or Building number\n  road          | Roads, Highways, Freeways, Motorways\n  neighbourhood | Neighbourhoods, Allotments, Quarters, Communities\n  suburb        | Suburbs, Subdivisions\n  island        | Islands, Islets\n  city          | Cities, Towns, Villages, Municipalities, Districts, Boroughs, Hamlets\n  county        | Counties\n  state         | States, Provinces, Regions, State Districts\n  state_code    | State or Province Code\n  postcode      | Postal Codes, Zipcodes\n  country       | Countries, Nation-states\n  country_code  | Country Code - 2 letter (ISO 3166-1 alpha-2)"
          },
          "normalizecity": {
            "type": "integer",
            "enum": [
              0,
              1
            ],
            "default": 0,
            "description": "For responses with no `city` value in the address section, the next available element in this order - `city_district`, `locality`, `town`, `borough`, `municipality`, `village`, `hamlet`, `quarter`, `neighbourhood` - from the address section will be normalized to city. Defaults to `0`."
          },
          "postaladdress": {
            "type": "integer",
            "enum": [
              0,
              1
            ],
            "default": 0,
            "description": "Returns address inside the `postaladdress` key, that is specifically formatted for each country. Currently supported for addresses in Belgium, Brazil, France, Germany, Greece, India, Ireland, Italy, Portugal, South Africa, Spain and United Kingdom. Defaults to `0`."
          },
          "oceans": {
            "type": "integer",
            "enum": [
              0,
              1
            ],
            "default": 0,
            "description": "Allows you to specify whether or not the API should return the name of an ocean or sea if the coordinates provided fall within a body of water. By default, this parameter is set to `0` for backward compatibility. When set to `1` and used in conjunction with `addressdetails=1`, the response will contain a limited `address` section consisting of only the `name` and `water` elements, providing the name of the ocean or sea the coordinates correspond to, if the coordinates fall within a body of water."
          },
          "showdistance": {
            "type": "integer",
            "enum": [
              0,
              1
            ],
            "default": 0,
            "description": "Returns the straight line distance (meters) between the input location and the result's location. Value is set in the `distance` key of the response. Defaults to `0`."
          },
          "statecode": {
            "type": "integer",
            "enum": [
              0,
              1
            ],
            "default": 0,
            "description": "Adds state or province code when available to the `state_code` key inside the `address` object. Currently supported for addresses in the USA, Canada and Australia. Defaults to `0`."
          },
          "source": {
            "type": "string",
            "description": "If this parameter is not specified, LocationIQ uses multiple public and proprietary datasets to return results. If you'd like to restrict results to only OpenStreetMap data, you can set the value of this parameter to `nom`. This will only query our internal cluster of Nominatim servers, and return results. We may still apply some post-processing steps to these results though, so results may vary from the official Nominatim instance."
          },
          "namedetails": {
            "type": "integer",
            "enum": [
              0,
              1
            ],
            "default": 0,
            "description": "Include a list of alternative names in the results. These may include language variants, references, operator and brand. Defaults to `0`."
          },
          "extratags": {
            "type": "integer",
            "enum": [
              0,
              1
            ],
            "default": 0,
            "description": "Include additional information in the result if available, e.g. wikipedia link, opening hours. Defaults to `0`."
          },
          "polygon_geojson": {
            "type": "integer",
            "enum": [
              0,
              1
            ],
            "default": 0,
            "description": "Output geometry of results in geojson format. Defaults to `0`."
          },
          "polygon_kml": {
            "type": "integer",
            "enum": [
              0,
              1
            ],
            "default": 0,
            "description": "Output geometry of results in kml format. Defaults to `0`."
          },
          "polygon_svg": {
            "type": "integer",
            "enum": [
              0,
              1
            ],
            "default": 0,
            "description": "Output geometry of results in svg format. Defaults to `0`."
          },
          "polygon_text": {
            "type": "integer",
            "enum": [
              0,
              1
            ],
            "default": 0,
            "description": "Output geometry of results as a WKT. Defaults to `0`."
          },
          "polygon_threshold": {
            "type": "number",
            "default": 0,
            "examples": [
              0.2
            ],
            "description": "When one of the polygon_* outputs is chosen, return a simplified version of the output geometry. The parameter describes the tolerance in degrees with which the geometry may differ from the original geometry. Topology is preserved in the geometry."
          }
        },
        "required": [
          "lat",
          "lon"
        ]
      }
    ]
  }
} as const;
export default Reverse
