<template>
  <div id="app">
    <!-- <Login/> -->
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <!-- <a class="navbar-brand" href="#">Expand at md</a> -->
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExample04">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about">About</router-link>
          </li>
          <!-- <li class="nav-item">
            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
          </li> -->
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Projects</a>
            <div class="dropdown-menu" aria-labelledby="dropdown04">
              <router-link class ="dropdown-item" to="/guide">Guide</router-link>
              <router-link class ="dropdown-item" to="/weatherapp">WeatherApp</router-link>
            </div>
          </li>
          <Login/>
        </ul>
        <!-- <form class="form-inline my-2 my-md-0">
          <input class="form-control" type="text" placeholder="Search">
        </form> -->
      </div>
    </nav>
    <!-- <nav id="nav">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/about">About</router-link></li>
        <li><router-link to="/guide">Guide</router-link></li>
        <li><router-link to="/weatherapp">WeatherApp</router-link></li>
      </ul>
    </nav> -->
    <router-view/>
  </div>
</template>

<script>
import Login from '@/components/Login.vue';
export default {
  // created() {
  //   window.addEventListener(
  //     'resize',
  //     this.$store.commit('setWindowWidth')
  //   )
  // },
  // watch: {
  //   windowWidth: function() {
  //     if (this.windowWidth === 768) {
  //       console.log('The window width is 768px');
  //     }
  //   }
  // }
  components: {
    Login
  }
}
</script>

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
  min-height: 100vh;
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
    display:block;
    padding: 0.5rem 0.5rem;

    color: rgba(255,255,255,.5);
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
    }
    &:hover {
      text-decoration: none;
      color: rgba(255,255,255,.75);
      background-color: #333;
    }
  }
}
</style>
