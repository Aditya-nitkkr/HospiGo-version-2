const Search = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "q": {
            "type": "string",
            "examples": [
              "Empire State Building"
            ],
            "description": "Free-form query string to search for. Commas are optional, but improves performance by reducing the complexity of the search."
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
          "addressdetails": {
            "type": "integer",
            "enum": [
              0,
              1
            ],
            "default": 0,
            "description": "Include a breakdown of the address of this result into elements. Defaults to `0`."
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
          "viewbox": {
            "type": "string",
            "examples": [
              "-73.9965012,40.7489255,-73.9858166,40.7499585"
            ],
            "description": "The preferred area to find search results. Any two corner points of the box - `max_lon,max_lat,min_lon,min_lat` or `min_lon,min_lat,max_lon,max_lat` - are accepted in any order as long as they span a real box. To restrict results to those within the viewbox, use along with the `bounded` option."
          },
          "bounded": {
            "type": "integer",
            "enum": [
              0,
              1
            ],
            "description": "Restrict result to items contained within the bounds specified in the `viewbox` parameter. Defaults to `0`."
          },
          "limit": {
            "type": "integer",
            "minimum": 1,
            "maximum": 50,
            "description": "Limit the number of returned results. Accepted value: `1` to `50`. Defaults to `10`."
          },
          "accept-language": {
            "type": "string",
            "default": "en",
            "examples": [
              "en"
            ],
            "description": "Preferred language order for showing search results, overrides the value specified in the `Accept-Language` HTTP header. Defaults to `en`. \n\nTo use native language for the response when available, use `accept-language=native`. \n\nEither uses standard <a href=\"https://tools.ietf.org/html/rfc2616#section-14.4\" target=\"_blank\">rfc2616 accept-language string</a> or a simple comma separated list of language codes."
          },
          "countrycodes": {
            "type": "string",
            "examples": [
              "us,ca,gb"
            ],
            "description": "Limit search results to a specific country or a comma-separated list of countries. Should be the ISO 3166-1 alpha-2 code(s)."
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
          "matchquality": {
            "type": "integer",
            "enum": [
              0,
              1
            ],
            "default": 0,
            "description": "Returns additional information about quality of the result in a `matchquality` object. Defaults to `0`."
          },
          "source": {
            "type": "string",
            "description": "If this parameter is not specified, LocationIQ uses multiple public and proprietary datasets to return results. If you'd like to restrict results to only OpenStreetMap data, you can set the value of this parameter to `nom`. This will only query our internal cluster of Nominatim servers, and return results. We may still apply some post-processing steps to these results though, so results may vary from the official Nominatim instance."
          },
          "normalizeimportance": {
            "type": "integer",
            "default": 1,
            "enum": [
              0,
              1
            ],
            "description": "When this parameter is absent or set to `1`, the `importance` value(s) in the API response is limited to the range of 0 to 1. Values outside this range are adjusted to the nearest boundary (0 or 1). Setting `normalizeimportance` to `0` allows the importance value to be lower or higher than the specified range of 0 to 1. Defaults to `1`"
          },
          "dedupe": {
            "type": "integer",
            "enum": [
              0,
              1
            ],
            "default": 1,
            "description": "Sometimes you have several objects in OSM identifying the same place or object in reality. The simplest case is a street being split in many different OSM ways due to different characteristics. Our Geocoder will attempt to detect such duplicates and only return one match; this is controlled by the dedupe parameter which defaults to `1`. Since the limit is, for reasons of efficiency, enforced before and not after de-duplicating, it is possible that de-duplicating leaves you with less results than requested."
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
          "json_callback": {
            "type": "string",
            "description": "Wrap json output in a callback function (JSONP) i.e. &lt;string&gt;(&lt;json&gt;). Only has an effect for JSON output formats."
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
          "q"
        ]
      }
    ]
  }
} as const;
export default Search
