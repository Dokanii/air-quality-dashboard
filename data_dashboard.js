// Function to toggle the sidebar visibility
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const content = document.getElementById("content");
    sidebar.classList.toggle("collapsed");
    content.classList.toggle("collapsed");
}

function fetchCityData() {
    const city = document.getElementById('cityInput').value;
    const apiKey = "1a803a28ae8c38748428aa28db6feee6"; // Replace with your actual API key

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

            // Call the API with new coordinates
            testAPIConnection(lat, lon);
        })
        .catch(error => {
            console.error("Error fetching city data:", error);
            alert("Failed to get data for the city. Please check the console for more details.");
        });
}

// Function to display the data page content
function showData(lat = 35.1796, lon = 129.0756) {
    const content = document.getElementById("content");
    content.innerHTML = `
        <div class="dashboard-container">
            <div class="dashboard-header">
                <h2>Weather Dashboard</h2>
            </div>
            <div class="dashboard-cards">
                <div class="card">
                    <h3>Temperature</h3>
                    <p id="temperature"></p>
                </div>
                <div class="card">
                    <h3>Feels Like</h3>
                    <p id="feels_like"></p>
                </div>
                <div class="card">
                    <h3>Humidity</h3>
                    <p id="humidity"></p>
                </div>
                <div class="card">
                    <h3>Pressure</h3>
                    <p id="pressure"></p>
                </div>
                <div class="card">
                    <h3>Wind Speed</h3>
                    <p id="wind_speed"></p>
                </div>
                <div class="card">
                    <h3>Wind Direction</h3>
                    <p id="wind_deg"></p>
                </div>
            </div>
        </div>
        <div class="dashboard-container">
            <div class="dashboard-header">
                <h2>Air Quality Dashboard</h2>
            </div>
            <div class="dashboard-cards">
                <div class="card">
                    <h3>PM2.5</h3>
                    <p id="pm25"></p>
                </div>
                <div class="card">
                    <h3>PM10</h3>
                    <p id="pm10"></p>
                </div>
                <div class="card">
                    <h3>NOx (NO)</h3>
                    <p id="nox"></p>
                </div>
                <div class="card">
                    <h3>NO2</h3>
                    <p id="no2"></p>
                </div>
                <div class="card">
                    <h3>NH3</h3>
                    <p id="nh3"></p>
                </div>
                <div class="card">
                    <h3>CO</h3>
                    <p id="co"></p>
                </div>
                <div class="card">
                    <h3>SO2</h3>
                    <p id="so2"></p>
                </div>
                <div class="card">
                    <h3>O3</h3>
                    <p id="o3"></p>
                </div>
            </div>
        </div>
    `;
    testAPIConnection(lat, lon);
}

// Function to test the API connection and display data
function testAPIConnection(lat, lon) {
    const apiKey = "1a803a28ae8c38748428aa28db6feee6"; // Replace with your actual API key

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
            document.getElementById("temperature").innerText = (weatherData.current.temp - 273.15).toFixed(2) + " °C";
            document.getElementById("feels_like").innerText = (weatherData.current.feels_like - 273.15).toFixed(2) + " °C";
            document.getElementById("humidity").innerText = weatherData.current.humidity + "%";
            document.getElementById("pressure").innerText = weatherData.current.pressure + " hPa";
            document.getElementById("wind_speed").innerText = weatherData.current.wind_speed + " m/s";
            document.getElementById("wind_deg").innerText = weatherData.current.wind_deg + "°";
            return fetch(airQualityAPIURL);
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Air Quality API request failed with status " + response.status);
            }
            return response.json();
        })
        .then(airQualityData => {
            document.getElementById("pm25").innerText = airQualityData.list[0].components.pm2_5 + " µg/m³";
            document.getElementById("pm10").innerText = airQualityData.list[0].components.pm10 + " µg/m³";
            document.getElementById("nox").innerText = airQualityData.list[0].components.no + " ppb";
            document.getElementById("no2").innerText = airQualityData.list[0].components.no2 + " ppb";
            document.getElementById("nh3").innerText = airQualityData.list[0].components.nh3 + " ppb";
            document.getElementById("co").innerText = airQualityData.list[0].components.co + " ppm";
            document.getElementById("so2").innerText = airQualityData.list[0].components.so2 + " ppb";
            document.getElementById("o3").innerText = airQualityData.list[0].components.o3 + " ppb";
        })
        .catch(error => {
            console.error("Error testing API:", error);
            alert("API request failed. Please check the console for more details.");
        });
}

// Show data page content by default if navigated to
window.onload = function() {
    showData();
};
