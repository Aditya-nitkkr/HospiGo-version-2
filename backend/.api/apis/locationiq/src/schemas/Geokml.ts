const Geokml = {
  "type": "string",
  "x-examples": {
    "Example 1": "<Polygon><outerBoundaryIs><LinearRing><coordinates>-73.986501200000006,40.748491000000001 -73.985160199999996,40.747925500000001 -73.984816600000002,40.748393100000001 -73.986157399999996,40.748958500000001 -73.986325199999996,40.748730100000003 -73.986355399999994,40.748688999999999 -73.986483899999996,40.748514499999999 -73.986501200000006,40.748491000000001</coordinates></LinearRing></outerBoundaryIs></Polygon>"
  },
  "description": "Output geometry of results in kml format. Returned when `polygon_kml=1` is set in the request.",
  "title": "geokml",
  "x-readme-ref-name": "geokml"
} as const;
export default Geokml
