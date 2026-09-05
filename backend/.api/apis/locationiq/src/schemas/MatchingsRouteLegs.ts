const MatchingsRouteLegs = {
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "steps": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "intersections": {
              "type": "object",
              "properties": {
                "out": {
                  "type": "number"
                },
                "entry": {
                  "type": "string"
                },
                "location": {
                  "type": "array",
                  "items": {
                    "type": "number"
                  }
                },
                "bearings": {
                  "type": "number"
                }
              }
            },
            "driving_side": {
              "type": "string"
            },
            "geometry": {
              "type": "string"
            },
            "duration": {
              "type": "number"
            },
            "distance": {
              "type": "number"
            },
            "name": {
              "type": "string"
            },
            "weight": {
              "type": "number"
            },
            "mode": {
              "type": "string"
            },
            "maneuver": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "bearing_after": {
                    "type": "number"
                  },
                  "location": {
                    "type": "array",
                    "items": {
                      "type": "number"
                    }
                  },
                  "type": {
                    "type": "string"
                  },
                  "bearing_before": {
                    "type": "number"
                  },
                  "modifier": {
                    "type": "string"
                  },
                  "ref": {
                    "type": "string"
                  }
                }
              }
            }
          }
        }
      },
      "weight": {
        "type": "number"
      },
      "distance": {
        "type": "number"
      },
      "summary": {
        "type": "string"
      },
      "duration": {
        "type": "string"
      }
    }
  },
  "title": "matchings_route_legs",
  "x-readme-ref-name": "matchings_route_legs"
} as const;
export default MatchingsRouteLegs
