import { useContext } from "react"
import { weatherDataContext } from "../App"

function Main(props) {
    
    const{weatherData} = useContext(weatherDataContext);

    
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];


    let displayDate = () =>{
      let date = new Date();
      let hour = date.getHours();
      let minute = date.getMinutes();
      let dayName = days[date.getDay()];
      let day = date.getDate();
      let month = months[date.getMonth()];
      let year = date.getFullYear().toString().slice(-2);

      return `${hour}:${minute} - ${dayName}, ${day} ${month} ${year}`;
    }

    let changeIcon = (id) =>{
    
        if (id >= 200 && id <= 232) {
          return "thunderstrom.svg";
        } else if (id >= 300 && id <= 321) {
          return "drizzle.svg";
        } else if (id >= 500 && id <= 531) {
          return "rain.svg";
        } else if (id >= 600 && id <= 622) {
          return "snow.svg";
        } else if (id >= 701 && id <= 781) {
          return "atmosphere.svg";
        } else if (id === 800) {
          return "clear.svg";
        } else if (id >= 801 && id <= 804) {
    
          return "clouds.svg";
        } else {
          return "atmosphere.svg";
        }
      }

  return (
    <div className='main'>
    <div className='header'>
      <p>the.weather</p>
    </div>
    <div className='main-info'>
      <h1>{props.tempConvert}&deg;C</h1>
      <div className='location'>
      <h2>{weatherData.name}</h2>
      <p>{displayDate()}</p>
      </div>
      
      <div className='icon'>
       <img src={require(`../assets/icons/${changeIcon(weatherData.weather[0].id)}`)} alt = "icon"/>
      <p>{weatherData.weather[0].description}</p>
      </div>
</div>
  </div>
  )
}

export default Main