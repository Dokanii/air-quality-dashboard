require('dotenv').config();

const apiKey = process.env.OPENWEATHER_API_KEY;

// Function to toggle the sidebar visibility
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const content = document.querySelector(".content");
    sidebar.classList.toggle("collapsed");
    content.classList.toggle("collapsed");
}

function fetchCityData() {
    const city = document.getElementById('cityInput').value;

    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    const geocodeAPIURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

    fetch(geocodeAPIURL)
        .then(response => {
            if (!response.ok) {
                throw new Error("Geocoding API request failed with status " + response.status);
            }
            return response.json();
        })
        .then(geocodeData => {
            if (geocodeData.length === 0) {
                throw new Error("City not found. Please check the city name and try again.");
            }
            const lat = geocodeData[0].lat;
            const lon = geocodeData[0].lon;

            // Clear content before updating charts to avoid duplication
            const content = document.querySelector(".content");
            content.innerHTML = "";

            // Now call the weather API with the new coordinates
            testAPIConnection(lat, lon);
        })
        .catch(error => {
            console.error("Error fetching city data:", error);
        });
}

function testAPIConnection(lat, lon) {

    const weatherAPIURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const airQualityAPIURL = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    fetch(weatherAPIURL)
        .then(response => {
            if (!response.ok) {
                throw new Error("Weather API request failed with status " + response.status);
            }
            return response.json();
        })
        .then(weatherData => {
            console.log("Weather API is working well. Response:", weatherData);
            displayTemperatureChart(weatherData);
            displayHumidityChart(weatherData);
            return fetch(airQualityAPIURL);
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Air Quality API request failed with status " + response.status);
            }
            return response.json();
        })
        .then(airQualityData => {
            console.log("Air Quality API is working well. Response:", airQualityData);
            if (airQualityData && airQualityData.list && airQualityData.list.length > 0) {
                displayAirQualityChart(airQualityData);
                displayPollutantProportionDoughnutChart(airQualityData);
            } else {
                console.error("Air Quality data is empty or invalid.");
            }
        })
        .catch(error => {
            console.error("Error testing API:", error);
        });
}

// Function to display air quality data as a chart using Chart.js
function displayAirQualityChart(data) {
    const content = document.querySelector(".content");
    const chartContainer = document.createElement("div");
    chartContainer.classList.add("chart-container", "chart-small");
    chartContainer.innerHTML = `<canvas id="airQualityChart"></canvas>`;
    content.appendChild(chartContainer);

    const ctx = document.getElementById('airQualityChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['PM2.5', 'PM10', 'NOx (NO)', 'NO2', 'NH3', 'CO', 'SO2', 'O3'],
            datasets: [{
                label: 'Air Quality Levels',
                data: [
                    data.list[0].components.pm2_5 || 0,
                    data.list[0].components.pm10 || 0,
                    data.list[0].components.no || 0,
                    data.list[0].components.no2 || 0,
                    data.list[0].components.nh3 || 0,
                    data.list[0].components.co || 0,
                    data.list[0].components.so2 || 0,
                    data.list[0].components.o3 || 0
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(201, 203, 207, 0.2)',
                    'rgba(100, 149, 237, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(201, 203, 207, 1)',
                    'rgba(100, 149, 237, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Function to display doughnut chart for pollutant proportions
function displayPollutantProportionDoughnutChart(data) {
    const content = document.querySelector(".content");
    const chartContainer = document.createElement("div");
    chartContainer.classList.add("chart-container", "chart-small");
    chartContainer.innerHTML = `<canvas id="pollutantDoughnutChart"></canvas>`;
    content.appendChild(chartContainer);

    const ctx = document.getElementById('pollutantDoughnutChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['PM2.5', 'PM10', 'NOx (NO)', 'NO2', 'NH3', 'CO', 'SO2', 'O3'],
            datasets: [{
                label: 'Pollutant Proportions',
                data: [
                    data.list[0].components.pm2_5 || 0,
                    data.list[0].components.pm10 || 0,
                    data.list[0].components.no || 0,
                    data.list[0].components.no2 || 0,
                    data.list[0].components.nh3 || 0,
                    data.list[0].components.co || 0,
                    data.list[0].components.so2 || 0,
                    data.list[0].components.o3 || 0
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(201, 203, 207, 0.6)',
                    'rgba(100, 149, 237, 0.6)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(201, 203, 207, 1)',
                    'rgba(100, 149, 237, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

// Function to display temperature trends as a line chart
function displayTemperatureChart(data) {
    const content = document.querySelector(".content");
    const chartContainer = document.createElement("div");
    chartContainer.classList.add("chart-container", "chart-small", "temperature-chart");
    chartContainer.innerHTML = `<canvas id="temperatureChart"></canvas>`;
    content.appendChild(chartContainer);

    const ctx = document.getElementById('temperatureChart').getContext('2d');
    const labels = data.hourly.slice(0, 24).map(hour => {
        const date = new Date(hour.dt * 1000);
        const timeLabel = `${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        console.log("Temperature label:", timeLabel, "Temperature value:", (hour.temp - 273.15).toFixed(2));
        return timeLabel;
    });
    const temperatureData = data.hourly.slice(0, 24).map(hour => (hour.temp - 273.15).toFixed(2));

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Temperature (°C)',
                    data: temperatureData,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    fill: false,
                    tension: 0.1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Function to display humidity trends as a line chart
function displayHumidityChart(data) {
    const content = document.querySelector(".content");
    const chartContainer = document.createElement("div");
    chartContainer.classList.add("chart-container", "chart-small", "humidity-chart");
    chartContainer.innerHTML = `<canvas id="humidityChart"></canvas>`;
    content.appendChild(chartContainer);

    const ctx = document.getElementById('humidityChart').getContext('2d');
    const labels = data.hourly.slice(0, 24).map(hour => {
        const date = new Date(hour.dt * 1000);
        const timeLabel = `${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        console.log("Humidity label:", timeLabel, "Humidity value:", hour.humidity);
        return timeLabel;
    });
    const humidityData = data.hourly.slice(0, 24).map(hour => hour.humidity);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Humidity (%)',
                    data: humidityData,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    fill: false,
                    tension: 0.1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Call the testAPIConnection function when the page loads
window.onload = function() {
    const busanLat = 35.1796;
    const busanLon = 129.0756;

    // Initialize with Busan coordinates
    fetchCityData(null, busanLat, busanLon);
};

