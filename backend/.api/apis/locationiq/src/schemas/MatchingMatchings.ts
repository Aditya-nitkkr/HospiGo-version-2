import MatchingsRouteLegs from './MatchingsRouteLegs.js';

const MatchingMatchings = {
  "type": "array",
  "description": "An array of `Route` objects that assemble the trace.",
  "items": {
    "type": "object",
    "properties": {
      "duration": {
        "type": "number"
      },
      "distance": {
        "type": "number"
      },
      "weight": {
        "type": "number"
      },
      "geometry": {
        "type": "string"
      },
      "confidence": {
        "type": "number",
        "description": "Confidence of the matching. `float` value between 0 and 1. 1 is very confident that the matching is correct."
      },
      "weight_name": {
        "type": "string"
      },
      "legs": MatchingsRouteLegs
    }
  },
  "title": "matching_matchings",
  "x-readme-ref-name": "matching_matchings"
} as const;
export default MatchingMatchings
