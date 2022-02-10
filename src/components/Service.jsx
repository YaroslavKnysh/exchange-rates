import axios from 'axios';

const API_KEY = '836f9fc0-8508-11ec-80e5-2bc14024e31e';

export function GetRates() {
  return axios.get(
    `https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5`,
  );
}

export function GetCurrency() {
  return axios.get(
    `https://freecurrencyapi.net/api/v2/latest?apikey=${API_KEY}&base_currency=UAH`,
  );
}
