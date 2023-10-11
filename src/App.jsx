import WeatherCard from "./assets/components/WeatherCard";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { getCountries } from "./services/countries";
import { getCities } from "./services/cities";
import { getCityWeather } from "./services/weather";

function App() {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState(null);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [temp, setTemp] = useState();

  useEffect(() => {
    const success = (pos) => {
      const obj = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      };
      setCoords(obj);
    };
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  useEffect(() => {
    (async () => {
      setCountries(await getCountries());
    })();
  }, []);

  useEffect(() => {
    if (coords) {
      const apiKey = "f7e24b708fbf59f27b91ac13deea5ae6";
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}`;
      axios
        .get(url)
        .then((res) => {
          setWeather(res.data);
          const obj = {
            celsius: (res.data.main.temp - 273.15).toFixed(1),
            farenheit: (((res.data.main.temp - 273.15) * 9) / 5 + 32).toFixed(
              1
            ),
          };
          setTemp(obj);
        })
        .catch((err) => console.log(err));
    }
  }, [coords]);

  const countryHandler = async (e) => {
    e.currentTarget.value && setCities(await getCities(e.currentTarget.value));
    setWeather(null);
  };
  const cityHandler = async (e) =>
    e.currentTarget.value &&
    setWeather(await getCityWeather(e.currentTarget.value));

  return (
    <>
      <div className="region_container">
        <div className="coutry_container">
          <label>Elige un país:</label>
          <select onChange={countryHandler}>
            <option value="">Selecciona</option>
            {countries.map((country) => (
              <option key={country.cca2} value={country.cca2}>
                {country.name.common}
              </option>
            ))}
          </select>
        </div>

        {cities.length > 0 && (
          <div className="city_container">
            <label>Elige una ciudad:</label>
            <select onChange={cityHandler}>
              <option value="">Selecciona</option>
              {cities.map((city) => (
                <option key={city.id}>{city.name}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      <hr />

      {weather && (
        <div className="temperature_container">
          <h2>Actual temperature: {weather.main.temp}º</h2>
          <p>Min: {weather.main.temp_min.toFixed()}°</p>
          <p>Max: {weather.main.temp_max.toFixed()}°</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
        </div>
      )}

      <hr />

      <div>
        <WeatherCard weather={weather} temp={temp} />
      </div>
    </>
  );
}

export default App;
