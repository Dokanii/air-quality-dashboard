// Function to toggle the sidebar visibility
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const content = document.querySelector(".content");
    sidebar.classList.toggle("collapsed");
    content.classList.toggle("collapsed");
}

// Function to test the API connection
function testAPIConnection() {
    const lat = 0;
    const lon = 0;
    const apiKey = "lol"; // Replace with your actual API key

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

// Call the testAPIConnection function when the page loads
window.onload = function() {
    testAPIConnection();
};
