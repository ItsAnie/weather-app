import React, { useState } from "react";
import './WeatherApp.css';

const API_KEY = "9eb0a5b993fcb16294dddc0ac1afba2f";

function WeatherApp(){
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');

    const getWeather = async () => {
        try{
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=en`

            ); 
            const data = await response.json();
            console.log(data);

            if(data.cod === 200 || data.cod === "200"){
                setWeather(data);
            } else{
                alert('City not found');
                setWeather(null);
            }
        }catch (error){
           console.error("An error occurred.", error);
           alert("Please check your internet or API key.");
        }
    };

    return (
        <div className="weather-app">
            <h1>Weather App</h1>
            <input
                type="text"
                placeholder="Enter a city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={getWeather}>See the weather</button>
            {error && <p className="error">{error}</p>}

            {weather && (<div className="weather-info">
                    <h2>{weather.name}, {weather.sys.country}</h2>
                    <p>Temperature: {weather.main.temp}°C</p>
                    <p>The Weather: {weather.weather[0].description} m/s</p>
                    <p>Wind: {weather.wind.speed}°C</p>
                </div>
            )}
        </div>
    );
}

export default WeatherApp