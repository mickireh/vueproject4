import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'
import 'firebase/auth'
import store from './store'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

// global css
import './assets/columns.css'

Vue.config.productionTip = false

// get from seperate file config.js, .gitignore that config,
// because of security issues when pushing, thx github
const firebaseConfig = {
  apiKey: "AIzaSyDOLLUAM17atS9VLfgfQqLPVRcFtDpy4mM",
  authDomain: "mickireh.firebaseapp.com",
  databaseURL: "https://mickireh.firebaseio.com",
  projectId: "mickireh",
  storageBucket: "mickireh.appspot.com",
  messagingSenderId: "889432768760",
  appId: "1:889432768760:web:7872a5f4b28612f7263b0d",
  measurementId: "G-MR6RKXS4FE"
};

firebase.initializeApp(firebaseConfig);


firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

let app;

// firebase.auth before creating app to have user before; refreshing page issues when logged in
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
});


// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')



