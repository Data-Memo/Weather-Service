# Weather Web Service
A Dockerized Node.js service for fetching weather data.

## Features
- Provides weather info for any city.
- Includes City, Temp, Condition, and Timestamp.
- Runs inside Docker for portability.

## Environment Variables
- `API_KEY`: Your OpenWeatherMap API Key.

## Build and Run
1. `docker build -t weather-service .`
2. `docker run -p 8080:8080 -e API_KEY=ae416aee1de591ac87412fd7d8c72028 weather-service`