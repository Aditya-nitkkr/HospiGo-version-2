const Matchcode = {
  "title": "matchcode",
  "x-stoplight": {
    "id": "keiun4kwm07z4"
  },
  "type": "string",
  "description": "Specifies the quality of the returned address.\n\n matchcode  | description\n ------------|---------------\n  exact      | The result matches the input query with a high level of probability.\n  fallback   | The result does not exactly match the input but is closely related to it provided there is direct a heierarchial relation.\n  approximate| The result matches the input query with a medium to low level of probability.\n",
  "x-readme-ref-name": "matchcode"
} as const;
export default Matchcode
