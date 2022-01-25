const Forecast = ({ forecast, dateBuilder }) => {
  return (
    <div className="forecast">
      <ul>
        {forecast.list?.map((d, i) => (
          <li key={i}>
            <div>{dateBuilder(new Date(), i + 1).split(" ").slice(0,2).join(" ")}</div>
            <img
              src={`http://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png`}
              alt="weather-icon"
            ></img>
            <div className="weather">{d.weather[0].description}</div>
            <div className="forecast-temp">
              <span>Min:</span> {Math.round(d.temp.min)}ºc <span>Max:</span> {Math.round(d.temp.max)}ºc
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Forecast;
