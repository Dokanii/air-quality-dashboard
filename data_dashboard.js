// Function to toggle the sidebar visibility
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const content = document.getElementById("content");
    sidebar.classList.toggle("collapsed");
    content.classList.toggle("collapsed");
}

// Function to fetch city data
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
            updateDataContainer("temperature", (weatherData.current.temp - 273.15).toFixed(2) + " °C", weatherData.current.temp - 273.15);
            updateDataContainer("feels_like", (weatherData.current.feels_like - 273.15).toFixed(2) + " °C", weatherData.current.feels_like - 273.15);
            updateDataContainer("humidity", weatherData.current.humidity + "%", weatherData.current.humidity);
            updateDataContainer("pressure", weatherData.current.pressure + " hPa", weatherData.current.pressure);
            updateDataContainer("wind_speed", weatherData.current.wind_speed + " m/s", weatherData.current.wind_speed);
            updateDataContainer("wind_deg", weatherData.current.wind_deg + "°", weatherData.current.wind_deg);
            return fetch(airQualityAPIURL);
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Air Quality API request failed with status " + response.status);
            }
            return response.json();
        })
        .then(airQualityData => {
            updateDataContainer("pm25", airQualityData.list[0].components.pm2_5 + " µg/m³", airQualityData.list[0].components.pm2_5);
            updateDataContainer("pm10", airQualityData.list[0].components.pm10 + " µg/m³", airQualityData.list[0].components.pm10);
            updateDataContainer("nox", airQualityData.list[0].components.no + " ppb", airQualityData.list[0].components.no);
            updateDataContainer("no2", airQualityData.list[0].components.no2 + " ppb", airQualityData.list[0].components.no2);
            updateDataContainer("nh3", airQualityData.list[0].components.nh3 + " ppb", airQualityData.list[0].components.nh3);
            updateDataContainer("co", airQualityData.list[0].components.co + " ppm", airQualityData.list[0].components.co);
            updateDataContainer("so2", airQualityData.list[0].components.so2 + " ppb", airQualityData.list[0].components.so2);
            updateDataContainer("o3", airQualityData.list[0].components.o3 + " ppb", airQualityData.list[0].components.o3);
        })
        .catch(error => {
            console.error("Error testing API:", error);
            alert("API request failed. Please check the console for more details.");
        });
}

// Function to update data containers and set the background color based on value
function updateDataContainer(elementId, value, numericValue) {
    const element = document.getElementById(elementId);
    element.innerText = value;

    // Set background color based on thresholds
    let color = "green"; // Default to "good"
    
    if (elementId === "pm25" || elementId === "pm10" || elementId === "nox" || elementId === "no2" || elementId === "nh3" || elementId === "co" || elementId === "so2" || elementId === "o3") {
        // Air Quality thresholds (adjust as needed)
        if (numericValue > 150) {
            color = "red"; // Bad
        } else if (numericValue > 75) {
            color = "yellow"; // Moderate
        } else {
            color = "green"; // Good
        }
    } else if (elementId === "temperature" || elementId === "feels_like") {
        // Temperature thresholds (adjust as needed)
        if (numericValue > 30) {
            color = "red"; // Hot
        } else if (numericValue < 0) {
            color = "blue"; // Cold
        } else {
            color = "yellow"; // Moderate
        }
    } else if (elementId === "humidity") {
        // Humidity thresholds
        if (numericValue > 70) {
            color = "red"; // Too humid
        } else if (numericValue < 30) {
            color = "blue"; // Too dry
        } else {
            color = "green"; // Comfortable
        }
    }

    element.parentElement.style.backgroundColor = color;
}

// Show data page content by default if navigated to
window.onload = function() {
    const busanLat = 35.1796;
    const busanLon = 129.0756;

    // Initialize with Busan coordinates
    fetchCityData(null, busanLat, busanLon);
};
