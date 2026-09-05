const Extratags = {
  "type": "object",
  "x-examples": {
    "Example 1": {
      "ele": "15",
      "height": "443.2",
      "wikidata": "Q9188",
      "wikipedia": "en:Empire State Building",
      "start_date": "1931",
      "wheelchair": "yes",
      "building:use": "office",
      "opening_hours": "Mo-Su 08:00-02:00",
      "building:levels": "102",
      "construction_date": "1930-1931"
    }
  },
  "description": "The dictionary with additional useful tags like website or maxspeed. Returned when `extratags=1` is set in the request.\n",
  "title": "extratags",
  "x-readme-ref-name": "extratags",
  "additionalProperties": true
} as const;
export default Extratags
