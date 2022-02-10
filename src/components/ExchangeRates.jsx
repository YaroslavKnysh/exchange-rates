import React, { useState, useEffect } from 'react';
import * as GetApi from './Service';
import s from './style/Rates.module.css';

export default function ExchangeRates() {
  const [rates, setRates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currency, setCurrency] = useState('UAH');

  function fetchRates() {
    setIsLoading(true);
    GetApi.GetRates()
      .then(response => setRates(response.data))
      .finally(() => setIsLoading(false));
  }
  function format(number) {
    return number.toFixed(2);
  }
  useEffect(() => {
    fetchRates();
  }, []);
  return (
    <div className={s.rate__section}>
      <div className="container">
        <h1 className={s.rate__title}>Cash rate</h1>

        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Buy</th>
              <th>Sale</th>
            </tr>
          </thead>
          <tbody>
            {rates.slice(0, 3).map((rate, index) => (
              <tr key={index}>
                <td>{rate.ccy}</td>
                <td>{format(Number(rate.buy))} UAH</td>
                <td>{format(Number(rate.sale))} UAH</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3 className={s.bit__title}>Bitcoin today: </h3>
        <table>
          <thead>
            <tr>
              <th>Buy</th>
              <th>Sale</th>
            </tr>
          </thead>
          <tbody>
            {rates.slice(3).map((rate, index) => (
              <tr key={index}>
                <td>{format(Number(rate.buy))} USD</td>
                <td>{format(Number(rate.sale))} USD</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
