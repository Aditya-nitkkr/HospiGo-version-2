import RoutesRouting from './RoutesRouting.js';
import Waypoints from './Waypoints.js';

const DirectionsDirections = {
  "title": "directions-directions",
  "type": "object",
  "x-examples": {
    "Example 1": {
      "code": "string",
      "waypoints": [
        {
          "distance": 0,
          "location": [
            0
          ]
        }
      ],
      "routes": []
    }
  },
  "properties": {
    "code": {
      "type": "string",
      "description": "If the request was successful `Ok` otherwise see the service dependent and general status codes."
    },
    "waypoints": Waypoints,
    "routes": RoutesRouting
  },
  "x-readme-ref-name": "directions-directions",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default DirectionsDirections
