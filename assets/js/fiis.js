(function() {
    console.log('fiis.js ready');
    if (typeof Chart === 'undefined') {
        throw new Error('Shards Dashboard requires the Chart.js library in order to function properly.');
    }

    function fiiCompositionGraph() {
        const context = document.getElementById('fii-composition-graph').getContext('2d');
        // data
        const chartData = {
            datasets: [{
                label: '# em R$',
                hoverBorderColor: '#ffffff',
                data: [999.00, 200.00, 30.00],
                backgroundColor: [
                    'rgba(0,123,255,0.9)',
                    'rgba(0,123,255,0.5)',
                    'rgba(0,123,255,0.3)'
                ]
            }],
            labels: ["BBPO11", "DEVA11", "MXRF11"]
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
            type: 'pie',
            data: chartData,
            options: chartOptions
        })
    }
    function fiiEvolutionGraph() {
        const context = document.getElementById('fii-evolution-graph').getContext('2d');
        const labels = ['Jan', 'Fev', 'Mar', 'Abr','Mai', 'Jun', 'Jul', 'Ago'];
        // data
        const chartData = {
            datasets: [{
                label: '# em R$',
                data: [1000, 2000, 2010, 2500, 2800, 2890, 3000],
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
        })
    }

    fiiEvolutionGraph();
    fiiCompositionGraph();
})();