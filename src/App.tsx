import { useState } from "react";

export interface Weather {
  coord: Coord;
  weather: WeatherElement[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface Clouds {
  all: number;
}

export interface Coord {
  lon: number;
  lat: number;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

export interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface WeatherElement {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Wind {
  speed: number;
  deg: number;
}

function App() {
  const APIkey: string = "88e707da98c1627f8233021ca9991abc";
  const country: string = "DE" || "AU";
  const city: string = "Hamburg" || "Berlin " || "Cologne" || "Sydney";

  const [weather, setWeather] = useState(false);
  const [weatherData, setWeatherData] = useState<Weather | null>(null);

  const handleClick = (e: any) => {
    e.preventDefault();
    let currentCity = e.target.innerText;
    setWeather(true);
    if (weather) {
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${currentCity},${country}&appid=${APIkey}`
      )
        .then((res) => res.json())
        .then((res) => setWeatherData(res))
        .catch((err) => console.log(err));
    }
  };
  const handleAUClick = (e: any) => {
    e.preventDefault();
    let currentCity = e.target.innerText;
    const country: string = "AU";
    setWeather(true);
    if (weather) {
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${currentCity},${country}&appid=${APIkey}`
      )
        .then((res) => res.json())
        .then((res) => setWeatherData(res))
        .catch((err) => console.log(err));
    }
  };
  const minusKelvin: number = 273.15;

  return (
    <div className="flex flex-col gap-4 m-4 justify-center items-center text-center mt-40 ">
      <h1 className="text-slate-300 text-6xl p-2">Weather App</h1>
      <div className="flex gap-4">
        <button className="border border-white p-2" onClick={handleClick}>
          Hamburg
        </button>
        <button className="border border-white p-2" onClick={handleClick}>
          Berlin
        </button>
        <button className="border border-white p-2" onClick={handleClick}>
          Cologne
        </button>
        <button className="border border-white p-2" onClick={handleAUClick}>
          Sydney
        </button>
      </div>
      <div>
        {weatherData ? (
          <div className="flex flex-col justify-center items-center gap-4">
            <h2>City name: {weatherData.name}</h2>
            <h3>Weather condition: {weatherData.weather[0].description}</h3>

            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            />
            <h2>Wind speed: {weatherData.wind.speed} m/std</h2>
            <p>
              Current temperature{" "}
              {Math.floor(weatherData.main.temp - minusKelvin)}
              (°C){" "}
            </p>
          </div>
        ) : (
          <h2>Choose your city:</h2>
        )}
      </div>
    </div>
  );
}

export default App;
