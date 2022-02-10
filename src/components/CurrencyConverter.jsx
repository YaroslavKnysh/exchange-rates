import React, { useState, useEffect } from 'react';
import * as GetApi from './Service';
import s from './style/Converter.module.css';
// import Input from './Input';

export default function CurrencyConverter() {
  const [rates, setRates] = useState([]);
  const [amount1, setAmount1] = useState(0);
  const [amount2, setAmount2] = useState(0);
  const [currency1, setCurrency1] = useState('UAH');
  const [currency2, setCurrency2] = useState('USD');
  const [isLoading, setIsLoading] = useState(false);

  function fetchRate() {
    setIsLoading(true);

    GetApi.GetCurrency()
      .then(response => setRates(response.data.data))
      .finally(() => setIsLoading(false));
  }
  useEffect(() => {
    fetchRate();
  }, []);

  function format(number) {
    return number.toFixed(2);
  }
  function handleAm1Change(amount1) {
    setAmount2(format((amount1 * rates[currency2]) / rates[currency1]));
    setAmount1(amount1);
  }
  function handleCur1Change(currency1) {
    setAmount2(format((amount1 * rates[currency2]) / rates[currency1]));
    setCurrency1(currency1);
  }
  function handleAm2Change(amount2) {
    setAmount1(format((amount2 * rates[currency1]) / rates[currency2]));
    setAmount2(amount2);
  }
  function handleCur2Change(currency2) {
    setAmount1(format((amount2 * rates[currency1]) / rates[currency2]));
    setCurrency2(currency2);
  }

  return (
    <div className={s.converter__section}>
      <div className="container">
        <h1>Currency converter</h1>
        <input
          type="number"
          value={amount1}
          onChange={e => handleAm1Change(e.target.value)}
        />
        <select
          value={currency1}
          onChange={e => handleCur1Change(e.target.value)}
        >
          {Object.keys(rates).map((rate, index) => (
            <option key={index} value={rate}>
              {rate}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={amount2}
          onChange={e => handleAm2Change(e.target.value)}
        />
        <select
          value={currency2}
          onChange={e => handleCur2Change(e.target.value)}
        >
          {Object.keys(rates).map((rate, index) => (
            <option key={index} value={rate}>
              {rate}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
