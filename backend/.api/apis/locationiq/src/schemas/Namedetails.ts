const Namedetails = {
  "type": "object",
  "x-examples": {
    "Example 1": {
      "name": "Empire State Building",
      "name:en": "Empire State Building",
      "name:es": "Edificio Empire State",
      "name:he": "בניין אמפייר סטייט",
      "name:hi": "एम्पायर स्टेट बिल्डिंग",
      "name:ko": "엠파이어 스테이트 빌딩",
      "name:ru": "Эмпайр-Стейт-Билдинг",
      "name:uk": "Емпайр-Стейт-Білдінг",
      "name:zh": "帝国大厦"
    }
  },
  "properties": {
    "name": {
      "type": "string"
    }
  },
  "description": "The dictionary with full list of available names including ref etc. Returned when `namedetails=1` is set in the request.\n",
  "title": "namedetails",
  "x-readme-ref-name": "namedetails"
} as const;
export default Namedetails
