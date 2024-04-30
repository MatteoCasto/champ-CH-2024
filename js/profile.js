// Get the canvas element
var ctx = document.getElementById('profile').getContext('2d');
// Initialize the chart
var myChart = new Chart(ctx, {
    type: 'line', // Set chart type to line
    data: {
        labels: ['0.0', '1.1', '2.2', '3.3', '4.4', '5.5', '6.6', '4.4', '5.5', '6.6'], // Custom x-axis labels
        datasets: [{
            data: [12, 190, 300, 545, 256, 334, 10, 12, 45, 130, 40, 45], // Provide your data here
            borderColor: 'red', // Set line color to red
            borderWidth: 2, // Set line width
            fill: true // Don't fill area under the line
        }]
    },
    options: {
        maintainAspectRatio: false, // Stretch the chart to fill the container
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            }
        },
        tooltips: {
            enabled: true,
        },
        onHover: function(event, chartElement) {
            if (chartElement.length > 0) {
                console.log('Hovered Element:', chartElement[0]);
            }
        }
    }
});