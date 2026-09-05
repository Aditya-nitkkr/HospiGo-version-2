const Distance = {
  "type": "number",
  "x-examples": {
    "Example 1": 23
  },
  "format": "double",
  "description": "The straight line distance (meters) between the input location and the result's location. Returned when `showdistance=1` is set in the request.",
  "title": "distance",
  "x-readme-ref-name": "distance"
} as const;
export default Distance
