document.addEventListener("DOMContentLoaded", function () {
    getWeather();
    document.getElementById("citySelect").addEventListener("change", getWeather);
});
/*
Chicago Temperature Forecast Visualization
Author: Tyrone King
Date: 03/15/2026

Fetches weather forecast data from the National Weather Service API
and visualizes hourly temperature trends using Chart.js
*/
// ----------------------------
// Get selected city coordinates
// ----------------------------
function getSelectedCoordinates() {
    const value = document.getElementById("citySelect").value;
    const [lat, lon] = value.split(",");
    return { lat, lon };
}

// ----------------------------
// Main Weather Function
// ----------------------------
async function getWeather() {
    try {
        const { lat, lon } = getSelectedCoordinates();

        const pointResponse = await fetch(
            `https://api.weather.gov/points/${lat},${lon}`
        );
        if (!pointResponse.ok) throw new Error("Point fetch failed");

        const pointData = await pointResponse.json();
        const forecastUrl = pointData.properties.forecastHourly;

        const forecastResponse = await fetch(forecastUrl);
        if (!forecastResponse.ok) throw new Error("Forecast fetch failed");

        const forecastData = await forecastResponse.json();

        const times = [];
        const temperatures = [];
        const colors = [];

        for (let i = 0; i < forecastData.properties.periods.length; i++) {
            const period = forecastData.properties.periods[i];
            const formattedTime = formatTime(period.startTime);

            times.push(formattedTime);
            temperatures.push(period.temperature);
            colors.push(getColorForTemperature(period.temperature));
        }

        createBarChart(times, temperatures, colors);

    } catch (error) {
        console.error("🫤 Error fetching weather data:", error);
    }
}

// ----------------------------
// Helper Functions
// ----------------------------
function formatTime(isoTime) {
    const date = new Date(isoTime);
    return date.toLocaleString('en-US', {
        weekday: 'short',
        hour: 'numeric',
        hour12: true
    });
}

function getColorForTemperature(temp) {
    if (temp <= 50) return "rgba(54, 162, 235, 0.7)";
    if (temp <= 75) return "rgba(75, 192, 192, 0.7)";
    return "rgba(255, 99, 132, 0.7)";
}

// ----------------------------
// Chart.js Bar Chart
// ----------------------------
let weatherChart;

function createBarChart(times, temperatures, colors) {
    const ctx = document.getElementById("weatherChart");

    if (weatherChart) {
        weatherChart.destroy();
    }

    weatherChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: times,
            datasets: [{
                label: "Temperature (F)",
                data: temperatures,
                backgroundColor: colors
            }]
        }
    });
}