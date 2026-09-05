const Geotext = {
  "type": "string",
  "x-examples": {
    "Example 1": "POLYGON((-73.9865012 40.748491,-73.9851602 40.7479255,-73.9848166 40.7483931,-73.9861574 40.7489585,-73.9863252 40.7487301,-73.9863554 40.748689,-73.9864839 40.7485145,-73.9865012 40.748491))"
  },
  "title": "geotext",
  "description": "Output geometry of results as a WKT. Returned when `polygon_text=1` is set in the request.",
  "x-readme-ref-name": "geotext"
} as const;
export default Geotext
