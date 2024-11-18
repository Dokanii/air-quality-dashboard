# Air Quality Monitoring Dashboard

## Overview
The Air Quality Monitoring Dashboard is a web-based application that provides real-time weather and air quality data using the OpenWeather API. The application displays information in the form of charts and dashboards to help visualize temperature, humidity, and air pollution levels.

## Features
- Display current weather conditions, including temperature and humidity trends over the past 24 hours.
- Display air quality data such as PM2.5, PM10, NOx, NO2, NH3, CO, SO2, and O3 levels.
- Sidebar navigation for navigating between different sections of the application.
- Responsive charts built using Chart.js for easy visualization of data.

## Technologies and Libraries Used
- HTML, CSS, and JavaScript for front-end development.
- [Chart.js](https://www.chartjs.org/) for visualizing data in the form of charts.
- [OpenWeather API](https://openweathermap.org/api) to retrieve weather and air quality data.

## Prerequisites
- Node.js and npm (to serve the application locally).
- An API key from OpenWeather API. You will need to replace the placeholder API key with your own to make the application work.

## How to Run the Application

1. **Clone the Repository**
   
   Clone the repository to your local machine using:
   ```bash
   git clone <repository_url>
   ```

2. **Install Dependencies**
   
   Navigate to the project directory and install any dependencies if required:
   ```bash
   cd air-quality-dashboard
   npm install
   ```

3. **Configure API Key**
   
   Obtain an API key from [OpenWeather API](https://openweathermap.org/api) and replace the placeholder in the `app.js` and `data_dashboard.js` files:
   ```javascript
   const apiKey = "YOUR_API_KEY_HERE";
   ```

4. **Serve the Application**
   
   To run the application locally, you can use a simple HTTP server. You can install and use the `http-server` package:
   ```bash
   npm install -g http-server
   http-server
   ```

   The application will be available at `http://localhost:8080` or the port indicated in the terminal.

5. **Open in Browser**
   
   Open your web browser and navigate to `http://localhost:8080` to use the dashboard.

## Simulation Process
The application retrieves weather and air quality data through API calls to the OpenWeather API. The data includes temperature, humidity, and pollutant levels. This data is displayed using Chart.js in three main types of charts:

- **Temperature Chart**: Displays temperature trends over the last 24 hours.
- **Humidity Chart**: Displays humidity trends over the last 24 hours.
- **Air Quality Chart**: Displays the current levels of air pollutants (e.g., PM2.5, NO2, etc.).

The data is refreshed each time the page is loaded, and the charts are dynamically generated to show the most recent information available.

## File Structure
- **index.html**: The main HTML file for the application.
- **styles.css**: Contains the styles for the layout, sidebar, and charts.
- **app.js**: The JavaScript file for managing the main dashboard functionalities, including API requests and chart rendering.
- **data_dashboard.html**: The HTML file for displaying data-related dashboards.
- **data_dashboard.js**: Manages the data visualization for the data-specific section of the application.

## Libraries Used
- **Chart.js**: A JavaScript library used to generate charts for data visualization.
- **OpenWeather API**: Used to get weather and air quality data.

## Troubleshooting
- Ensure that you have a valid API key from OpenWeather.
- Make sure the API key is correctly placed in the JavaScript files.
- If the application does not load properly, verify your network connection and check the browser console for error messages.

## License
This project is licensed under the MIT License.

