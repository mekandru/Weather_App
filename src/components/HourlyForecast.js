import React from 'react';
import './HourlyForecast.scss'
var moment = require('moment');
class HourlyForecast extends React.Component{
    render(){
       
    const currentTimeZone = this.props.currentTimeZone;

    const forecastItems= this.props.forecast
    .filter(name=>
        (moment(new Date().setTime(name.dt*1000))).format("MM/DD/YYYY") === moment().format("MM/DD/YYYY") && (moment(new Date().setTime(name.dt*1000))).hours() >= moment.utc().add(currentTimeZone, 'seconds').hours())
    .map((f,i)=>{
        const key=`forecast-item_${i}`;
            const url=`http://openweathermap.org/img/wn/${f.weather[0].icon}@2x.png`;
            let hour= new Date(f.dt*1000).getHours();
            let timeNotation ='AM';
            if(hour >12){
                hour=hour-12;
                timeNotation='PM';
            }
            let newDate = new Date();
            const weekDay= f.dt*1000;
            newDate.setTime(weekDay);
            console.log('hey'+moment(newDate).format("MM/DD/YYYY"));
            var now=moment().format("MM/DD/YYYY");
            console.log(now);

            return (
                <div className="forecast-item" key={key}>
                    <p className="forecast-item_hour">
                        {/*
                        {hour}:00{timeNotation}
                        */}
                        <br/>
                        {moment(newDate).format('dddd')}
                        <br/>
                        {moment(newDate).format('MMMM Do h:mm a')}
                    </p>
                    <p className="forecast-item_temp">
                        {f.temp}{'\u00b0'}F
                    </p>    
                    <img src={url} alt={f.weather[0].description}/>
                    <p className="forecast-item_description">
                        {f.weather[0].main}
                    </p>
                </div>
            )

        })
        return(
            <div className="forecast">
                <h4 className="forecast-title">Hourly Forecasts</h4>
                <div className="forecast-items">
                {forecastItems}</div>
            </div>    
        );
    }
} 
export default HourlyForecast;