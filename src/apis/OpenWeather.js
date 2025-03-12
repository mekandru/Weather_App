import axios from 'axios';
//for api key to be accessible preceed it with react_app in env file

axios.defaults.baseURL='http://api.openweathermap.org/data/2.5/';
const appIdParam = `appid=${process.env.REACT_APP_API_KEY}`;
//current weather
function getCurrentWeather(location){
 return axios.get(`weather?q=${location}&units=imperial&${appIdParam}`);
};
//4 days data
function getDailyForecast(lat,lon){
    return axios.get(`onecall?lat=${lat}&lon=${lon}&exclude=current,hourly,minutely,alerts&units=imperial&${appIdParam}`)
}
//current weather hourly data
function getForecast(lat,lon){
    return axios.get(`onecall?lat=${lat}&lon=${lon}&units=imperial&${appIdParam}`)
}
//4 days hourly data
function getAllHourlyForecasts(lat,lon){
    return axios.get(`forecast?lat=${lat}&lon=${lon}&units=imperial&${appIdParam}`)
}

export {
    getCurrentWeather,
    getDailyForecast,
    getForecast,
    getAllHourlyForecasts
}

