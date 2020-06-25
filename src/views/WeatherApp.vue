<template>
<div class="weatherApp">
    <div class="container">
        <h1 class="pt-2">Weather Api</h1>
        <p>provided by <a href="https://openweathermap.org/">openweathermap.org</a></p>
        <div>
            <div class="search-box form-label-group">
                <input
                    id="enterCity"
                    type="text"
                    class="weather_search form-control"
                    placeholder="Enter City..."
                    v-model="query"
                    v-on:keypress="fetchWeather"
                >
                <label for="enterCity">Enter City...</label>
            </div>
            <div class="weather-wrap pt-2" v-if="typeof weather.main != 'undefined'">
                <div class="location-box">
                    <div class="location">{{weather.name}}, {{weather.sys.country}}</div>
                    <div class="date">{{ getDate() }}</div>
                </div>

                <div class="weather-box">
                    <div class="temp">{{ Math.round(weather.main.temp)}}°C</div>
                    <div class="weather">{{weather.weather[0].main}}</div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import $ from 'jquery';
    export default {
        name: 'WeatherApp',
        data() {
            return {
                api_key:'b0d730e2ac94cd220ea9e5f67fa131a4',
                url_base: 'https://api.openweathermap.org/data/2.5/',
                query: '',
                weather: {},
                imageClasses: [
                    'clear',
                    'clouds',
                    'rain',
                    'snow'
                ]
            }
        },
        methods: {
            fetchWeather (e) {
                if(e.key == "Enter") {
                    if (this.query.trim() === '') {
                        // console.log('empty');
                        this.weather = {};
                        this.setBackground();
                    } else {
                        fetch(`${this.url_base}weather?q=${this.query}&units=metric&APPID=${this.api_key}`)
                        .then(response => {
                            if (response.ok) {
                                return this. weather = response.json();
                            } else {
                                // throw new Error('Something went wrong');
                                return Promise.reject();
                                // console.log('response');
                                // return;
                                
                            }
                            // console.log(response);
                            // return response.json();
                            // return this. weather = response.json();
                        // }).then(this.setResults);
                        }).then( data => {
                            // console.log('Success:', data);
                            this.setResults(data);
                            
                        }).catch(() => {
                            console.error('Error: City not found');
                        });
                    }

                    // console.log('ok');
                }
                
            },
            setResults (results) {
                this.weather = results;
                // console.log(this.weather);
                this.setBackground();
            },
            getDate () {
                var date = new Date;
                return date.toDateString();
            },
            setBackground() {
                var weatherAppDiv = $('.weatherApp');
                $.each(this.imageClasses, function (indexInArray, valueOfElement) {
                     weatherAppDiv.removeClass(valueOfElement);
                });
                if (!($.isEmptyObject(this.weather))) {
                    if (this.weather.weather[0].main === 'Clouds') {
                        weatherAppDiv.addClass('clouds');
                    } else if (this.weather.weather[0].main === 'Rain'){
                        weatherAppDiv.addClass('rain');
                    } else if (this.weather.weather[0].main === 'Clear'){
                        weatherAppDiv.addClass('clear');
                    } else if (this.weather.weather[0].main === 'Snow'){
                        weatherAppDiv.addClass('snow');
                    }
                }

            }
        }
    }
</script>

<style lang="scss" scoped>
h1, p {
    color:rgba($color: #fff, $alpha: .75)
}

.weatherApp {
    min-height: calc(100vh - 106px);
    font-family: 'Montserrat', sans-serif;
    // background-image: url('../assets/clouds.jpg');
    background-size:cover;
}
.clouds {
    background-image: url('../assets/clouds.jpg');
}
.rain {
    background-image: url('../assets/rain.jpg');
}
.clear {
    background-image: url('../assets/clear.jpg');
}
.snow {
    background-image: url('../assets/snow.jpg');
}

.search-box {
    width: 80%;
    margin: 30px auto;

    input {
        font-family: 'Montserrat', sans-serif;
        color: #444;
        padding:10px;
        font-size: 40px;
        border-radius: 5px;
        opacity: .9;
    }
}

.weather-wrap {
    background-color: rgba($color: #fff, $alpha: .25);
    border-radius: 10px;
    display: inline-block;
}

.location-box {
    color: #eee;
    .location {
        font-size: 32px;
        text-shadow: 1px 3px rgba($color: #000000, $alpha: .25);
    }
}

.weather-box {
    color: #eee;
    text-shadow: 3px 6px rgba($color: #000000, $alpha: .25);
    .temp {
        display:inline-block;
        font-size: 60px;
        font-weight:600;
        padding: 10px 25px;
        margin: 20px 0px;

        // background-color: rgba($color: #fff, $alpha: .25);
        // border-radius: 10px;
    }
    .weather {
        font-size: 32px;

    }
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}


.form-label-group > label {
//   height: 3.125rem;
  padding: .95rem;
}

.form-label-group > label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  margin-bottom: 0; /* Override default `<label>` margin */
  line-height: 1.5;
  font-size: 27px;
  color: #495057;
  pointer-events: none;
  cursor: text; /* Match the input under the label */
  border: 1px solid transparent;
  border-radius: .25rem;
  transition: all .1s ease-in-out;
}

.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}

.form-label-group input:-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-moz-placeholder {
  color: transparent;
}

.form-label-group input::placeholder {
  color: transparent;
}

.form-label-group input:not(:placeholder-shown) {
  padding-top: 1.25rem;
  padding-bottom: .25rem;
}

.form-label-group input:not(:placeholder-shown) ~ label {
  padding-top: .25rem;
  padding-bottom: .25rem;
  font-size: 14px;
  color: #777;
}
</style>