import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react';
import { weatherDataContext, LocationContext } from '../App';

function WeatherDetails(props) {
    const {weatherData} = useContext(weatherDataContext);
    const {city,setCity} = useContext(LocationContext)
    let cities = [
        {
          name: "Birmingham",
        },
        {
          name: "Manchester",
        },
        {
          name: "New York",
        },
        {
          name: "California",
        },
      ]
  
  return (
    <div className='side-info'>
      <div className='input-area'>
        <input value={city} placeholder='Enter City' type="text" onChange={event => setCity(prevCity => prevCity = event.target.value)}/>
        <button onClick={props.getData}><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /></button>
      </div>
      <div className='weather-details suggestion'>
  <ul>
    {cities.map(each => {
      return <li key={each.name} onClick={() => setCity(each.name)}>{each.name}</li>;
    })}
  </ul>
</div>
<div class="line"></div>

      <div className='weather-details'>
      <h1>Weather Details</h1>
      <ul>
        <li>
          Cloudy
          <p>{weatherData.clouds.all}%</p>
        </li>
        <li>
          Humidity
         <p>{weatherData.main.humidity}%</p>
        </li>
        <li>
          Wind
          <p>{weatherData.wind.speed} mph</p>
        </li>
        <li>
          Pressure
          <p>{weatherData.main.pressure} Pa</p>
        </li>
      </ul>
        </div>
        <div class="line"></div>
     </div>
  )
}

export default WeatherDetails