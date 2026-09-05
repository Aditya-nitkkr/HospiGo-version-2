const Nearby = {
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
          "tag": {
            "type": "string",
            "examples": [
              "amenity:school"
            ],
            "description": "You can use a `tag` to restrict your results on the Nearby API. We support two types of tags, a single-word format for common use-cases and key-value pairs for advanced use-cases.\n\n### 1. Single-word Format (Simple)\nFor most use-cases, the list of tags below should suffice. Multiple tags can be specified as a comma-separated list.\n\nTag             | Description\n----------------| -----------\nall             | Return a list of all PoIs\nairport         | List of airports\nrestaurant      | List of restaurants\nbank            | List of banks\natm             | List of ATMs\nhotel           | List of hotels\npub             | List of pubs\nbus_station     | List of bus stations\nrailway_station | List of railway stations\ncinema          | List of cinema theatres\nhospital        | List of hospitals\ncollege         | List of colleges\nschool          | List of schools\npharmacy        | List of pharmacies\nsupermarket     | List of supermarket\nfuel            | List of fuel stations\ngym             | List of gyms\nplace_of_worship| List of places of worship\ntoilet          | List of toilets\npark            | List of parks\nstadium         | List of stadiums\nparking         | List of parking\ncardealer       | List of car dealers\n\n### 2. Key Value Format (Advanced)\nFor advanced use-cases that need additional tags not present in the table above, we also support tags based on OpenStreetMap''s (OSM)  <a href=\"https://wiki.openstreetmap.org/wiki/Map_Features\" target=\"_blank\">exhaustive list</a> of tags. These tags are represented as key-value pairs of `class` and `type` values. Multiple `class` and `type` values can be specified as a comma-separated list.\n\n**Examples:** \n* To return a list of all PoIs: tag=all\n* To return records with amenity class (e.g., restaurants, hospitals, banks): tag=amenity:*\n* To return records with the amenity class and school as type (i.e., a list of schools): tag=amenity:school\n* To return all records except those with amenity as class: tag=all,!amenity:*\n* To return all records in the amenity class except gym: tag=amenity:*,!amenity:gym\n* To return all records except elements with amenity as class and gym as type: tag=!amenity:gym\n* To return a list of airports, hotels, and parking spaces nearby: tag=aeroway:aerodrome,tourism:hotel,amenity:parking"
          },
          "radius": {
            "type": "integer",
            "default": 100,
            "minimum": 1,
            "maximum": 30000,
            "description": "Radius (in meters) from the given latitude and longitude to search for results in.\nAccepted value: `1` to `30000`. Defaults to `100`."
          },
          "limit": {
            "type": "integer",
            "minimum": 1,
            "maximum": 50,
            "description": "Limit the number of returned results. Accepted value: `1` to `50`. Defaults to `10`."
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
export default Nearby
