import { useState } from "react";
import { Weather } from "./Weather";

function App() {
  const APIkey: string = import.meta.env.VITE_API_KEY;
  const [weatherData, setWeatherData] = useState<Weather | null>(null);

  const handleClick = (city: string, country: string = "DE") => {
    // e.preventDefault();
    // let currentCity = e.target.innerText;
    console.log(`handling click for ${city}, ${country}`);

    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${APIkey}`
    )
      .then((res) => res.json())
      .then((res) => setWeatherData(res))
      .catch((err) => console.log(err));
  };

  // const handleAUClick = (e: any) => {
  //   e.preventDefault();
  //   let currentCity = e.target.innerText;
  //   const country: string = "AU";

  //   fetch(
  //     `http://api.openweathermap.org/data/2.5/weather?q=${currentCity},${country}&appid=${APIkey}`
  //   )
  //     .then((res) => res.json())
  //     .then((res) => setWeatherData(res))
  //     .catch((err) => console.log(err));
  // };

  const minusKelvin: number = 273.15;

  return (
    <div className="flex flex-col gap-4 m-4 justify-center items-center text-center mt-40 ">
      <h1 className="text-slate-300 text-6xl p-2">Weather App</h1>
      <div className="flex gap-4">
        <button
          className="border border-white p-2"
          onClick={() => handleClick("Hamburg", "DE")}
        >
          Hamburg
        </button>
        <button
          className="border border-white p-2"
          onClick={() => handleClick("Berlin", "DE")}
        >
          Berlin
        </button>
        <button
          className="border border-white p-2"
          onClick={() => handleClick("Cologne", "DE")}
        >
          Cologne
        </button>
        <button
          className="border border-white p-2"
          onClick={() => handleClick("Sydney", "AU")}
        >
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
