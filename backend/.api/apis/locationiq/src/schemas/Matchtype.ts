const Matchtype = {
  "title": "matchtype",
  "x-stoplight": {
    "id": "20ejxqp1iy2wr"
  },
  "type": "string",
  "description": "Specifies quality of the returned location match\n  \n  matchtype    | description\n --------------|---------------\n  point        | The coordinate returned is a point address, typically with rooftop accuracy.\n  centroid     | The coordinate returned is a centroid of a road or administrative boundary.\n  interpolated | The coordinate returned is a point determined by interpolation.",
  "x-readme-ref-name": "matchtype"
} as const;
export default Matchtype
