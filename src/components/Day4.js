import React from 'react';
import './AllHourlyForecasts.scss'
var moment = require('moment');
class Day4 extends React.Component{
    render(){
        
        const allForecastItems= this.props.allForecasts
        .filter(name=>(moment(new Date().setTime(name.dt*1000))).format("MM/DD/YYYY") === moment().add(4,'days').format("MM/DD/YYYY"))
        .map((f,i)=>{
            const key=`all-forecast-item_${i}`;
            const url=`http://openweathermap.org/img/wn/${f.weather[0].icon}@2x.png`;
            
            console.log(moment(new Date().setTime(f.dt*1000)).format("MM/DD/YYYY"));
            let hour= new Date(f.dt*1000).getHours();
            let timeNotation ='AM';
            //let currentDate= new Date(f.dt*1000).getDate();
            
            if(hour >12){
                hour=hour-12;
                timeNotation='PM';
            }
            let newDate = new Date();
            const weekDay= f.dt*1000;
            newDate.setTime(weekDay);

            return (
                <div className="all-forecast-item" key={key}>
                    <p className="all-forecast-item_hour">
                         {/* {hour}:00{timeNotation}*/}
                       <br/>
                        {moment(newDate).format('dddd')}
                        <br/>
                        {moment(newDate).format('MMMM Do h:mm a')}
                       
                    </p>
                    <p className="all-forecast-item_temp">
                        {f.main.temp}{'\u00b0'}F
                    </p>    
                    <img src={url} alt={f.weather[0].description}/>
                    <p className="all-forecast-item_description">
                        {f.weather[0].main} 
                        <br/>
                        </p>
                        <p className="all-forecast-item_description">
                       {/*moment(new Date().setTime(f.dt*1000)).format("MM/DD/YYYY")*/}
                    </p>
                </div>
            )

        })
        return(
            <div className="all-forecast">
                <h4 className="all-forecast-title">Hourly Forecasts</h4>
                <div className="all-forecast-items">
                {allForecastItems}</div>
            </div>    
        );
    }
}
export default Day4;