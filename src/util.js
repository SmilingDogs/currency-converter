function calculateAmounts(amountInFromCurrency, amount, exchangeRate) {
  let toAmount, fromAmount;

  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = (amount * exchangeRate).toFixed(2);
  } else {
    toAmount = amount;
    fromAmount = (amount / exchangeRate).toFixed(2);
  }

  return { fromAmount, toAmount };
}

export { calculateAmounts };
