export class YandexGeocoder {
  constructor() {
    this.api_key = process.env.REACT_APP_YANDEX_API_KEY;
    this.geocoder_url = 'https://geocode-maps.yandex.ru/1.x';
  }

  async getAddressAndGeopoint(address) {
    try {
      const response = await fetch(`${this.geocoder_url}?apikey=${this.api_key}&geocode=${address}&format=json`);

      const result = await response.json();
      return result;
    } catch (e) {
      console.log(e);
    }
  }
}
