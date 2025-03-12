import React from 'react';
import './DailyForecast.scss'
var moment = require('moment');

class DailyForecast extends React.Component{
    render(){
        var n=5;
        const dailyForecastItems = this.props.weekForecast.slice(1,n).map((df,i)=>{
            const key=`daily-forecast-item_${i}`;
            const url=`http://openweathermap.org/img/wn/${df.weather[0].icon}@2x.png`;
            let newDate = new Date();
            const weekDay= df.dt*1000;
            newDate.setTime(weekDay);

            return(
                <div className="daily-forecast-item" key={key}>
                    <div className="daily-forecast-item_color">
                        <p className="daily-forecast-item_day">
                        {moment(newDate).format('dddd')}
                        </p>
                        <p className="daily-forecast-item_date">
                        {moment(newDate).format('MMMM Do')}
                        </p>
                        <p className="daily-forecast-item_mintemp">
                     Low: {df.temp.min}{'\u00b0'}F
                        </p>  
                        <p className="daily-forecast-item_maxtemp">
                        High: {df.temp.max}{'\u00b0'}F
                        </p>  
                        <img src={url} alt={df.weather[0].description}/>
                        <p className="daily-forecast-item_description">
                            {df.weather[0].main}
                        </p>
                    </div>
                </div>
            )

        })
       
        return(
            <div className="daily-forecast">
                <div className="daily-forecast-items">
                    {dailyForecastItems}
                </div>    
            </div>
            )
    }
    
}

export default DailyForecast;