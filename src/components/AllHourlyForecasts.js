import React from 'react';
import './AllHourlyForecasts.scss'
class AllHourlyForecasts extends React.Component{
    render(){
        
        const allForecastItems= this.props.allForecasts.map((f,i)=>{
            const key=`all-forecast-item_${i}`;
            const url=`http://openweathermap.org/img/wn/${f.weather[0].icon}@2x.png`;
            let hour= new Date(f.dt*1000).getHours();
            let timeNotation ='AM';
            //let currentDate= new Date(f.dt*1000).getDate();
            if(hour >12){
                hour=hour-12;
                timeNotation='PM';
            }
            return (
                <div className="all-forecast-item" key={key}>
                    <p className="all-forecast-item_hour">
                        {hour}:00{timeNotation}
                       
                    </p>
                    <p className="all-forecast-item_temp">
                        {f.main.temp}{'\u00b0'}F
                    </p>    
                    <img src={url} alt={f.weather[0].description}/>
                    <p className="all-forecast-item_description">
                        {f.weather[0].main} {f.dt_txt}
                    </p>
                </div>
            )

        })
        return(
            <div className="all-forecast">
                <h4 className="all-forecast-title">All Hourly Forecasts</h4>
                <div className="all-forecast-items">
                {allForecastItems}</div>
            </div>    
        );
    }
}
export default AllHourlyForecasts;