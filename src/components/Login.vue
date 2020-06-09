<template>
    <div>
        <div class="UserLogging">
            <ul>
                <li class="UserEmail" v-if="loggedIn == true">{{ this.user }}</li>
                <li v-on:click="logout" v-if="loggedIn == true">Logout</li>
                <li v-on:click="showLogin" v-if="loggedIn == false">Login</li>
                <li v-on:click="showSignup" v-if="loggedIn == false">Signup</li>
            </ul>
        </div>

        <div id="loginForm" class="hide">
            <form>
                <label for="loginEmail">Email</label>
                <input id="loginEmail" type="email" v-model="loginEmail">
                <label for="loginPassword">Password</label>
                <input id="loginPassword" type="password" v-model="loginPassword">
                <button @click="loginbtn">Login</button>
            </form>
        </div>
        <div id="signupForm" class="hide">
            <form>
                <label for="signupEmail">Email</label>
                <input id="signupEmail" type="email" v-model="signupEmail">
                <label for="signupPassword">Password</label>
                <input id="signupPassword" type="password" v-model="signupPassword">
                <button @click="signupbtn">Sign up</button>
            </form>
        </div>
       
    </div>
</template>

<script>
import $ from 'jquery';
import firebase from 'firebase';
import 'firebase/auth';

export default {
    created() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.loggedIn = true;
                this.user = firebase.auth().currentUser.email;
                // console.log(firebase.auth().currentUser.email);
            } else {
                this.loggedIn = false;
            }
        })
    },
    data() {
        return {
            error: '',
            signupEmail: '',
            signupPassword: '',
            loginEmail: '',
            loginPassword: '',
            loggedIn: false,
            user: ''
        }
    },
    methods: {
        showSignup: () => {
            var signupForm = $('#signupForm');
            signupForm.toggleClass('hide');
            var loginForm = $('#loginForm');
            loginForm.addClass('hide');
        },
        signupbtn: function() {
            // cuz of scoping vm(view-model to this)
            // var vm = this;
            firebase.auth().createUserWithEmailAndPassword(this.signupEmail, this.signupPassword)
            // no arrow functions here
            .then(function(user) {
                console.log(user);
                console.log(firebase.auth().currentUser);

                // vm.loggedIn = true;

                var signupForm = $('#signupForm');
                signupForm.addClass('hide');
            },
            function(err) {
                console.log(err.message);
            }
            );
        },
        showLogin: () => {
            var loginForm = $('#loginForm');
            loginForm.toggleClass('hide');

            var signupForm = $('#signupForm');
            signupForm.addClass('hide');
        },
        loginbtn: function() {

            var vm = this;
            firebase.auth().signInWithEmailAndPassword(this.loginEmail, this.loginPassword)
            .then(function() {
                // console.log(user);
                // console.log(firebase.auth().currentUser);
                // vm.loggedIn = true;
                var loginForm = $('#loginForm');
                loginForm.addClass('hide');
            },
            function(err) {
                if (vm.loginEmail === '') {
                    err.message = 'empty';
                    // console.log('err.message');
                }
                console.log(err.message);
                // console.log(err);
            });
        },
        logout: function() {
            // var vm = this;
            firebase.auth().signOut()
            .then(function() {
                // console.log(firebase.auth().currentUser);
                // vm.loggedIn = false;
            },
            function(err) {
                console.log(err.message);
            });
            
        }
    }
}
</script>

<style scoped lang="scss">
.UserLogging {
    position: absolute;
    top: 30px;
    right: 40px;


    font-weight: bold;
    

    ul {
        list-style: none;
        display: flex;
    }
    li {
        margin-right:14px;
        cursor: pointer;
    }
    .UserEmail {
        color:rgb(8, 97, 30);
    }


}
.Form-position {
    position: relative;
    width:100%;
}
#loginForm {
    position:absolute;
    top:131px;
    right:40px;
    background-color: rgba($color: #222, $alpha: .5);
    border-radius: 5px;
    padding:5px;

    transition: opacity 1s ease;

    animation: fadeIn .5s;

    input, label {
        font-family: 'Montserrat', sans-serif;
        color: #444;
        display:block;
        margin-top:10px;
        margin-left: auto;
        margin-right: auto;
    }
    input {
        padding:8px;
    }
    button {
        font-family: 'Montserrat', sans-serif;
        background-color: slategray;
        color: #000;
        border-radius: 4px;
        width:91px;
        height:40px;
        margin-top: 10px;
    }
}


#signupForm {
    position: absolute;
    width:300px;
    top: 131px;

    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;

    background-color: rgba($color: #222, $alpha: .5);
    border-radius: 5px;
    padding:5px;

    animation: fadeIn .5s;

    input, label {
        font-family: 'Montserrat', sans-serif;
        color: #444;
        display: block;
        margin-top:20px;
        margin-left: auto;
        margin-right: auto;
    }
    input {
        padding: 8px;
    }
    button {
        font-family: 'Montserrat', sans-serif;
        background-color: slategray;
        color: #000;
        border-radius: 4px;
        width:91px;
        height:40px;
        margin-top: 10px;
    }
}
.hide {
    display: none;
}
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>