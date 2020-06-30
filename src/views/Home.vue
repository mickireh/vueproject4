<template>
  <div class="home">
    <!-- <div class="clear wrapper"> -->
      <!-- <div class="col2">
          <img alt="Vue logo" src="../assets/logo.png" class="imageSpin">
      </div>
      <div class="col2">
          <img alt="Vue logo" src="../assets/firebaselogo.png" class="imageSpin" height="200">
      </div> -->
      <!-- <div class="col3">
          <img alt="Vue logo" src="../assets/bootstrap-stack.png" class="imageSpin" height="200">
      </div> -->
    <!-- </div> -->

    <div id="myCarousel" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
        <li data-target="#myCarousel" data-slide-to="1"></li>
        <li data-target="#myCarousel" data-slide-to="2"></li>
        <li data-target="#myCarousel" data-slide-to="3"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <!-- <svg class="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img"><rect width="100%" height="100%" fill="#777"/></svg> -->
          <div class="container">
            <div class="carousel-caption text-left clear wrapper">
              <div class="col2 align-center">
                <img alt="Vue logo" src="../assets/logo.png" class="imageSpin">
              </div>
              <div class="col2">
                <h1>Vue.js</h1>
                <p>Vue (pronounced /vjuː/, like view) is a progressive framework for building user interfaces. Unlike other monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable.</p>
                <p><a class="btn btn-lg btn-vue" href="https://vuejs.org/" role="button" target="_blank">Vuejs.org</a></p>
              </div>
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <!-- <svg class="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img"><rect width="100%" height="100%" fill="#777"/></svg> -->
          <div class="container">
            <div class="carousel-caption clear wrapper">
              <div class="col2">
                <img alt="Firebase logo" src="../assets/firebaselogo.png" class="imageSpin" height="200">
              </div>
              <div class="col2">
                <h1>Firebase</h1>
                <p>Build apps fast, without managing infrastructure</p>
                <p><a class="btn btn-lg btn-firebase" href="https://firebase.google.com/" role="button" target="_blank">firebase.com</a></p>
              </div>
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <!-- <svg class="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img"><rect width="100%" height="100%" fill="#777"/></svg> -->
          <div class="container">
            <div class="carousel-caption text-right clear wrapper">
              <div class="col2">
                <h1>Bootstrap</h1>
                <p>Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
                <p><a class="btn btn-lg btn-bootstrap" href="https://getbootstrap.com/" role="button" target="_blank">Bootstrap.com</a></p>
              </div>
              <div class="col2 align-center">
                <img alt="Bootstrap logo" src="../assets/bootstrap-stack.png" height="200">
              </div>
            </div>
          </div>
        </div>
        <div class="carousel-item background-stag">
          <!-- <svg class="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img"><rect width="100%" height="100%" fill="#777"/></svg> -->
          <div class="container ">
            <div class="carousel-caption carousel-about">
              <!-- <h1 class="text-secondary">About me</h1> -->
              <!-- <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p> -->
              <p><router-link to="/about" class="btn btn-lg btn-about" role="button">About me</router-link></p>
            </div>
          </div>
        </div>
      </div>
      <a class="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>

    <HelloWorld msg="Welcome to Your Vue.js App"/>
    
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';


export default {
  name: 'Home',
  components: {
    HelloWorld
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

.carousel-item {
  height: 24rem;
}
.carousel-item > img {
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  height: 32rem;
}
.carousel-caption {
  position: absolute;
  // right: (100% - $carousel-caption-width) / 2;
  bottom: 20px;
  // left: (100% - $carousel-caption-width) / 2;
  z-index: 10;
  padding-top: 20px;
  padding-bottom: 4rem;
  // color: $carousel-caption-color;
  text-align: center;
}
.align-center {
  text-align: center !important;
}
.btn-vue {
  background-color: #42b983;
}
.btn-vue:hover {
  background-color: #2c3e50;
  color: #42b983;
}
.btn-firebase {
  background-color: #ffcc2f;
}
.btn-firebase:hover {
  background-color: #f5820c;
}
.btn-bootstrap {
  background-color: #7844c5;
}
.btn-bootstrap:hover {
  background-color: #341463;
  color: #eee;
}
.btn-about {
  background-color: #ccc;
  opacity: .65;
}
.btn-about:hover {
  background-color: #42281f;
  color:#eee;
  opacity: .65;
}
.background-stag {
  background-image: url('../assets/hirsch.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
.carousel-about {
  padding-bottom: 12.8rem !important;
}
@media screen and (max-width:767px) {
  .carousel-caption {
    // position: static;
    padding-bottom:20px;
  }
  .text-right, .text-left {
    text-align: center !important;
  }
  .carousel-item {
    min-height: 35rem;
  }
}
</style>
