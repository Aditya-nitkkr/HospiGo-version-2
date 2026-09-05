const Daybalance = {
  "title": "daybalance",
  "type": "object",
  "description": "An array comprising individual components such as `day` and `bonus`.",
  "properties": {
    "day": {
      "type": "integer",
      "description": "Balance of requests credits in your account for the day.",
      "examples": [
        547933
      ]
    },
    "bonus": {
      "type": "integer",
      "description": "Balance of bonus / promotional request credits in your account.",
      "examples": [
        123
      ]
    }
  },
  "x-examples": {
    "Example 1": {
      "day": 30000,
      "bonus": 0
    }
  },
  "x-readme-ref-name": "daybalance"
} as const;
export default Daybalance
