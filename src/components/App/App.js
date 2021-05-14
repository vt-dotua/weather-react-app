import React, {useState, useEffect} from "react";
import WeatherCard from '../WeatherCard/';
import {weatherIcon} from "./weatherIcon.js"

function App() {

  const [weatherData, setWeatherData] = useState({});
  const [weatherError, setWeatherError] = useState(false);

  useEffect(() => {
    async function getWeather(){
      const position = await getCurrentPosition();
      let long = position.coords.longitude;
      let lat  = position.coords.latitude;
      let URL  = getURL({type:"GEO", lat:lat, long:long});

      try {
        const weatherData = await fetchWeatherData(URL);
        setWeatherData(weatherData);
      } catch(err){
        setWeatherError(err);
      }
    }
    
    getWeather();
  }, []);

  return (
    <div className="App">
      <WeatherCard weatherData= {weatherData}/>
    </div>
  );
}

const getCurrentPosition = (options = {}) => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

const fetchWeatherData = async (URL) => {
  let response =  await fetch(URL);
  
  if(!response.ok){
    const error = new Error("Can't get weather data.");
    return Promise.reject(error);
  }

  let data     =  await response.json();
  return turnToWeatherObj(data);
}

function turnToWeatherObj(data){
  return {
    temp: Math.round(+data.main["temp"]),
    humidity: Math.round(+data.main["humidity"]),
    feels_like: Math.round(+data.main["feels_like"]),
    city: data.name,
    country: data.sys.country,
    description: data.weather[0].description,
    icon: weatherIcon.getWeatherIcon(data.weather[0].icon, data.weather[0].id)
  }
}

function getURL(data){
  if(data.type === "GEO")
    return `${process.env.REACT_APP_API_URL}/weather/?lat=${data.lat}&lon=${data.long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
  
}

export default App;

//const position = await getCurrentPosition();
//let long = position.coords.longitude;
//let lat  = position.coords.latitude;
