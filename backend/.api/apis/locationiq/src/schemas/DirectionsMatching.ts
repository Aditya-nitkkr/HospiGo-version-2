import MatchingMatchings from './MatchingMatchings.js';
import MatchingTracepoints from './MatchingTracepoints.js';

const DirectionsMatching = {
  "title": "directions-matching",
  "type": "object",
  "properties": {
    "code": {
      "type": "string",
      "description": "If the request was successful `Ok` otherwise see the service dependent and general status codes."
    },
    "tracepoints": MatchingTracepoints,
    "matchings": MatchingMatchings
  },
  "x-readme-ref-name": "directions-matching",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default DirectionsMatching
