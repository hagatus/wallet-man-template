(function() {
    console.log('wallet.js ready');
    if (typeof Chart === 'undefined') {
        throw new Error('Shards Dashboard requires the Chart.js library in order to function properly.');
    }

    function walletMonthGraph() {
        const context = document.getElementById('wallet-month-evolution-graph').getContext('2d');
        const labels = ['Jan', 'Fev', 'Mar', 'Abr','Mai', 'Jun', 'Jul', 'Ago'];
        // data
        const chartData = {
            datasets: [{
                label: '# em R$',
                data: [29000, 29100, 28000, 29500, 30000, 31000, 30000],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }],
            labels: labels
        };
        // options
        const chartOptions = {
            legend: {
                position: 'bottom',
                label15s: {
                    padding: 25,
                    boxWidth: 20
                }
            },
            cutoutPercentage: 0,
            // Uncomment the following line in order to disable the animations.
            // animation: false,
            tooltips: {
                custom: false,
                mode: 'index',
                position: 'nearest'
            }
        };
        const chart = new Chart(context, {
            type: 'line',
            data: chartData,
            options: chartOptions
        });
    }
    function walletYearGraph() {
        const context = document.getElementById('wallet-annual-evolution-graph').getContext('2d');
        const labels = [2017, 2018, 2019, 2020, 2021, 2022];
        // data
        const chartData = {
            datasets: [{
                label: '# em R$',
                data: [0, 19300, 25300, 28000, 29000, 30000],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }],
            labels: labels
        };
        // options
        const chartOptions = {
            legend: {
                position: 'bottom',
                label15s: {
                    padding: 25,
                    boxWidth: 20
                }
            },
            cutoutPercentage: 0,
            // Uncomment the following line in order to disable the animations.
            // animation: false,
            tooltips: {
                custom: false,
                mode: 'index',
                position: 'nearest'
            }
        };
        const chart = new Chart(context, {
            type: 'line',
            data: chartData,
            options: chartOptions
        });
    }

    walletMonthGraph();
    walletYearGraph();
})();