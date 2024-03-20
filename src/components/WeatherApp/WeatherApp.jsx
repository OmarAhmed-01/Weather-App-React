import React, { useState } from 'react'
import './WeatherApp.css'
import search_icon from '../../assets/search.png'
import humidity from '../../assets/humidity.png'
import windspeed from '../../assets/wind.png'
import errorImg from '../../assets/error.png'
import Sun from '../../assets/sun.png'
import Moon from '../../assets/moon.png'
import Cloud_N from '../../assets/few_clouds_n.png'
import Cloud_D from '../../assets/few_clouds_d.png'
import Scattered_clouds from '../../assets/cloud.png'
import Broken_clouds from '../../assets/broken_clouds.png'
import Shower_rain from '../../assets/shower_rain.png'
import rain_d from '../../assets/rain_d.png'
import rain_n from '../../assets/rain_n.png'
import storm from '../../assets/storm.png'
import snow from '../../assets/snowflake.png'
import mist from '../../assets/mist.png'


export const WeatherApp = () => {

    const [error, setIsError] = useState(false);
    const [weatherData, setWeatherData] = useState(null);
    const [weatherImage, setWeatherImage] = useState(null);
    const [cityName, setCityName] = useState(null);
    const [temperature, setTemperature] = useState(null);
    const [Humidity, setHumidity] = useState(null);
    const [windSpeed, setWindSpeed] = useState(null);

    const handleSubmit = async (event) => {

        event.preventDefault();
        console.log(event.target[0].value);

        const api_key = 'c23b41a0bf139e088b878159f13107b8';
        const City_Name = event.target[0].value;
        const url = `https:api.openweathermap.org/data/2.5/weather?q=${City_Name}&appid=${api_key}&units=metric`;
        let respone = await fetch(url);
        let data = await respone.json();

        if(respone.status === 404){
            setIsError(true);
            setWeatherData(null);
        }
        else{

            setIsError(false);
            setWeatherData(data);

            //image
            if(data.weather[0].icon === '01d'){
                setWeatherImage(Sun);
            }
            else if(data.weather[0].icon === '01n'){
                setWeatherImage(Moon);
            }
            else if(data.weather[0].icon === '02d'){
                setWeatherImage(Cloud_D);
            }
            else if(data.weather[0].icon === '02n'){
                setWeatherImage(Cloud_N);
            }
            else if(data.weather[0].icon === '03d' || data.weather[0].icon === '03n'){
                setWeatherImage(Scattered_clouds);
            }
            else if(data.weather[0].icon === '04d' || data.weather[0].icon === '04n'){
                setWeatherImage(Broken_clouds);
            }
            else if(data.weather[0].icon === '09d' || data.weather[0].icon === '09n'){
                setWeatherImage(Shower_rain);
            }
            else if(data.weather[0].icon === '10d'){
                setWeatherImage(rain_d);
            }
            else if(data.weather[0].icon === '10n'){
                setWeatherImage(rain_n);
            }
            else if(data.weather[0].icon === '11d' || data.weather[0].icon === '11n'){
                setWeatherImage(storm);
            }
            else if(data.weather[0].icon === '13d' || data.weather[0].icon === '13n'){
                setWeatherImage(snow);
            }
            else if(data.weather[0].icon === '50d' || data.weather[0].icon === '50n'){
                setWeatherImage(mist);
            }
            

            //city
            const country = data.sys.country;
            setCityName(data.name + ', ' + `${country}`);

            //temperature
            setTemperature(Math.floor(data.main.temp)+'°c');

            //humidity
            setHumidity(data.main.humidity+'%');

            //windspeed
            setWindSpeed(Math.floor(3.6*(data.wind.speed))+' km/h');
        }
    }

  return (
    <div className='container'>
        <div>
            <form onSubmit={handleSubmit} className=' top-bar'>
                <input type='text' placeholder='Search' className=' search-input'/>
                <button className=' search-btn' type='submit'>
                    <img src={search_icon} className=' search-icon'/>
                </button>
            </form>
        </div>
        {
            error && (
                <div className='error'>
                    <img src={errorImg} id='error_icon'/>
                    <h1>Oops! Something went wrong.</h1>
                    <p>Invalid city name.</p>
                </div>
            )
        }
        {
            weatherData && (
                <div className=' inner-container'>
                    <div className='image-container'>
                        <img src={weatherImage} className=' image'/>
                    </div>
                    <div className=' location-temp'>
                        <h1 className=' temp'>{temperature}</h1>
                        <h2 className=' city'>{cityName}</h2>
                    </div>
                    <div className=' data'>
                        <div className=' data-container-humidity'>
                            <img src={humidity} className=' data-img'/>
                            <div className=' details'>
                                <span className='humidity'>{Humidity}</span>
                                <span>Humidity</span>  
                            </div>
                        </div>
                        <div className=' data-container-wind'>
                            <div className=' details'>
                                <span className=' windspeed'>{windSpeed}</span>
                                <span>Windspeed</span>
                            </div>
                            <img src={windspeed} className=' data-img'/>
                        </div>
                    </div>  
                </div>
            )
        }
    </div>
  )
}

