// Function to toggle the sidebar visibility
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const content = document.querySelector(".content");
    sidebar.classList.toggle("collapsed");
    content.classList.toggle("collapsed");
}

// Function to test the API connection
function testAPIConnection() {
    const lat = 48.799999;
    const lon = 2.26667;
    const apiKey = "f45814ecb68f62b6c0df4ba514e80fd2"; // Replace with your actual API key

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
            alert("Weather API is working well!");
            displayWeatherData(weatherData);
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
            displayAirQualityData(airQualityData);
            displayAirQualityChart(airQualityData); // Add chart for testing purposes
        })
        .catch(error => {
            console.error("Error testing API:", error);
            alert("API request failed. Please check the console for more details.");
        });
}

// Function to display the weather data on the webpage in a dashboard format
function displayWeatherData(data) {
    const content = document.querySelector(".content");
    content.innerHTML = `
        <div class="dashboard-container">
            <div class="dashboard-header">
                <h2>Weather Dashboard</h2>
            </div>
            <div class="dashboard-cards">
                <div class="card">
                    <h3>Temperature</h3>
                    <p>${(data.current.temp - 273.15).toFixed(2)} °C</p>
                </div>
                <div class="card">
                    <h3>Feels Like</h3>
                    <p>${(data.current.feels_like - 273.15).toFixed(2)} °C</p>
                </div>
                <div class="card">
                    <h3>Humidity</h3>
                    <p>${data.current.humidity}%</p>
                </div>
                <div class="card">
                    <h3>Pressure</h3>
                    <p>${data.current.pressure} hPa</p>
                </div>
                <div class="card">
                    <h3>Wind Speed</h3>
                    <p>${data.current.wind_speed} m/s</p>
                </div>
                <div class="card">
                    <h3>Wind Direction</h3>
                    <p>${data.current.wind_deg}°</p>
                </div>
            </div>
        </div>
    `;
}

// Function to display the air quality data on the webpage in a dashboard format
function displayAirQualityData(data) {
    const content = document.querySelector(".content");
    content.innerHTML += `
        <div class="dashboard-container">
            <div class="dashboard-header">
                <h2>Air Quality Dashboard</h2>
            </div>
            <div class="dashboard-cards">
                <div class="card">
                    <h3>PM2.5</h3>
                    <p>${data.list[0].components.pm2_5} µg/m³</p>
                </div>
                <div class="card">
                    <h3>PM10</h3>
                    <p>${data.list[0].components.pm10} µg/m³</p>
                </div>
                <div class="card">
                    <h3>NOx (NO)</h3>
                    <p>${data.list[0].components.no} ppb</p>
                </div>
                <div class="card">
                    <h3>NO2</h3>
                    <p>${data.list[0].components.no2} ppb</p>
                </div>
                <div class="card">
                    <h3>NH3</h3>
                    <p>${data.list[0].components.nh3} ppb</p>
                </div>
                <div class="card">
                    <h3>CO</h3>
                    <p>${data.list[0].components.co} ppm</p>
                </div>
                <div class="card">
                    <h3>SO2</h3>
                    <p>${data.list[0].components.so2} ppb</p>
                </div>
                <div class="card">
                    <h3>O3</h3>
                    <p>${data.list[0].components.o3} ppb</p>
                </div>
            </div>
        </div>
    `;
}

// Function to display air quality data as a chart using Chart.js
function displayAirQualityChart(data) {
    const content = document.querySelector(".content");
    const chartContainer = document.createElement("div");
    chartContainer.classList.add("chart-container");
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
                    data.list[0].components.pm2_5,
                    data.list[0].components.pm10,
                    data.list[0].components.no,
                    data.list[0].components.no2,
                    data.list[0].components.nh3,
                    data.list[0].components.co,
                    data.list[0].components.so2,
                    data.list[0].components.o3
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
    testAPIConnection();
};
