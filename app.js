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
    const apiKey = "lol"; // Replace with your actual API key // Replace with your actual API key

    const airQualityAPIURL = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    fetch(airQualityAPIURL)
        .then(response => {
            if (!response.ok) {
                throw new Error("Air Quality API request failed with status " + response.status);
            }
            return response.json();
        })
        .then(airQualityData => {
            console.log("Air Quality API is working well. Response:", airQualityData);
            displayAirQualityChart(airQualityData); // Add chart for testing purposes
        })
        .catch(error => {
            console.error("Error testing API:", error);
            alert("API request failed. Please check the console for more details.");
        });
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
