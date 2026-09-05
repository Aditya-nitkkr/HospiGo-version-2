const Nearest = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "profile": {
            "type": "string",
            "examples": [
              "driving"
            ],
            "description": "Mode of transportation. Only `driving` is supported at the moment. "
          },
          "coordinates": {
            "type": "string",
            "description": "String of format `{longitude},{latitude};{longitude},{latitude}[;{longitude},{latitude} ...]` or `polyline({polyline}) or polyline6({polyline6})`. <br> You can send up to a maximum of `25` coordinate pairs per request (except `Nearest API` where `coordinates` only supports a single {longitude},{latitude} entry)"
          }
        },
        "required": [
          "profile",
          "coordinates"
        ]
      },
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "bearings": {
            "type": "string",
            "examples": [
              "10,20;40,30;30,9"
            ],
            "description": "Limits the search to segments with given bearing in degrees towards true north in clockwise direction. List of positive integer pairs separated by semi-colon and bearings array should be equal to length of coordinate array. Accepted Value :- `{bearing};{bearing}[;{bearing} ...]`\nEach `{bearing}` follows the following format: `{value},{range}` `integer 0 .. 360,integer 0 .. 180`"
          },
          "radiuses": {
            "type": "string",
            "examples": [
              "500;200;300"
            ],
            "description": "Limits the search to given radius in meters Radiuses array length should be same as coordinates array, each value separated by semi-colon. Accepted Value - `{radius};{radius}[;{radius} ...]`\nEach `{radius}` has following format: `double >= 0` or `unlimited` (default)"
          },
          "hints": {
            "type": "string",
            "description": "Hint from previous request to derive position in street network. Accepted value: `{hint};{hint}[;{hint} ...]`"
          },
          "number": {
            "type": "integer",
            "examples": [
              3
            ],
            "description": "Number of nearest segments that should be returned. Accepted value: `integer >= 1` (default `1`) "
          }
        }
      }
    ]
  }
} as const;
export default Nearest
