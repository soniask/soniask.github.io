var API_KEY = "ef3e6617063eeabd6a12e4884048fe73";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            saved: []
        };
    }

    componentDidMount() {
        var savedWeatherJSON = localStorage.getItem('savedWeather');
        var savedWeather = JSON.parse(savedWeatherJSON);

        if(savedWeather.length>0) {
            this.setState({
                saved: savedWeather
            });
            this.searchWeather(savedWeather[0]);
        }
    }

    render() {
        return (
            <div className="container">
                <h1>My Weather App</h1>
                <div className="row">
                    <div className="col-sm-6">

                        <WeatherSearch
                            search={(location) => this.searchWeather(location)}
                        />

                        {
                            this.state.error ? (
                                <p className="alert alert-danger" >{this.state.error}</p>
                            ) : null
                        }

                        {
                            this.state.location ? (
                                <WeatherCurrent
                                    location={this.state.location}
                                    icon={this.state.icon}
                                    temperature={this.state.temperature}
                                    description={this.state.description}
                                    onSave={(location) => this.saveWeather(location)}
                                />
                            ) : null
                        }
                    </div>
                    {
                        this.state.saved.length ? (
                            <div className="col-sm-6">
                                <WeatherSaved
                                    saved={this.state.saved}
                                    onClick={(location) => this.searchWeather(location)}
                                    onRemoveClick={(location) => this.removeWeather(location)}
                                />
                            </div>
                        ) : null
                    }
                </div>
            </div>
        );
    }

    searchWeather(location) {
        this.setState({error: undefined});
        var url = "https://www.bell-towne.com/api/weather/?q="+location+"&units=imperial&APPID="+API_KEY;

        fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((json) => {

            if(json.cod == 200){
                var location = json.name;
                var icon = "http://openweathermap.org/img/w/" + json.weather[0].icon + ".png";
                var temperature = Math.round(json.main.temp);
                var description = json.weather[0].main+" ("+json.weather[0].description+")";
                
                this.setState({
                    location: location,
                    icon: icon,
                    temperature: temperature,
                    description: description
                });
            } else {
                this.setState({error: "Error: Invalid input"});
            }


        });
    }

    saveWeather(location){
        var saved = this.state.saved;

        if(saved.indexOf(location) < 0) {
            saved.push(location);

            this.setState({
                saved: saved
            });

            var savedJson = JSON.stringify(saved);
            localStorage.setItem('savedWeather', savedJson);
        }
    }

    removeWeather(location){
        var saved = this.state.saved;
        var index = saved.indexOf(location);
        saved.splice(index, 1);
        this.setState({
            saved: saved
        });

        var savedJson = JSON.stringify(saved);
        localStorage.setItem('savedWeather', savedJson); 
    }
}

var app = document.getElementById('app');

ReactDOM.render(<App />, app);
