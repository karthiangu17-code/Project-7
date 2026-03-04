let chart;

async function getStock() {

    const symbol = document.getElementById("stockInput").value;
    const apiKey = "12AHGTA45BNWLW0U";

    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const timeSeries = data["Time Series (Daily)"];

    const dates = Object.keys(timeSeries).slice(0, 60).reverse();
    const prices = dates.map(date => parseFloat(timeSeries[date]["4. close"]));

    // Calculate 20 Day Moving Average
    let ma20 = [];

    for (let i = 0; i < prices.length; i++) {
        if (i < 19) {
            ma20.push(null);
        } else {
            let sum = 0;
            for (let j = i - 19; j <= i; j++) {
                sum += prices[j];
            }
            ma20.push(sum / 20);
        }
    }

    const ctx = document.getElementById('stockChart').getContext('2d');

    if(chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [
                {
                    label: symbol + " Price",
                    data: prices,
                    borderWidth: 2
                },
                {
                    label: "20 Day MA",
                    data: ma20,
                    borderWidth: 2
                }
            ]
        }
    });
}
