import axios from 'axios';
import React from 'react';
import './CurrentWeather.scss';
class CurrentWeather extends React.Component{
    render(){
        let img;
        if(this.props.icon){
        const url=`http://openweathermap.org/img/wn/${this.props.icon}@2x.png`;
            img=(<img className="current-weather_icon" src={url} alt={this.props.description}/>);
        }
        return(
            <div className="current-weather">
                <div className="current-weather_content">
                    <div className="current-weather_text">
                   
                      <p className="current-weather_name">Today</p>
                      <p className="current-weather_temp">
                     {this.props.currentTemperature}{'\u00b0'}F
                        </p>
                        <p className="current-weather_mintemp">
                    Low :   {this.props.minimumTemp}{'\u00b0'}F 
                        </p>
                        <p className="current-weather_maxtemp">
                    High:   {this.props.maximumTemp}{'\u00b0'}F 
                        </p>
                        </div>
                        <div>
                          {img}
                        {/*                               
                        <p className="current-weather_feels-like">
                       Feels Like {this.props.feelsLike}
                        </p>
                        */}
                        <p className="current-weather_description">
                       {this.props.description}
                        </p>
                        </div>
                </div> 
            </div>
        )
    }
}

export default CurrentWeather;