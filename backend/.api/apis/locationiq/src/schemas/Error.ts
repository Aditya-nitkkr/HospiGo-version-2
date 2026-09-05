const Error = {
  "title": "error",
  "type": "object",
  "properties": {
    "error": {
      "type": "string",
      "examples": [
        "Invalid key"
      ]
    }
  },
  "x-readme-ref-name": "error",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default Error
