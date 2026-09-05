import Matchcode from './Matchcode.js';
import Matchlevel from './Matchlevel.js';
import Matchtype from './Matchtype.js';

const Matchquality = {
  "type": "object",
  "x-examples": {
    "Example 1": {
      "matchcode": "exact",
      "matchtype": "point",
      "matchlevel": "venue"
    }
  },
  "description": "An additional object `matchquality` for every result in the response, containing the following elements: `matchcode`, `matchtype`, `matchlevel`.",
  "properties": {
    "matchcode": Matchcode,
    "matchtype": Matchtype,
    "matchlevel": Matchlevel
  },
  "title": "matchquality",
  "x-readme-ref-name": "matchquality"
} as const;
export default Matchquality
