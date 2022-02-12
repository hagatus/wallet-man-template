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

    class WalletGraphsManager {

        constructor(selectors) {
            this.selectors = selectors || []
            this.canvasList = []
        }

        render() {
            for (const i in this.selectors) {
                let selector = this.selectors[i]
                // console.log(selector)
                let items = document.querySelectorAll(selector)
                // console.log(items)
                items.forEach((node) => {
                    this.canvasList.push(node)
                })
            }

            this.canvasList.forEach((canvaNode) => {
                // console.log(canvaNode);

                const chartData = {
                    datasets: [{
                        data: [0, 1 ,2, 3 , 4 ],
                        label: 'Hoje',
                        fill: 'start',
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }],
                    labels: [2017, 2018, 2019, 2020, 2021]
                }
                const chartOptions = this.getChartOptions()

                const context = canvaNode.getContext('2d');
                const chart = new Chart(context, {
                    type: 'line',
                    data: chartData,
                    options: chartOptions
                });
            })

        }

        getChartOptions() {
            return {
                maintainAspectRatio: true,
                responsive: true,
                plugins: {
                    chartAreaBorder: {
                        borderColor: 'red',
                        borderWidth: 2,
                        borderDash: [5, 5],
                        borderDashOffset: 2,
                    },
                    title: {
                        display: false,
                    },
                    legend: {
                        display: false
                    },
                    tooltip: {
                        display: false,
                        enabled: false,
                        custom: false
                    }
                },
                scales: {
                    x: {
                        display: false,
                        ticks: {
                            display: false
                        }
                    },
                    y: {
                        display: false,
                        ticks: {
                            display: false,
                            // Avoid getting the graph line cut of at the top of the canvas.
                            // Chart.js bug link: https://github.com/chartjs/Chart.js/issues/4790
                            suggestedMax: 'max'
                        }
                    },
                }
            };
        }
    }

    const selectors = [
            '.wallet-overview'
    ]
    const manager = new WalletGraphsManager(selectors)
    manager.render()
    window.manager = manager
})();