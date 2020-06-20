<template>
  <div id="app">
    <nav id="nav">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/about">About</router-link></li>
        <li><router-link to="/guide">Guide</router-link></li>
        <li><router-link to="/weatherapp">WeatherApp</router-link></li>
      </ul>
    </nav>
    <router-view/>
  </div>
</template>


<style lang="scss">
$backgroundC: #333;
$navBackground: #ccc;

body {
  margin: 0;
}
#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: $backgroundC;

  position: relative;
}

nav {
  padding: 30px;
  font-size:16px;
  background-color: $navBackground;

  ul {
    list-style: none;
    display: flex;
  }

  li {
    padding: 10px 10px;
  }

  a {
    padding: 10px 10px;
    color: #2c3e50;
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
    }
    &:hover {
      background-color: #bbb;
    }
  }
}
</style>
