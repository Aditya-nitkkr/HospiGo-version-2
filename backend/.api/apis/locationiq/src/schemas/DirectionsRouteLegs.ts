const DirectionsRouteLegs = {
  "type": "array",
  "description": "Represents a route between two waypoints.",
  "items": {
    "type": "object",
    "properties": {
      "steps": {
        "type": "array",
        "description": "A step consists of a maneuver such as a turn or merge, followed\nby a distance of travel along a single way to the subsequent\nstep.\n\nDepends on the `steps` parameter.\n\n| steps        |                                                                       |\n|--------------|-----------------------------------------------------------------------|\n| true         | array of `RouteStep` objects describing the turn-by-turn instructions |\n| false        | empty array                                                           |",
        "items": {
          "type": "object",
          "properties": {
            "intersections": {
              "type": "object",
              "description": "An intersection gives a full representation of any cross-way the path passes bay. For every step, the very first intersection (`intersections[0]`) corresponds to the\nlocation of the StepManeuver. Further intersections are listed for every cross-way until the next turn instruction.",
              "properties": {
                "location": {
                  "type": "array",
                  "description": "A `[longitude, latitude]` pair describing the location of the turn.",
                  "items": {
                    "type": "number"
                  }
                },
                "in": {
                  "type": "number",
                  "x-stoplight": {
                    "id": "lskt57vdr20n9"
                  },
                  "description": "index into bearings/entry array. Used to calculate the bearing just before the turn. Namely, the clockwise angle from true north to the\n  direction of travel immediately before the maneuver/passing the intersection. Bearings are given relative to the intersection. To get the bearing\n  in the direction of driving, the bearing has to be rotated by a value of 180. The value is not supplied for `depart` maneuvers."
                },
                "out": {
                  "type": "number",
                  "description": "index into the bearings/entry array. Used to extract the bearing just after the turn. Namely, The clockwise angle from true north to the\n  direction of travel immediately after the maneuver/passing the intersection. The value is not supplied for `arrive` maneuvers."
                },
                "bearings": {
                  "type": "number",
                  "description": "A list of bearing values (e.g. [0,90,180,270]) that are available at the intersection. The bearings describe all available roads at the intersection. Values are between 0-359 (0=true north)"
                },
                "entry": {
                  "type": "string",
                  "description": "A list of entry flags, corresponding in a 1:1 relationship to the bearings. A value of `true` indicates that the respective road could be entered on a valid route.\n  `false` indicates that the turn onto the respective road would violate a restriction."
                },
                "classes": {
                  "type": "array",
                  "x-stoplight": {
                    "id": "8eciacki4fjia"
                  },
                  "description": "An array of strings signifying the classes (as specified in the profile) of the road exiting the intersection.",
                  "items": {
                    "x-stoplight": {
                      "id": "zl73uiawtykik"
                    },
                    "type": "string"
                  }
                },
                "lanes": {
                  "type": "array",
                  "x-stoplight": {
                    "id": "cbz5c1js7urfb"
                  },
                  "description": "A `Lane` represents a turn lane at the corresponding turn location.",
                  "items": {
                    "x-stoplight": {
                      "id": "2belpw9ad3exo"
                    },
                    "type": "object",
                    "properties": {
                      "indications": {
                        "type": "string",
                        "x-stoplight": {
                          "id": "c4au3wfzuqkb3"
                        },
                        "description": "An indication (e.g. marking on the road) specifying the turn lane. A road can have multiple indications (e.g. an arrow pointing straight and left). The indications are given in an array, each containing one of the following types. Further indications might be added on without an API version change.\n\n| `value`                | Description                                                                                                               |\n|------------------------|---------------------------------------------------------------------------------------------------------------------------|\n| `none`                 | No dedicated indication is shown.                                                                                         |\n| `uturn`                | An indication signaling the possibility to reverse (i.e. fully bend arrow).                                               |\n| `sharp right`          | An indication indicating a sharp right turn (i.e. strongly bend arrow).                                                   |\n| `right`                | An indication indicating a right turn (i.e. bend arrow).                                                                  |\n| `slight right`         | An indication indicating a slight right turn (i.e. slightly bend arrow).                                                  |\n| `straight`             | No dedicated indication is shown (i.e. straight arrow).                                                                   |\n| `slight left`          | An indication indicating a slight left turn (i.e. slightly bend arrow).                                                   |\n| `left`                 | An indication indicating a left turn (i.e. bend arrow).                                                                   |\n| `sharp left`           | An indication indicating a sharp left turn (i.e. strongly bend arrow).                                                    |"
                      },
                      "valid": {
                        "type": "string",
                        "x-stoplight": {
                          "id": "rm2ay92cpk5dn"
                        },
                        "description": "A boolean flag (represented as `string`) indicating whether the lane is a valid choice in the current maneuver."
                      }
                    }
                  }
                }
              }
            },
            "driving_side": {
              "type": "string",
              "description": "The legal driving side at the location for this step. Either `left` or `right`."
            },
            "geometry": {
              "type": "string",
              "description": "The unsimplified geometry of the route segment, depending on the `geometries` parameter.\n\n| `geometry` |                                                                    |\n|------------|--------------------------------------------------------------------|\n| polyline   | [polyline](https://www.npmjs.com/package/polyline) with precision 5 in [latitude,longitude] encoding |\n| polyline6  | [polyline](https://www.npmjs.com/package/polyline) with precision 6 in [latitude,longitude] encoding |\n| geojson    | [GeoJSON `LineString`](http://geojson.org/geojson-spec.html#linestring) |"
            },
            "duration": {
              "type": "number",
              "description": "The estimated travel time, in `float` number of seconds."
            },
            "distance": {
              "type": "number",
              "description": "The distance of travel from the maneuver to the subsequent step, in `float` meters."
            },
            "name": {
              "type": "string",
              "description": "The name of the way along which travel proceeds."
            },
            "weight": {
              "type": "number",
              "description": "The calculated weight of the step."
            },
            "mode": {
              "type": "string",
              "description": "A string signifying the mode of transportation."
            },
            "maneuver": {
              "type": "array",
              "description": "A `StepManeuver` object representing the maneuver.",
              "items": {
                "type": "object",
                "properties": {
                  "bearing_after": {
                    "type": "number",
                    "description": "The clockwise angle from true north to the\n  direction of travel immediately after the maneuver. Range 0-359."
                  },
                  "location": {
                    "type": "array",
                    "description": "A `[longitude, latitude]` pair describing the location of the turn.",
                    "items": {
                      "type": "number"
                    }
                  },
                  "type": {
                    "type": "string",
                    "description": "A string indicating the type of maneuver. **new identifiers might be introduced without API change**\n\n| `type`           | Description                                                  |\n|------------------|--------------------------------------------------------------|\n| `turn`           | a basic turn into direction of the `modifier`                |\n| `new name`       | no turn is taken/possible, but the road name changes. The road can take a turn itself, following `modifier`.                  |\n| `depart`         | indicates the departure of the leg                           |\n| `arrive`         | indicates the destination of the leg                         |\n| `merge`          | merge onto a street (e.g. getting on the highway from a ramp, the `modifier specifies the direction of the merge`) |\n| `ramp`           | **Deprecated**. Replaced by `on_ramp` and `off_ramp`.        |\n| `on ramp`        | take a ramp to enter a highway (direction given my `modifier`) |\n| `off ramp`       | take a ramp to exit a highway (direction given my `modifier`)  |\n| `fork`           | take the left/right side at a fork depending on `modifier`   |\n| `end of road`    | road ends in a T intersection turn in direction of `modifier`|\n| `use lane`       | **Deprecated** replaced by lanes on all intersection entries |\n| `continue`       | Turn in direction of `modifier` to stay on the same road     |\n| `roundabout`     | traverse roundabout, if the route leaves the roundabout there will be an additional property `exit` for exit counting. The modifier specifies the direction of entering the roundabout. |\n| `rotary`         | a traffic circle. While very similar to a larger version of a roundabout, it does not necessarily follow roundabout rules for right of way. It can offer `rotary_name` and/or `rotary_pronunciation` parameters (located in the RouteStep object) in addition to the `exit` parameter (located on the StepManeuver object).  |\n| `roundabout turn`| Describes a turn at a small roundabout that should be treated as normal turn. The `modifier` indicates the turn direction. Example instruction: `At the roundabout turn left`. |\n| `notification`   | not an actual turn but a change in the driving conditions. For example the travel mode or classes. If the road takes a turn itself, the `modifier` describes the direction |\n| `exit roundabout`| Describes a maneuver exiting a roundabout (usually preceded by a `roundabout` instruction) |\n| `exit rotary`    | Describes the maneuver exiting a rotary (large named roundabout) |"
                  },
                  "bearing_before": {
                    "type": "number",
                    "description": "he clockwise angle from true north to the\n  direction of travel immediately before the maneuver. Range 0-359."
                  },
                  "modifier": {
                    "type": "string",
                    "description": "An optional `string` indicating the direction change of the maneuver.\n\n| `modifier`        | Description                               |\n|-------------------|-------------------------------------------|\n| `uturn`           | indicates  reversal of direction          |\n| `sharp right`     | a sharp right turn                        |\n| `right`           | a normal turn to the right                |\n| `slight right`    | a slight turn to the right                |\n| `straight`        | no relevant change in direction           |\n| `slight left`     | a slight turn to the left                 |\n| `left`            | a normal turn to the left                 |\n| `sharp left`      | a sharp turn to the left                  |\n\n The list of turns without a modifier is limited to: `depart/arrive`. If the source/target location is close enough to the `depart/arrive` location, no modifier will be given.\n\n  The meaning depends on the `type` property.\n\n| `type`                 | Description                                                                                                               |\n|------------------------|---------------------------------------------------------------------------------------------------------------------------|\n| `turn`                 | `modifier` indicates the change in direction accomplished through the turn                                                |\n| `depart`/`arrive`      | `modifier` indicates the position of departure point and arrival point in relation to the current direction of travel     |\n\n- `exit` An optional `integer` indicating number of the exit to take. The property exists for the `roundabout` / `rotary` property:\n  Number of the roundabout exit to take. If exit is `undefined` the destination is on the roundabout.\n\n\nNew properties (potentially depending on `type`) may be introduced in the future without an API version change."
                  },
                  "ref": {
                    "type": "string",
                    "description": "A reference number or code for the way. Optionally included, if ref data is available for the given way."
                  }
                }
              }
            }
          }
        }
      },
      "weight": {
        "type": "number",
        "description": "The calculated weight of the route leg."
      },
      "distance": {
        "type": "number",
        "description": "The distance traveled by this route leg, in `float` meters.\n"
      },
      "annotations": {
        "type": "object",
        "description": "Additional details about each coordinate along the route geometry, with fine-grained information about each segment or node id.\n\n| annotations  |                                                                               |\n|--------------|-------------------------------------------------------------------------------|\n| true         | An `Annotation` object containing node ids, durations, distances and weights. |\n| false        | `undefined`                                                                   |\n",
        "properties": {
          "speed": {
            "type": "array",
            "description": "Convenience field, calculation of `distance / duration` rounded to one decimal place.",
            "items": {
              "type": "number"
            }
          },
          "metadata": {
            "type": "object",
            "description": "Metadata related to other annotations.",
            "properties": {
              "datasource_names": {
                "type": "array",
                "description": "The names of the datasources used for the speed between each pair of coordinates. `lua profile` is the default profile, other values are the filenames supplied via `--segment-speed-file` to `osrm-contract` or `osrm-customize`.",
                "items": {
                  "type": "string"
                }
              }
            }
          },
          "nodes": {
            "type": "array",
            "description": "The OSM node ID for each coordinate along the route, excluding the first/last user-supplied coordinates.",
            "items": {
              "type": "number"
            }
          },
          "duration": {
            "type": "array",
            "description": "The duration between each pair of coordinates, in seconds. Does not include the duration of any turns.",
            "items": {
              "type": "number"
            }
          },
          "distance": {
            "type": "array",
            "description": "The distance, in meters, between each pair of coordinates.",
            "items": {
              "type": "number"
            }
          },
          "weight": {
            "type": "array",
            "description": "The weights between each pair of coordinates. Does not include any turn costs.",
            "items": {
              "type": "number"
            }
          },
          "datasources": {
            "type": "array",
            "description": "The index of the datasource for the speed between each pair of coordinates. `0` is the default profile, other values are supplied via `--segment-speed-file` to `osrm-contract` or `osrm-customize`. String-like names are in the `metadata.datasource_names` array.",
            "items": {
              "type": "number"
            }
          }
        }
      },
      "summary": {
        "type": "string",
        "description": "Summary of the route taken as `string`. Depends on the `summary` parameter.\n\n| summary      |                                                                       |\n|--------------|-----------------------------------------------------------------------|\n| true         | Names of the two major roads used. Can be empty if route is too short.|\n| false        | empty `string`                                                        |"
      },
      "duration": {
        "type": "string",
        "description": "The estimated travel time, in `float` number of seconds."
      }
    }
  },
  "title": "directions_route_legs",
  "x-readme-ref-name": "directions_route_legs"
} as const;
export default DirectionsRouteLegs
