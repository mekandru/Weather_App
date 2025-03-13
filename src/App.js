import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'; // Changed import
import './App.scss';
import Search from './components/Search';
import CurrentWeather from './components/CurrentWeather';
import { getCurrentWeather, getDailyForecast, getForecast, getAllHourlyForecasts } from './apis/OpenWeather';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import Day1 from './components/Day1';
import Day2 from './components/Day2';
import Day3 from './components/Day3';
import Day4 from './components/Day4';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: 'Redmond',
            timezone: "",
            temp: "",
            minTemp: "",
            maxTemp: "",
            feelsLike: "",
            description: "",
            icon: "",
            dailyForecast: [],
            hourlyForecast: [],
            allHourlyForecasts: []
        };
    }

    componentDidMount() {
        this.onFormSubmit();
    }

    onInputChange(e) {
        this.setState({
            location: e.target.value
        });
    }

    async onFormSubmit() {
        try {
            const weatherResponse = await getCurrentWeather(this.state.location);

            const lat = weatherResponse.data.coord.lat;
            const lon = weatherResponse.data.coord.lon;
            const forecastResponse = await getForecast(lat, lon);
            const dailyForecastRes = await getDailyForecast(lat, lon);
            const allHourlyForecastsRes = await getAllHourlyForecasts(lat, lon);

            this.setState({
                timezone: weatherResponse.data.timezone,
                temp: weatherResponse.data.main.temp,
                minTemp: weatherResponse.data.main.temp_min,
                maxTemp: weatherResponse.data.main.temp_max,
                feelsLike: weatherResponse.data.main.feels_like,
                description: weatherResponse.data.weather[0].main,
                icon: weatherResponse.data.weather[0].icon,
                dailyForecast: dailyForecastRes.data.daily,
                hourlyForecast: forecastResponse.data.hourly,
                allHourlyForecasts: allHourlyForecastsRes.data.list
            });
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    render() {
        return (
            <div className="App">
                <h1>WEATHER APP</h1>
                <header className="App-header">

                    <Search location={this.state.location} inputChange={(e) => this.onInputChange(e)} formSubmitted={() => this.onFormSubmit()} />
                    <div className="week-cards">
                        <CurrentWeather currentTemperature={this.state.temp} minimumTemp={this.state.minTemp} maximumTemp={this.state.maxTemp} feelsLike={this.state.feelsLike} description={this.state.description}
                            icon={this.state.icon} />
                        <DailyForecast weekForecast={this.state.dailyForecast} />
                    </div>
                    <BrowserRouter> {/* Changed to BrowserRouter */}
                        <div>
                            <div>
                                <ul className='header'>
                                    <li><NavLink to="/today">Today</NavLink></li>
                                    <li><NavLink to="/day1">Day1</NavLink></li>
                                    <li><NavLink to="/day2">Day2</NavLink></li>
                                    <li><NavLink to="/day3">Day3</NavLink></li>
                                    <li><NavLink to="/day4">Day4</NavLink></li>
                                </ul>
                            </div>
                            <div className='content'>
                                <Routes> {/* Changed to Routes */}
                                    {/*You can spread props to make them available to your rendered Component */}
                                    <Route path="/today" element={<HourlyForecast forecast={this.state.hourlyForecast} currentTimeZone={this.state.timezone} />} /> {/* Changed to element */}
                                    <Route path="/day1" element={<Day1 allForecasts={this.state.allHourlyForecasts} />} /> {/* Changed to element */}
                                    <Route path="/day2" element={<Day2 allForecasts={this.state.allHourlyForecasts} />} /> {/* Changed to element */}
                                    <Route path="/day3" element={<Day3 allForecasts={this.state.allHourlyForecasts} />} /> {/* Changed to element */}
                                    <Route path="/day4" element={<Day4 allForecasts={this.state.allHourlyForecasts} />} /> {/* Changed to element */}
                                </Routes>

                            </div>
                        </div>
                    </BrowserRouter>


                </header>
            </div>
        );
    }
}

export default App;
