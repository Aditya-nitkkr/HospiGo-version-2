const Timezone = {
  "type": "object",
  "x-examples": {
    "Example 1": {
      "timezone": {
        "name": "Asia/Kolkata",
        "now_in_dst": 0,
        "offset_sec": 19800,
        "short_name": "IST",
        "full_name": "India Standard Time"
      }
    }
  },
  "properties": {
    "timezone": {
      "type": "object",
      "description": "Timezone object found for the location.",
      "properties": {
        "name": {
          "type": "string",
          "description": "Timezone identifier, compatible with the IANA Tz Database. Typically in the format \"Area/Location\" (e.g., \"America/New_York\", \"Europe/Paris\"), but can also include ocean areas (e.g., \"Atlantic/Azores\") and special administrative zones (e.g., \"Etc/UTC\", \"Etc/GMT-14\"). We always return the most current identifier (e.g., \"Asia/Kolkata\", not \"Asia/Calcutta\"). Note that \"Etc/GMT\" zones use POSIX-style signs, opposite to ISO 8601 convention (e.g., \"Etc/GMT-14\" is 14 hours ahead of GMT)."
        },
        "now_in_dst": {
          "type": "integer",
          "description": "Represents whether the zone currently observing `DST` or not."
        },
        "offset_sec": {
          "type": "integer",
          "description": "The offset from `UTC` (in seconds) for the given location. Considers `DST` savings."
        },
        "short_name": {
          "type": "string",
          "description": "Time zone abbreviation, usually 3 or 4 letters (e.g., \"EDT\" for Eastern Daylight Time, \"CEST\" for Central European Summer Time). In some cases, especially for locations without standardized abbreviations, it may be a numeric UTC offset (e.g., \"+03\" or \"+0330\")."
        },
        "full_name": {
          "type": "string",
          "x-stoplight": {
            "id": "1qb7hcby2gwow"
          },
          "description": "Complete, descriptive name of the time zone, e.g. \"Pacific Daylight Time\" or \"Central European Standard Time\". For some locations (e.g., oceans) where such a name is unavailable, it is returned in the format of GMT±HH:MM (e.g., GMT+03:30)."
        }
      }
    }
  },
  "title": "timezone",
  "x-readme-ref-name": "timezone",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default Timezone
