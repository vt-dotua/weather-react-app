import { useEffect, useState } from 'react'

function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position){
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });

    fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
    .then(response => response.json())
    .then(data =>{
      setWeatherData(data); 
      console.log(data)});

  }, [lat, long]);

  return (
    <div className="App">

    </div>
  );
}


export default App;
