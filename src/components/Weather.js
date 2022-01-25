const Weather = ({ weather, dateBuilder }) => {
  console.log(weather);

  /*  let icon = ""
  if( weather.weather[0].icon === "01d"){
    icon = "clear-day.svg"
  }else if( weather.weather[0].icon === "03d" ||
  weather.weather[0].icon === "02d"){
icon="partly-cloudy-day.svg"
  }else if(weather.weather[0].icon === "04d" || weather.weather[0].icon === "11d"){
icon="overcast.svg"
  }else if(weather.weather[0].icon === "10d" || weather.weather[0].icon === "09d"){
    icon="partly-cloudy-day-rain.svg"
  } */

  /*   const weatherData = [
    {
        icon:"01d",
        main:"clear",
        description:"clear sky",
        newIcon: "clear-day-svg",
        newMain: "despejado",
        newDescription: "cielo despejado"
},
{
  icon:"03d",
  main:"clouds",
  description:"nubes",
  newIcon: "clear-day.svg",
  newMain: "nubes",
  newDescription: "nubes" 
} 
] */

  /* const newWeather = weatherData.filter(w =>  weather.weather[0].icon === w.icon ? w.newIcon : null  )
console.log(newWeather,newWeather.newIcon) */

  console.log(dateBuilder(new Date(), 0).split(" ").slice(0, 2).join(" "));

  return (
    <div className="weather-content">
      <div className="location-box">
        <div className="location">
          {weather.name}, {weather.sys.country}
        </div>
        <div className="date">{dateBuilder(new Date(), 0)}</div>
      </div>
      <div className="weather-box">
        <div className="a">
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
            alt="weather-icon"
          ></img>
          <div className="temp">{Math.round(weather.main.temp)}º</div>
        </div>
        <div className="weather">
          <div>
            <span>{weather.weather[0].description}</span>
          </div>
        </div>
        <ul className="weather-info">
          <li>
            <div>humedad</div>
            <div>{weather.main.humidity}%</div>
          </li>
          <li>
            <div>viento</div>
            <div> {Math.round(weather.wind.speed)}Km/h</div>
          </li>
          <li>
            <div>presión</div>
            <div>{weather.main.pressure} mbar</div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Weather;
