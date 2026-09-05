const Autocomplete = {
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
          "countrycodes": {
            "type": "string",
            "examples": [
              "us,ca,gb"
            ],
            "description": "Limit search results to a specific country or a comma-separated list of countries. Should be the ISO 3166-1 alpha-2 code(s)."
          },
          "tag": {
            "type": "string",
            "examples": [
              "place:city"
            ],
            "description": "Restricts results to specific types of elements. This can be used to return only administrative areas - such as towns or cities - or specific Points of Interest such as schools or restaurants. \nThis is defined as key value pairs of `class` and `type` values based on OpenStreetMap''s (OSM) <a href=\"https://wiki.openstreetmap.org/wiki/Map_Features\" target=\"_blank\">exhaustive list</a>. \nMultiple `class` and `type` values can be specified as a comma-separated list.<br/><br/>\nExamples:<ul><li>To return only cities: `tag=place:city`</li><li>To return only types of `place`, such as Suburbs, Towns and Cities, use a wildcard: `tag=place:*`</li><li>To restrict results to specific types of `place`: `tag=place:city,place:town,place:village`</li><li>To restrict results to cafes: `tag=amenity:cafe`</ul> '"
          },
          "limit": {
            "type": "integer",
            "minimum": 1,
            "maximum": 20,
            "description": "Limit the number of returned results. Accepted value: `1` to `20`. Defaults to `10`."
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
          "json_callback": {
            "type": "string",
            "description": "Wrap json output in a callback function (JSONP) i.e. &lt;string&gt;(&lt;json&gt;). Only has an effect for JSON output formats."
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
          "accept-language": {
            "type": "string",
            "default": "en",
            "examples": [
              "en"
            ],
            "description": "Preferred language order for showing search results, overrides the value specified in the `Accept-Language` HTTP header. Defaults to `en`. \n\nTo use native language for the response when available, use `accept-language=native`. \n\nEither uses standard <a href=\"https://tools.ietf.org/html/rfc2616#section-14.4\" target=\"_blank\">rfc2616 accept-language string</a> or a simple comma separated list of language codes."
          },
          "importancesort": {
            "type": "integer",
            "enum": [
              0,
              1
            ],
            "default": 1,
            "description": "Determines whether results are sorted by their individual `importance` values. If `importancesort=0` and is used along with the `viewbox` parameter, results are sorted only by distance. Defaults to `1`."
          },
          "dedupe": {
            "type": "integer",
            "enum": [
              0,
              1
            ],
            "default": 0,
            "description": "Sometimes you have several objects in OSM identifying the same place or object in reality. The simplest case is a street being split in many different OSM ways due to different characteristics. Our Geocoder will attempt to detect such duplicates and only return one match; this is controlled by the dedupe parameter which defaults to `0`. Since the limit is, for reasons of efficiency, enforced before and not after de-duplicating, it is possible that de-duplicating leaves you with less results than requested."
          }
        },
        "required": [
          "q"
        ]
      }
    ]
  }
} as const;
export default Autocomplete
