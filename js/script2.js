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


function convertCurrency(from, to, amount) {
    let exchangeRate = exchangeRates[from][to];
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

async function getRate(from, to){
    const currency = from + '_' + to;
    const url = 'https://free.currencyconverterapi.com/api/v6/convert?q=' + currency + '&compact=y&apiKey=74a2ac3bc6e0d5949617';
    const apiresult = await fetch(url);
    const json = await apiresult.json();
    const rate = json[currency.toUpperCase()].val;
    return rate;
}

async function runProgram(){
    const from = document.getElementById("fromList").value.toLowerCase();
    console.log("User choose from: ", from);

    const to = document.getElementById("toList").value.toLowerCase();
    console.log("User choose to: ", to);

    let amountEntered = document.getElementById("amountInput").value;
    console.log("User entered: ", amountEntered);

    const rate = await getRate(from, to);

    const result = formatCurrency(to, (amountEntered * rate));
    console.log("This is the result: ", result);

    const resultArea = document.getElementById("result");
    resultArea.innerHTML = `>>>  ${amountEntered} ${from} in ${to} is ${result}`
}