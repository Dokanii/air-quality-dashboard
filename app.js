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

// Function to display the weather data on the webpage
function displayWeatherData(data) {
    const content = document.querySelector(".content");
    content.innerHTML = `
        <h2>Current Weather Data</h2>
        <p><strong>Temperature:</strong> ${(data.current.temp - 273.15).toFixed(2)} °C</p>
        <p><strong>Feels Like:</strong> ${(data.current.feels_like - 273.15).toFixed(2)} °C</p>
        <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
        <p><strong>Pressure:</strong> ${data.current.pressure} hPa</p>
        <p><strong>Visibility:</strong> ${data.current.visibility} meters</p>
        <p><strong>Wind Speed:</strong> ${data.current.wind_speed} m/s</p>
        <p><strong>Wind Direction:</strong> ${data.current.wind_deg}°</p>
        <p><strong>Cloudiness:</strong> ${data.current.clouds}%</p>
        <p><strong>Dew Point:</strong> ${(data.current.dew_point - 273.15).toFixed(2)} °C</p>
        <p><strong>UV Index:</strong> ${data.current.uvi}</p>
        <p><strong>Weather:</strong> ${data.current.weather[0].main} - ${data.current.weather[0].description}</p>
        <img src="https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png" alt="Weather icon">
        <p><strong>Sunrise:</strong> ${new Date(data.current.sunrise * 1000).toLocaleTimeString()}</p>
        <p><strong>Sunset:</strong> ${new Date(data.current.sunset * 1000).toLocaleTimeString()}</p>
    `;
}

// Function to display the air quality data on the webpage
function displayAirQualityData(data) {
    const content = document.querySelector(".content");
    content.innerHTML += `
        <h2>Current Air Quality Data</h2>
        <p><strong>PM2.5:</strong> ${data.list[0].components.pm2_5} µg/m³</p>
        <p><strong>PM10:</strong> ${data.list[0].components.pm10} µg/m³</p>
        <p><strong>NOx (NO):</strong> ${data.list[0].components.no} ppb</p>
        <p><strong>NO2:</strong> ${data.list[0].components.no2} ppb</p>
        <p><strong>NH3:</strong> ${data.list[0].components.nh3} ppb</p>
        <p><strong>CO:</strong> ${data.list[0].components.co} ppm</p>
        <p><strong>SO2:</strong> ${data.list[0].components.so2} ppb</p>
        <p><strong>O3:</strong> ${data.list[0].components.o3} ppb</p>
    `;
}

// Call the testAPIConnection function when the page loads
window.onload = function() {
    testAPIConnection();
};
