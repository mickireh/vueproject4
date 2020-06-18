<template>
  <div class="home">
    <Login />
    <div class="clear wrapper">
      <div class="col2">
          <img alt="Vue logo" src="../assets/logo.png" class="imageSpin">
      </div>
      <div class="col2">
          <img alt="Vue logo" src="../assets/firebaselogo.png" class="imageSpin" height="200">
      </div>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import Login from '@/components/Login.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
    Login
  }
}
</script>

<style lang="scss" scoped>
@keyframes spin {
  from{
    transform: rotateY(0deg);
    -moz-transform: rotateY(0deg); //Firefox
    -ms-transform: rotateY(0deg); //Microsoft Browsers
  }
  to{
    transform: rotateY(360deg);
    -moz-transform: rotateY(360deg); //Firefox
    -ms-transform: rotateY(360deg); //Microsoft Browsers
  }
}
@-webkit-keyframes spin{
  from{-webkit-transform: rotateY(0deg);}
  to{-webkit-transform: rotateY(360deg);}
}
.imageSpin{
  animation-name: spin;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-duration: 8s;
  -webkit-animation-name: spin;
  -webkit-animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-duration: 8s;
}
</style>
