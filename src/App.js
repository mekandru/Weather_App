import React from 'react';
import {Route, NavLink, HashRouter, Switch} from 'react-router-dom';
import './App.scss';
import Search from './components/Search';
import CurrentWeather from './components/CurrentWeather';
import {getCurrentWeather,getDailyForecast,getForecast,getAllHourlyForecasts} from './apis/OpenWeather'
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import AllHourlyForecasts from './components/AllHourlyForecasts'
import Day1 from './components/Day1';
import Day2 from './components/Day2';
import Day3 from './components/Day3';
import Day4 from './components/Day4'

//import * as Datetime from "react-datetime";

//var moment=require('moment');
//since main component has to render the state move content from Search to App 
class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
        location:'Redmond',
        timezone: "",
        temp:"",
        minTemp:"",
        maxTemp:"",
        feelsLike:"",
        description:"",
        icon:"",
        //currentDate:new(Datetime.Date),
        dailyForecast:[],
        hourlyForecast:[],
        allHourlyForecasts:[]
    };
    
} 
componentDidMount(){
  this.onFormSubmit();
}

onInputChange(e){
  this.setState({
      location:e.target.value
  });

}

async onFormSubmit(){
  const weatherResponse = await getCurrentWeather(this.state.location);
  //e.preventDefault();// helps us to not refresh the page when enter is pressed
/*
   let currentDate = new Date();
   const weekDay = weatherResponse.data.dt*1000;
   currentDate.setTime(weekDay);*/

   const lat= weatherResponse.data.coord.lat;
    const lon= weatherResponse.data.coord.lon;
    const forecastResponse = await getForecast(lat,lon);
    const dailyForecastRes = await getDailyForecast(lat,lon); 
    const allHourlyForecastsRes = await getAllHourlyForecasts(lat,lon);
     //inorder to update temp to ui
     this.setState({
       // Shift in seconds from UTC 
         timezone:weatherResponse.data.timezone,
         temp:weatherResponse.data.main.temp,
         minTemp:weatherResponse.data.main.temp_min,
         maxTemp:weatherResponse.data.main.temp_max,
         feelsLike:weatherResponse.data.main.feels_like,
         description:weatherResponse.data.weather[0].main,
         icon:weatherResponse.data.weather[0].icon,
         //currentDate:currentDate,
         dailyForecast:dailyForecastRes.data.daily,
         hourlyForecast:forecastResponse.data.hourly,
         allHourlyForecasts:allHourlyForecastsRes.data.list      
     })
 
  //to access lat and lon inside of getForecast() use async and await for getCurrentWeather so that u don't get undefined

}

  render(){
  return (
    <div className="App">
       <h1>WEATHER APP</h1>
      <header className="App-header">
        
        <Search location={this.state.location} inputChange={(e)=>this.onInputChange(e)} formSubmitted= {()=>this.onFormSubmit()}/>
        <div className="week-cards">
        <CurrentWeather currentTemperature={this.state.temp} minimumTemp={this.state.minTemp}  maximumTemp={this.state.maxTemp} feelsLike={this.state.feelsLike} description={this.state.description}
                    icon={this.state.icon} />            
        <DailyForecast weekForecast={this.state.dailyForecast}/>
        </div>
        <HashRouter>
                <div>
                    <div>
                        <ul className='header'>
                            <li><NavLink to = "/today">Today</NavLink></li>
                            <li><NavLink to = "/day1">Day1</NavLink></li>
                            <li><NavLink to = "/day2">Day2</NavLink></li>
                            <li><NavLink to = "/day3">Day3</NavLink></li>
                            <li><NavLink to = "/day4">Day4</NavLink></li>
                        </ul>
                    </div>
                    <div className='content'>
                        <Switch>
                          {/*You can spread props to make them available to your rendered Component */}
                        <Route exact path="/today" render={(props)=>(
                          <HourlyForecast {...props} forecast={this.state.hourlyForecast} currentTimeZone={this.state.timezone} />
                        )}  
                        />
                        <Route path="/day1" render={(props)=>(
                            <Day1 {...props} allForecasts={this.state.allHourlyForecasts}/>
                        )} />
                         <Route path="/day2" render={(props)=>(
                            <Day2 {...props} allForecasts={this.state.allHourlyForecasts}/>
                        )} />
                        <Route path="/day3" render={(props)=>(
                            <Day3 {...props} allForecasts={this.state.allHourlyForecasts}/>
                        )} />
                         <Route path="/day4" render={(props)=>(
                            <Day4 {...props} allForecasts={this.state.allHourlyForecasts}/>
                        )} />
                        </Switch>
                        
                    </div>
                </div>
            </HashRouter>
     
{/*
        <HourlyForecast forecast={this.state.hourlyForecast}/>
        <AllHourlyForecasts allForecasts={this.state.allHourlyForecasts}/>
*/}
      </header>
    </div>
  );
}
}

export default App;
