const DirectionsNearest = {
  "title": "directions-nearest",
  "type": "object",
  "properties": {
    "code": {
      "type": "string",
      "description": "If the request was successful `Ok` otherwise see the service dependent and general status codes."
    },
    "waypoints": {
      "type": "array",
      "description": "Array of `Waypoint` objects sorted by distance to the input coordinate. ",
      "items": {
        "type": "object",
        "properties": {
          "nodes": {
            "type": "array",
            "description": "Array of OpenStreetMap node ids.",
            "items": {
              "type": "number"
            }
          },
          "distance": {
            "type": "number"
          },
          "location": {
            "type": "array",
            "items": {
              "type": "number"
            }
          },
          "name": {
            "type": "string"
          }
        }
      }
    }
  },
  "x-readme-ref-name": "directions-nearest",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default DirectionsNearest
