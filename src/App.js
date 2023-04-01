import React, { useState, useEffect, createContext} from 'react';
import axios from 'axios';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faCloud } from "@fortawesome/free-solid-svg-icons";
import Main from './components/Main';
import WeatherDetails from './components/WeatherDetails';
import './App.css';

library.add(faMagnifyingGlass);
library.add(faCloud);

export const weatherDataContext = createContext();
export const LocationContext = createContext();

function WeatherApp() {

  const [weatherData, setWeatherData] = useState({main: {temp:16, humidity: 86,pressure:69}, wind:{speed:26}, clouds:{all:68}, weather:[{main: "clouds", description: "overcast clouds"}]});
  const [city, setCity] = useState("");


  const apiKey = '7eddbaa4e1529db4d74bb6dbf6eb273d'
  const tempInCelsius = Math.round(weatherData.main.temp);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        // make a fetch call to the weather API to get the weather information
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`)
          .then(response => {
            return response.json();
          })
          .then(data => {
            setWeatherData(data);
            console.log(data);
          })
          .catch(error => {
            console.error('Error fetching weather data:', error);
          });
      });
    }
  },[]);
  


  const getWeather =  () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    
    try {
      axios.get(url).then(response => {
        setWeatherData(response.data);
        setCity('');
        console.log(response.data);
      }).catch(error => {
        console.log(error);
        alert("Some error occurred while fetching the data...");
      })
    } catch(error){
      console.log(error);
      alert("Some error occurred while fetching the data...");
    }
    

  }

  let changeBackground = (id) =>{
    if (id >= 200 && id <= 232) {
      return "thunderstorm"
    } else if (id >= 300 && id <= 321) {
      return "drizzle";
    } else if (id >= 500 && id <= 531) {
      return "rain";
    } else if (id >= 600 && id <= 622) {
      return "snow";
    } else if (id >= 701 && id <= 781) {
      return "atmosphere";
    } else if (id === 800) {
      return "clear";
    } else if (id >= 801 && id <= 804) {
      return "clouds";
    } else {
      return "atmosphere";
    }
  }

 

  return (
    <div className={`container ${changeBackground(weatherData.weather[0].id)}`}> 
    <weatherDataContext.Provider value={{weatherData,setWeatherData}}>
      <LocationContext.Provider value={{city,setCity}}>
      <Main tempConvert = {tempInCelsius}/>
      <WeatherDetails getData = {getWeather} />
      </LocationContext.Provider>
    </weatherDataContext.Provider>
    </div>
  );
}

export default WeatherApp;
