<template>
    <div class="weatherApp">
        <div class="search-box">
            <input type="text" class="weather_search" placeholder="Enter City...">
        </div>
        
    </div>
</template>

<script>
    export default {
        name: 'WeatherApp',
        data() {
            return {
                api_key:'b0d730e2ac94cd220ea9e5f67fa131a4'
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>