import React, { useEffect, useState } from "react";
import Weather from "./components/Weather";
import Forecast from "./components/Forecast";
import SearchBox from "./components/SearchBox";

const api = {
  key: "24989855195df0dce180bfa0a5ee089d",
  base: "http://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState([]);
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setPosition({
        latitude: pos.coords.latitude.toFixed(1),
        longitude: pos.coords.longitude.toFixed(1),
      });
    });
    fetch(
      `${api.base}weather?lat=${position.latitude}&lon=${position.longitude}&units=metric&appid=${api.key}&lang=es`
    )
      .then((resweather) => resweather.json())
      .then((resultWeather) => {
        setWeather(resultWeather);
        setQuery("");
      });
    fetch(
      `${api.base}forecast/daily?lat=${position.latitude}&lon=${position.longitude}&units=metric&cnt=6&APPID=${api.key}&lang=es`
    )
      .then((resForecast) => resForecast.json())
      .then((resultForecast) => {
        setForecast(resultForecast);
        setQuery("");
      });
  }, [position.latitude, position.longitude]);

  const search = (e) => {
    if (e.key === "Enter") {
      fetch(
        `${api.base}weather?q=${query}&units=metric&APPID=${api.key}&lang=es`
      )
        .then((resweather) => resweather.json())
        .then((resultWeather) => {
          setWeather(resultWeather);
          console.log(resultWeather);
          setQuery("");
        });
      fetch(
        `${api.base}forecast/daily?q=${query}&units=metric&cnt=6&APPID=${api.key}&lang=es`
      )
        .then((resForecast) => resForecast.json())
        .then((resultForecast) => {
          setForecast(resultForecast);
        });
    }
  };

  const dateBuilder = (d, f) => {
    let months = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciemnbre",
    ];
    let days = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];

    d.setDate(d.getDate() + f);
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    d = `${day} ${date} ${month} ${year}`;

    return d;
  };

  let backgroundClass = "";
  if (weather?.weather) {
    if (weather.weather[0].icon === "04d") {
      backgroundClass = "app broken-clouds";
    } else if (
      weather.weather[0].icon === "03d" ||
      weather.weather[0].icon === "02d"
    ) {
      backgroundClass = "app clouds";
    } else if (
      weather.weather[0].icon === "04d" ||
      weather.weather[0].icon === "11d"
    ) {
      backgroundClass = "app storm";
    } else if (
      weather.weather[0].icon === "10d" ||
      weather.weather[0].icon === "09d"
    ) {
      backgroundClass = "app rain";
    } else if (weather.weather[0].icon === "01d") {
      backgroundClass = "app sun";
    }
  }

  return (
    <div className={backgroundClass}>
      <main>
        <SearchBox query={query} search={search} setQuery={setQuery} />
        {typeof weather.main !== "undefined" ? (
          <div className="content">
            <Weather weather={weather} dateBuilder={dateBuilder} />
            <Forecast forecast={forecast} dateBuilder={dateBuilder} />
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
