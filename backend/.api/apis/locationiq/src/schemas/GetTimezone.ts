const GetTimezone = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "lat": {
            "type": "number",
            "format": "float",
            "examples": [
              40.748442
            ],
            "description": "Latitude of the location to generate an address for."
          },
          "lon": {
            "type": "number",
            "format": "float",
            "examples": [
              -73.985658
            ],
            "description": "Longitude of the location to generate an address for."
          },
          "timestamp": {
            "type": "number",
            "examples": [
              1701179610
            ],
            "description": "Unix epoch time in seconds (number of seconds since January 1, 1970, 00:00:00 UTC). Defaults to current time if omitted. This parameter allows retrieval of time zone information for specific moments, which is useful for handling Daylight Saving Time changes and ensuring correct time zone offsets for historical data or future event scheduling."
          }
        },
        "required": [
          "lat",
          "lon"
        ]
      }
    ]
  }
} as const;
export default GetTimezone
