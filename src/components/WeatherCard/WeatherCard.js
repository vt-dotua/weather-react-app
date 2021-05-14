import React, {useState, useEffect} from "react";
import './WeatherCard.css'

const WeatherCard = (props) => {
  return (
      <div className="card">
          <div className="card__header">
              <span className="card__city">{props.weatherData.city}, {props.weatherData.country}</span>
          </div>
          <div className="card__main">
              <div className="card__info">
                <span className="card__t">
                  {props.weatherData.temp}
                  <i className="wi 
                    wi-celsius
                    card__cel-icon_b
                    cel-icon--big">
                  </i>
                </span>
              </div>
              <div className="card__icon-info">
                <div className="card__w-icon">
                  <i className={`wi ${props.weatherData.icon} w-icon`}></i>
                </div>
                <div className="card__w-lable">
                  <span className="w-lable">
                    {props.weatherData.description}
                  </span>
                </div>
              </div>
          </div>
          <div className = "card__detailed-info">
            <p className ="card__p_items card__p_items--m-bottom">
              Feels like: {props.weatherData.feels_like}
              <i className="wi 
                    wi-celsius
                    card__cel-icon_s
                    cel-icon--small">
              </i>
            </p>
            <p className="card__p_items">
              Humidity: {props.weatherData.humidity} % 
            </p>
          </div>          
      </div>
  );
}

export default WeatherCard;
