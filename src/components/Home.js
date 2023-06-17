import React, { useState } from "react";
import axios from "axios";

function Home() {
  const [cityName, setCityName] = useState("");
  const [data, setWeather] = useState({});
  const APPKEY = "8eb104a215780c50c17b3abed6534689";
  const handleChange = (e) => {
    setCityName(e.target.value);
  };
  const handleClick = async () => {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APPKEY}`
    );
    console.log(res.data);
    setWeather(res.data);
  };

  return (
    <div className="page">
      <h1 className="header">City Weather</h1>
      <div className="input">
        <input type="text" placeholder="City Name" onChange={handleChange} />
        <button onClick={handleClick}>Search</button>
      </div>

      <div className="desc">
        <div className="name">{data.name}</div>
        {data.sys ? (
          <div className="countryName">,{data.sys.country}</div>
        ) : null}
      </div>
      
      <div className="wt">
      {data.weather ? (
        <div className="icon">
          <img
            type="icon"
            src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
            alt=""
          />
        </div>
      ) : null}
        {data.main ? (
          <div className="temp">{Math.ceil(data.main.temp - 273.15)}°C</div>
        ) : null}
        {data.weather ? (
          <div className="type">{data.weather[0].main}</div>
        ) : null}
      </div>
      

      {data.main && (
        <div className="details">
          {data.main ? (
            <div className="feels">
              <div className="de">feels like</div>
              {Math.ceil(data.main.feels_like - 273.15)}°C
            </div>
          ) : null}
          {data.main ? (
            <div className="humidity">
              <div className="de">humidity</div>
              {data.main.humidity} %
            </div>
          ) : null}
          {data.wind ? (
            <div className="wind">
              <div className="de">wind</div>
              {data.wind.speed} Km/Hr
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default Home;
