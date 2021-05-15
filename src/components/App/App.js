import React, {useState, useEffect} from "react";
import WeatherCard from '../WeatherCard/';
import {weatherIcon} from "./weatherIcon.js"

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [weatherError, setWeatherError] = useState(false);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null); 
  const [cityLocation, setCityLocation] = useState(null);

  useEffect(() => {
    async function initStartLocation(){
      let initLat = null;
      let initLong = null;

      try {
        const position = await getCurrentPosition();
        initLat = position.coords.latitude;
        initLong = position.coords.longitude;
        setLat(initLat);
        setLong(initLong);
      } catch(err){
        console.log(err);
      }

      let URL  = getURL({type:"GEO", lat:initLat, long:initLong});
      fetchWeatherData(URL);
    }
    
    initStartLocation();
  }, []);

  async function fetchWeatherData(URL){
    let response = await fetch(URL);
    if(!response.ok){
      const error = new Error("Can't get weather data.");
      setWeatherError(error);
    }
    let data = await response.json();
    console.log(data);
    setWeatherData(convertToWeatherFormat(data));
  }

  function hendleRefreshButton(e){
    let URL  = getURL({type:"GEO", lat:lat, long:long});
    fetchWeatherData(URL);
  }

  return (
    <div className="App">
      <WeatherCard 
        weatherData={weatherData}
        onRefreshButtonClick={hendleRefreshButton}
      />
    </div>
  );
}



function getCurrentPosition(options = {}) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

function convertToWeatherFormat(data){
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
