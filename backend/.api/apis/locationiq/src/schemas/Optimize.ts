const Optimize = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "profile": {
            "type": "string",
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
          "roundtrip": {
            "type": "string",
            "description": "Returned route is a roundtrip (route returns to first location) . Accepted value: `true` (default), `false`"
          },
          "source": {
            "type": "string",
            "description": "Returned route starts at `any` or `first` coordinate. Accepted value: `any` (default), `first`."
          },
          "destination": {
            "type": "string",
            "description": "Returned route ends at `any` or `last` coordinate. Accepted value: `any` (default), `last`."
          },
          "steps": {
            "type": "string",
            "examples": [
              "true"
            ],
            "description": "Returned route steps for each route leg.\nAccepted value:  `true`, `false` (default)"
          },
          "annotations": {
            "type": "string",
            "default": "false",
            "examples": [
              "false"
            ],
            "description": "Returns additional metadata for each coordinate along the route geometry.\nAccepted value: `true`, `false` (default), `nodes`, `distance`, `duration`, `datasources`, `weight`, `speed`"
          },
          "geometries": {
            "type": "string",
            "default": "polyline",
            "examples": [
              "polyline"
            ],
            "description": "Returned route geometry format (influences overview and per step). Accepted value: `polyline` (default), `polyline6`, `geojson`"
          },
          "overview": {
            "type": "string",
            "default": "simplified",
            "examples": [
              "simplified"
            ],
            "description": "Add overview geometry either full, simplified according to highest zoom level it could be display on, or not at all.\nAccepted value: `simplified` (default), `full`, `false`"
          }
        }
      }
    ]
  }
} as const;
export default Optimize
