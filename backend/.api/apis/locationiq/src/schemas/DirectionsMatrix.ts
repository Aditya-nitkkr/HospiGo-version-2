const DirectionsMatrix = {
  "title": "directions-matrix",
  "type": "object",
  "properties": {
    "code": {
      "type": "string",
      "description": "If the request was successful `Ok` otherwise see the service dependent and general status codes."
    },
    "distances": {
      "type": "array",
      "description": "array of arrays that stores the matrix in row-major order. `distances[i][j]` gives the travel distance from\n  the i-th waypoint to the j-th waypoint. Values are given in meters. Can be `null` if no route between `i` and `j` can be found.",
      "items": {
        "type": "array",
        "items": {
          "x-stoplight": {
            "id": "47kxducsjqmpa"
          },
          "type": "number"
        }
      }
    },
    "durations": {
      "type": "array",
      "x-stoplight": {
        "id": "1dbpasj6bvxow"
      },
      "description": "array of arrays that stores the matrix in row-major order. `durations[i][j]` gives the travel time from\n  the i-th waypoint to the j-th waypoint. Values are given in seconds. Can be `null` if no route between `i` and `j` can be found.",
      "items": {
        "x-stoplight": {
          "id": "d0uif6pp5vwkx"
        },
        "type": "array",
        "items": {
          "x-stoplight": {
            "id": "l20aqj8f0wgop"
          },
          "type": "number"
        }
      }
    },
    "fallback_speed_cells": {
      "type": "array",
      "items": {
        "type": "number"
      }
    },
    "sources": {
      "type": "array",
      "description": "array of `Waypoint` objects describing all sources in order.",
      "items": {
        "type": "object",
        "properties": {
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
    },
    "destinations": {
      "type": "array",
      "description": "array of `Waypoint` objects describing all destinations in order.",
      "items": {
        "type": "object",
        "properties": {
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
  "x-readme-ref-name": "directions-matrix",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default DirectionsMatrix
