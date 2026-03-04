let chart;

function getStock() {

    const ctx = document.getElementById('stockChart').getContext('2d');

    const prices = [150, 155, 148, 160, 170, 165, 180];

    if(chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Day1','Day2','Day3','Day4','Day5','Day6','Day7'],
            datasets: [{
                label: 'Stock Price',
                data: prices,
                borderWidth: 2
            }]
        }
    });
}