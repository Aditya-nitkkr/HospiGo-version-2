const Geojson = {
  "type": "object",
  "properties": {
    "type": {
      "type": "string"
    },
    "coordinates": {
      "type": "array",
      "items": {
        "type": "number"
      }
    }
  },
  "x-examples": {
    "Example 1": {
      "type": "Polygon",
      "coordinates": [
        [
          [
            -73.9865012,
            40.748491
          ],
          [
            -73.9851602,
            40.7479255
          ],
          [
            -73.9848166,
            40.7483931
          ],
          [
            -73.9861574,
            40.7489585
          ],
          [
            -73.9863252,
            40.7487301
          ],
          [
            -73.9863554,
            40.748689
          ],
          [
            -73.9864839,
            40.7485145
          ],
          [
            -73.9865012,
            40.748491
          ]
        ]
      ]
    }
  },
  "description": "Output geometry of results in geojson format. Returned when `polygon_geojson=1` is set in the request.",
  "title": "geojson",
  "x-readme-ref-name": "geojson"
} as const;
export default Geojson
