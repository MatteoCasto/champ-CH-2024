/**
 * Initializes and configures a Chart.js line chart with annotations and hover functionality.
 * 
 * This code sets up a Chart.js line chart on a canvas element, configures it with various
 * options including annotation and hover effects, and loads data from a CSV file to plot
 * the profile data. When the user hovers over the chart, a marker on the map is updated to
 * reflect the corresponding coordinates.
 */

// Get the canvas element
var ctx = document.getElementById('profile').getContext('2d');

// Initialize the chart with the annotation plugin
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [{
            data: [],
            borderColor: 'red',
            borderWidth: 3,
            fill: true,
            pointRadius: 0
        }]
    },
    options: {
        maintainAspectRatio: false,
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                min: 0.0,
                max: 4.57, // Maximum value for x-axis
                title: {
                    display: false,
                    text: 'km'
                }
            },
            y: {
                beginAtZero: true,
                min: 610.0, // Minimum value for y-axis
                max: 660.0,
            }
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            },
            // axes config
            annotation: {
                annotations: {
                    line1: {
                        type: 'line',
                        scaleID: 'x',
                        borderColor: 'black',
                        borderWidth: 1,
                        borderDash: [6, 6],
                        value: 0, // default position
                        draggable: true,
                        label: {
                            enabled: false
                        }
                    }
                }
            }
        },

        // Event managment for user's mouse hovering on profile 
        onHover: function(event) {
            const canvasPosition = Chart.helpers.getRelativePosition(event, myChart);
            let mouseX = myChart.scales.x.getValueForPixel(canvasPosition.x);

            // Find nearest x value in the dataset
            const closestData = findClosestLatLng(mouseX);

            // show a marker on the map at these coordinates
            updateClampedMarker(closestData['lon'], closestData['lat']);

            // Move the annotation line to hover position
            myChart.options.plugins.annotation.annotations.line1.value = mouseX;
            myChart.update('none');
        }
    }
});

/**
 * Finds the closest latitude and longitude for a cumulative distance x in the CSV profile file.
 * 
 * @param {number} x - The cumulative distance for which to find the closest coordinates.
 * @returns {object} The record with the smallest distance containing latitude and longitude.
 */
function findClosestLatLng(x) {
    const distances = dataPoints.map(point => ({
        lat: point.lat,
        lon: point.lon,
        distance: Math.abs(point.x - x)
    }));
    distances.sort((a, b) => a.distance - b.distance);
    return distances[0]; // Returning the record with the smallest distance
}

/**
 * Loads and parses a CSV file to extract profile data and updates the chart.
 * 
 * @param {object} chart - The Chart.js chart object to update with the loaded data.
 * @param {string} filePath - The path to the CSV file to be loaded and parsed.
 */
async function loadAndParseCSV(chart, filePath) {
    const response = await fetch(filePath);
    const data = await response.text();
    const lines = data.split('\n');

    // Reset data points (global variable)
    dataPoints = [];

    lines.slice(1).forEach(line => {
        const columns = line.split(';');
        if (columns.length > 3) {
            const x = parseFloat(columns[0]); // dist_cumul [km]
            const lat = parseFloat(columns[1]); // lat [g]
            const lon = parseFloat(columns[2]); // lon [g]
            const y = parseFloat(columns[3]); // height (NF02) [m]
            if (!isNaN(x) && !isNaN(lat) && !isNaN(lon) && !isNaN(y)) {
                chart.data.datasets[0].data.push({x: x, y: y});
                dataPoints.push({x: x, lat: lat, lon: lon});
            }
        }
    });
    chart.update();
}

// Initialize profile data
loadAndParseCSV(myChart, CSV_FILE);
