# Air Quality Monitoring Dashboard

## Overview

The Air Quality Monitoring Dashboard is a web-based application that provides real-time information on weather and air quality conditions for cities around the world. It aims to increase awareness of environmental issues and help users make informed decisions regarding outdoor activities.

## Features

- **City Search with Auto-Suggestions**: Search for any city and get instant weather and air quality data. The application uses the OpenWeather Geocoding API for dynamic suggestions.
- **Real-Time Weather Data**: Displays current weather conditions, including temperature, humidity, pressure, and wind information.
- **Air Quality Monitoring**: Provides air quality index (AQI) values for pollutants like PM2.5, PM10, CO, NOx, NH3, SO2, and O3.
- **Interactive Charts**: Visualize temperature trends, humidity levels, and air quality data using interactive charts created with Chart.js.
- **Color-Coded Indicators**: Data containers are color-coded based on pollutant levels to indicate good, moderate, or poor air quality.

## Technologies Used

- **HTML, CSS, JavaScript**: Core technologies used to build the front-end of the dashboard.
- **Chart.js**: JavaScript library used for data visualization and interactive charts.
- **OpenWeather API**: Used to retrieve real-time weather and air quality data.
- **Google Fonts**: Custom fonts to improve the visual appeal of the UI.
- **Dotenv**: For managing environment variables securely.

## Setup Instructions

1. **Clone the Repository**:

   ```sh
   git clone <repository-url>
   ```

2. **Navigate to the Project Directory**:

   ```sh
   cd air-quality-monitoring-dashboard
   ```

3. **Install Dependencies**:
   Make sure you have **Node.js** installed, then run:

   ```sh
   npm install
   ```

4. **Create Environment File**: Create a file named `.env` in the root directory to store your API key:

   ```env
   API_KEY="YOUR_API_KEY"
   ```

5. **Run the Application**:
   Open `index.html` in your browser to view the application.

## Usage

- Open the application in a browser.
- Use the search bar to enter the city name.
- Select from the auto-suggestions to get real-time weather and air quality data.
- Charts are updated dynamically to visualize temperature, humidity, and air pollutant levels.

## Future Improvements

- **User Authentication**: Add a user login system for saving preferred cities.
- **Predictive Analytics**: Use historical data to predict future air quality trends.
- **Mobile Optimization**: Enhance the user interface for a better mobile experience.

## License

This project is licensed under the MIT License.
