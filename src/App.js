import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import img_temperature from './img/temperature.svg'
import img_pressure from './img/pressure.svg'
import img_humidity from './img/humidity.svg'

function App() {

  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

  console.log(location);
  let getWeather = async (lat, long) => {
    let res = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WEATHER_KEY,
        lang: 'pt',
        units: 'metric'
      }
    });
    setWeather(res.data);
  }
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true)
    })
  }, [])

  if (location === false) {
    return (
      <Fragment>
        Você precisa habilitar  a localização no browser
      </Fragment>
    )
  } else if (weather === false) {
    return (
      <Fragment>
        Carregando o clima..
      </Fragment>
    )
  }

  else {
    return (
      <Fragment>
        <h3>Clima nas suas coordenadas ({weather['weather'][0]['description']})</h3>
        <hr />
        <div className="weather">
          <ul>
            <li><img src={img_temperature} alt="Temperatura atual"/>Temperatura atual: {weather['main']['temp']}°</li>
            <li><img src={img_temperature} alt="Temperatura máxima"/>Temperatura máxima: {weather['main']['temp_max']}°</li>
            <li><img src={img_temperature} alt="Temperatura mínima"/>Temperatura mínima: {weather['main']['temp_min']}°</li>
            <li><img src={img_pressure} alt="Pressão"/>Pressão: {weather['main']['pressure']} hPa</li>
            <li><img src={img_humidity} alt="Humidade"/>Umidade relativa: {weather['main']['humidity']}% UR</li>
          </ul>
        </div>

      </Fragment>
    );
  }
}

export default App;
