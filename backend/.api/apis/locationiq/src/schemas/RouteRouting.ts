import DirectionsRouteLegs from './DirectionsRouteLegs.js';

const RouteRouting = {
  "title": "route-routing",
  "type": "object",
  "properties": {
    "legs": DirectionsRouteLegs,
    "weight_name": {
      "type": "string"
    },
    "geometry": {
      "type": "string"
    },
    "weight": {
      "type": "number"
    },
    "distance": {
      "type": "number"
    },
    "duration": {
      "type": "number"
    }
  },
  "x-readme-ref-name": "route-routing"
} as const;
export default RouteRouting
