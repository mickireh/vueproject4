<template>
    <div class="weatherApp">
        <Login />
        <div class="search-box">
            <input
                type="text"
                class="weather_search"
                placeholder="Enter City..."
                v-model="query"
                v-on:keypress="fetchWeather"
            >
        </div>
        <div class="weather-wrap">
            <div class="location-box">
                <div class="location">Hamburg, Ger</div>
                <div class="date">Saturday 6 June 2020</div>
            </div>

            <div class="weather-box">
                <div class="temp">13°C</div>
                <div class="weather">Sunny</div>
            </div>
        </div>
        
    </div>
</template>

<script>
import Login from '@/components/Login.vue'

    export default {
        name: 'WeatherApp',
        data() {
            return {
                api_key:'b0d730e2ac94cd220ea9e5f67fa131a4',
                url_base: 'https://api.openweathermap.org/data/2.5/',
                query: '',
                weather: {}
            }
        },
        methods: {
            fetchWeather (e) {
                if(e.key == "Enter") {
                    fetch(`${this.url_base}weather?q=${this.query}&units=metric&APPID=${this.api_key}`)
                    .then(response => {
                        return response.json();
                    }).then(this.setResults);
                    console.log('ok');
                }
                
            },
            setResults (results) {
                this.weather = results;
                // console.log(this.weather);
            }
        },
        components: {
            Login
        }
    }
</script>

<style lang="scss" scoped>
.weatherApp {
    min-height: calc(100vh - 161px);
    font-family: 'Montserrat', sans-serif;
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
    }
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

        background-color: rgba($color: #fff, $alpha: .25);
        border-radius: 10px;
    }
    .weather {
        font-size: 32px;

    }
}
</style>