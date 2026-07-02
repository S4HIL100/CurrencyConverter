const currency1 = document.getElementById('currency-one');
const currency2 = document.getElementById('currency-two');
const amount1 = document.getElementById('amount-one');
const amount2 = document.getElementById('amount-two');
const rate = document.getElementById('rate');

function calculate() {
  const currency_one = currency1.value;
  const currency_two = currency2.value;

  fetch(`https://v6.exchangerate-api.com/v6/bd0b1b915bfd5d35a8f1bb41/latest/${currency_one}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      const rates = data.conversion_rates || data.rates || {};
      const exchangeRate = rates[currency_two];

      if (!exchangeRate) {
        rate.innerText = 'Rate unavailable';
        amount2.textContent = '---';
        return;
      }

      rate.innerText = `1 ${currency_one} = ${exchangeRate} ${currency_two}`;
      amount2.textContent = (amount1.value * exchangeRate).toFixed(2);
    });
}