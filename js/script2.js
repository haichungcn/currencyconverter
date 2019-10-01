
let exchangeRate = 0;

const exchangeRates = {
    usd: {
        eur: 0.91,
        aud: 1.48,
        krw: 1203.0,
        vnd: 23200.7
    },
    eur: {
        usd: 1.09,
        aud: 1.62,
        krw: 1316.21,
        vnd: 25383.96
    },
    aud: {
        usd: 0.68,
        eur: 0.62,
        krw: 813.58,
        vnd: 15690.63
    },
    krw: {
        usd: 0.00083,
        aud: 0.0012,
        eur: 0.00076,
        vnd: 19.29
    },
    vnd: {
        krw: 0.052,
        usd: 0.000043,
        aud: 0.000064,
        eur: 0.000039
    }
};


function convertCurrency(from, to, amnt) {
    exchangeRate = exchangeRates[from][to];
    const result = amount * exchangeRate;
    return result;
}

function formatCurrency(type, value) {
    const formatter = new Intl.NumberFormat(type, {
        currency: type,
        style : "currency"
    });
    return formatter.format(value);
}

function checkCurrency(value) {
    if (value in exchangeRates) {
        return true;
    } else { return false; }
}

let currencyFrom = prompt("Please enter the currency to be converted:");
while (!checkCurrency(currenyFrom)) {
    currencyFrom = prompt("The currency you entered is NOT in our database, plz enter usd, eur, aud, krw or vnd:");
}

let currencyTo = prompt("Please enter the currency that you want to convert to:");
while (!checkCurrency(currenyTo)) {
    currencyTo = prompt("The currency you entered is not in our database, plz enter usd, eur, aud, krw or vnd");
}

let amount = prompt("Please enter the amount of money to be exchanged:");
while (isNaN(amount)) {
    amount = prompt("Not a number, please enter a number only:")
}

const result = convertCurrency(currencyFrom, currencyTo, amount);

console.log("The amount of ", amount, currencyFrom, " in ", currencyTo, " is ", formatCurrency(currencyTo, result));

document.getElementById('conversion').innerHTML = formatCurrency(currencyTo, result);

