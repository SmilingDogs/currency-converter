import React from 'react';

function CurrencyRow(props) {
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    onChangeAmount,
    amount,
  } = props;

  const options = currencyOptions.map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ));
  return (
    <div>
      <input
        type='number'
        className='input'
        value={amount.toString()}
        onChange={onChangeAmount}
        min='1'
      />
      <div className='select-container'>
        <select
          value={selectedCurrency}
          onChange={onChangeCurrency}
          className='select'
        >
          {options}
        </select>
        <span className='material-symbols-sharp'>expand_more</span>
      </div>
    </div>
  );
}

export default CurrencyRow;
