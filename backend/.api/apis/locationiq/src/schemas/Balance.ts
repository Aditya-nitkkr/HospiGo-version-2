import Daybalance from './Daybalance.js';

const Balance = {
  "title": "balance",
  "type": "object",
  "properties": {
    "status": {
      "type": "string",
      "description": "`ok` on success.\n",
      "examples": [
        "ok"
      ]
    },
    "balance": Daybalance
  },
  "x-examples": {
    "Example 1": {
      "status": "ok",
      "balance": {
        "day": 30000,
        "bonus": 0
      }
    }
  },
  "x-readme-ref-name": "balance",
  "$schema": "http://json-schema.org/draft-04/schema#"
} as const;
export default Balance
