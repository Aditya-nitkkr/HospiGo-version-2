const Waypoints = {
  "type": "array",
  "description": "Object used to describe waypoint on a route.",
  "items": {
    "type": "object",
    "properties": {
      "hint": {
        "type": "string",
        "x-stoplight": {
          "id": "to7sli9hdk2jt"
        },
        "description": "The distance, in meters, from the input coordinate to the snapped coordinate."
      },
      "distance": {
        "type": "number",
        "description": "The distance, in meters, from the input coordinate to the snapped coordinate."
      },
      "name": {
        "type": "string",
        "x-stoplight": {
          "id": "5vuo71t8c0zy4"
        },
        "description": "Unique internal identifier of the segment (ephemeral, not constant over data updates)\n   This can be used on subsequent request to significantly speed up the query and to connect multiple services.\n   E.g. you can use the `hint` value obtained by the `nearest` query as `hint` values for `route` inputs."
      },
      "location": {
        "type": "array",
        "description": "Array that contains the `[longitude, latitude]` pair of the snapped coordinate.",
        "items": {
          "type": "number"
        }
      }
    }
  },
  "title": "waypoints",
  "x-readme-ref-name": "waypoints"
} as const;
export default Waypoints
