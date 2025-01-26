import React, { useState } from 'react';
import Clouds from '../Images/Clouds.png';
import Clear from '../Images/Clear.png';
import Rain from '../Images/Rain.png';
import Mist from '../Images/mist.png';
import styled from 'styled-components';
import Thunderstorm from '../Images/thunderstorm.gif'
import Error from '../Images/error.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'


const Weather = () => {
    const [search, setSearch] = useState("");
    const [apiData, setApiData] = useState("");
    const [errorMsg, setErrorMsg]=useState("")

    const API_KEY = 'bdc59422277cdbf32eebee1217ff4c5c';

    const onChangeHandler = (event) => {
        const value = event.target.value;
        setSearch(value);
        setErrorMsg(false)
    };

    const ApiFun = async () => {
        if (!search.trim()) return;

        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`);
            const data = await res.json();
            setApiData(data);
            if(data.cod==="404"){
                    setErrorMsg("Please check your City or Country spelling")
            }
            // console.log(data);
            
        } catch (error) {
            console.error("Error fetching the weather data", error);
        }

        setSearch("");
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp * 1000); 
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    

    return (
        <Wrapper>
        <div>
        <div className="weather-box">
            <h2>Weather App</h2>
            <div className="search-bar">
                <input
                    type="text"
                    onChange={onChangeHandler}
                    name="name"
                    value={search}
                    placeholder="Enter City, Country and State"
                    className="search-input"
                />
                <button onClick={ApiFun} className="search-button">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                
                </button>
            </div>
            </div>
            {apiData && apiData.weather ? ( 
                <div className="weather-container">
                     <h1 className="city-name">{apiData.name}</h1>
            <div className="weather-display">
                {errorMsg? <div>
                    <p>{errorMsg}</p>
                    <img className="weather-icon" src={Error} alt=""  />
                </div>:""}
                
                    <div className="weather-info">
                       
                        <div >
                            <p className='now'>Now</p>
                        <img
                            className="weather-icon"
                            src={
                                apiData.weather[0].main === "Clouds" ? Clouds :
                                apiData.weather[0].main === "Haze" ? Mist :
                                apiData.weather[0].main === "Clear" ? Clear :
                                apiData.weather[0].main === "Rain" ? Rain :
                                apiData.weather[0].main === "Mist" ? Mist :
                                apiData.weather[0].main === "Thunderstorm" ? Thunderstorm :
                                ""
                            }
                            alt={apiData.weather[0].main}
                        />
                         <h3 className="temperature">{Math.trunc(apiData.main.temp)}°C</h3>
                         <p>Feels like {Math.trunc(apiData.main.feels_like)}°</p>
                        </div>
                        <div className='weather-description-box'>
                        <p className="weather-description">{apiData.weather[0].description}</p>
                        <p className='humidity'> Humidity {apiData.main.humidity}%</p>
                        <p className='wind'>Wind {Math.trunc(apiData.wind.speed)}kph</p>
                        <p className="sunrise-sunset">🌅 Sunrise: {formatTime(apiData.sys.sunrise)}</p>
                        <p className="sunrise-sunset">🌇 Sunset: {formatTime(apiData.sys.sunset)}</p>
                        </div>
                    </div>
                    </div>
                    </div> ) : null}
           
        </div>
        </Wrapper>
    );
};

export default Weather;
const Wrapper=styled.div`
    .weather-box {
    /* width: 300px; */
    margin: 0 auto 10px auto;
    background-color: #f3f3f3;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-align: center;
    color: black;
}
    .weather-container {
    /* width: 300px; */
    margin: 0 auto;
    background-color: #f3f3f396;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-align: center;
    color: black;
}

.search-bar {
    display: flex;
    justify-content: space-between;
    background-color: #b4d0e9;
    padding: 8px;
    border-radius: 5px;
}

.search-input {
    border: none;
    outline: none;
    width: 80%;
    padding: 8px;
    border-radius: 5px;
    font-size: 16px;
    margin-right: 4px;
}

.search-button {
    background-color: #1e90ff;
    border: none;
    width: 42px;
    height: 42px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    cursor: pointer;
    color:black;
    font-size: 18px;
    font-weight: bold;
}

.search-button i {
    margin: 0;
}

.weather-display {
    margin-top: 20px;
}

.weather-info {
    display: flex;
    justify-content: space-between;
}
.weather-description-box{
    display: flex;
    flex-direction: column;
    
}

.city-name {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
    
}

.weather-icon {
    width: 100px;
    height: 100px;
    border-radius: 3px;
}

.temperature {
    font-size: 24px;
    font-weight: bold;
    margin: 0; 
}


.weather-description {
    font-size: 1rem;
    color: #000;
    
}
.sunrise-sunset {
        /* font-size: 16px; */
        color: #555;
    }
    p{
    margin: 0;
    font-size: 0.8rem;
    color: black;
}
h2{
    margin: 0 0 5px 0;
}
.now{
    text-align: left;
    padding-bottom: 10px;
    font-size: 0.9rem;
    font-weight: bold;
}
@media (max-width: 768px) {
  .wheather-box{
    width: 280px !important;
  }
    
}

`
