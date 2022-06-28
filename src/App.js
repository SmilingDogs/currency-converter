import React, { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow';
import axios from 'axios';
import { calculateAmounts } from './util';

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('UAH');
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  const { fromAmount, toAmount } = calculateAmounts(
    amountInFromCurrency,
    amount,
    exchangeRate
  );

  const options = {
    method: 'GET',
    url: `https://exchangerate-api.p.rapidapi.com/rapid/latest/${fromCurrency}`,
    headers: {
      'X-RapidAPI-Key': 'YOUR_API_KEY',
      'X-RapidAPI-Host': 'exchangerate-api.p.rapidapi.com',
    },
  };

  useEffect(() => {
    axios
      .request(options)
      .then((res) => {
        console.log(res.data);
        let data = res.data;
        setCurrencyOptions([...Object.keys(data.rates)]);
        setFromCurrency(fromCurrency);
        setToCurrency(toCurrency);
        setExchangeRate(data.rates[toCurrency]);
      })

      .catch(function (err) {
        console.error(err);
      });
  }, [toCurrency, fromCurrency]);

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  return (
    <>
      <h1>My Currency Converter</h1>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={(e) => setFromCurrency(e.target.value)}
        onChangeAmount={handleFromAmountChange}
        amount={fromAmount}
      />
      <div className='equals'>in</div>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={(e) => setToCurrency(e.target.value)}
        onChangeAmount={handleToAmountChange}
        amount={toAmount}
      />
    </>
  );
}

export default App;
