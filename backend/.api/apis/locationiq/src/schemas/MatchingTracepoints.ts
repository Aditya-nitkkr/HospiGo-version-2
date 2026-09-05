const MatchingTracepoints = {
  "type": "array",
  "description": "Array of `Waypoint` objects representing all points of the trace in order.\n\nIf the trace point was omitted by map matching because it is an outlier, the entry will be `null`.",
  "items": {
    "type": "object",
    "properties": {
      "waypoint_index": {
        "type": "integer",
        "description": "Index of the waypoint inside the matched route."
      },
      "matchings_index": {
        "type": "integer",
        "description": "Index to the `Route` object in `matchings` the sub-trace was matched to."
      },
      "alternatives_count": {
        "type": "integer",
        "description": "Number of probable alternative matchings for this trace point. A value of zero indicate that this point was matched unambiguously. Split the trace at these points for incremental map matching."
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
  },
  "title": "matching_tracepoints",
  "x-readme-ref-name": "matching_tracepoints"
} as const;
export default MatchingTracepoints
