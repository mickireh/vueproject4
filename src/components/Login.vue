<template>
    <li>
        <div class="UserLogging">
            <ul>
                <li class="user-li-log" v-if="loggedIn == true">{{ this.user }}</li>
                <li class="second-li-log" v-on:click="logout" v-if="loggedIn == true">Logout</li>
                <li class="first-li-log" v-on:click="showLogin" v-if="loggedIn == false">Login</li>
                <li class="second-li-log" v-on:click="showSignup" v-if="loggedIn == false">Signup</li>
            </ul>
        </div>

        <div id="loginForm" v-if="showLoginSwitch == true">
            <form>
                <label for="loginEmail">Email</label>
                <input id="loginEmail" type="email" v-model="loginEmail" placeholder="email">
                <label for="loginPassword">Password</label>
                <input id="loginPassword" type="password" v-model="loginPassword" placeholder="password">
                <button @click="loginbtn">Login</button>
            </form>
        </div>
        <div id="signupForm" v-if="showSignupSwitch == true">
            <form>
                <label for="signupEmail">Email</label>
                <input id="signupEmail" type="email" v-model="signupEmail">
                <label for="signupPassword">Password</label>
                <input id="signupPassword" type="password" v-model="signupPassword">
                <button @click="signupbtn">Sign up</button>
            </form>
        </div>
       
    </li>
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
        });
        window.addEventListener(
            'resize',
            this.showWindowSize
        );
    },
    data() {
        return {
            error: '',
            signupEmail: '',
            signupPassword: '',
            loginEmail: '',
            loginPassword: '',
            loggedIn: false,
            user: '',
            showLoginSwitch: false,
            showSignupSwitch: false
        }
    },
    methods: {
        setError: function(err, formp, formbtn) {
            // console.log(err, form);
            $(formp).detach();
            var error = $('<p/>').text(err.message);
            error.css('color','red');
            error.insertAfter(formbtn);
        },
        showSignup: function() {
            // var signupForm = $('#signupForm');
            // signupForm.toggleClass('hide');
            // var loginForm = $('#loginForm');
            // loginForm.addClass('hide');
            this.showLoginSwitch = false;
            // console.log(this.showLoginBool);
            this.showSignupSwitch = !this.showSignupSwitch;

            // error removal, dunno how to get err.message as global
            // for now remove error p when show forms

            // vue does not (because of DOM structure prolly; form inside this div) see those forms as dirfferent elements, so it does not change the p, because its not changed. 
            // still.. code below does not work either. 
            var formp = $('#signupForm form p');
            $(formp).detach();
        },
        showLogin: function() {
            // var loginForm = $('#loginForm');
            // loginForm.toggleClass('hide');

            // var signupForm = $('#signupForm');
            // signupForm.addClass('hide');
            this.showLoginSwitch = !this.showLoginSwitch;
            // console.log(this.showLoginBool);
            this.showSignupSwitch = false;


            // var formp = $('#loginForm p');
            // $(formp).detach();

        },
        signupbtn: function() {
            // cuz of scoping vm(view-model to this)
            var vm = this;
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
                var formp = $('#signupForm p');
                var formbtn = $('#signupForm button')
                vm.setError(err, formp, formbtn);
                // console.log(err.message);
                // $('#signupForm p').detach();
                // var error = $('<p/>').text(err.message);
                // error.css('color','red');
                // error.insertAfter('#signupForm button');
            }
            );
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
            }).catch((err) => {
                console.log(err.message);
                if (vm.loginEmail.trim() === '') {
                    err.message = 'empty';
                    console.log(err.message);
                }
                var formp = $('#loginForm p');
                var formbtn = $('#loginForm button')
                vm.setError(err, formp, formbtn);
            });
            // },
            // function(err) {
            //     if (vm.loginEmail.trim() === '') {
            //         err.message = 'empty';
            //     }
            //     // $('#loginForm p').detach();
            //     // var error = $('<p/>').text(err.message);
            //     // error.css('color','red');
            //     // error.insertAfter('#loginForm button');
            //     var formp = $('#loginForm p');
            //     var formbtn = $('#loginForm button')
            //     vm.setError(err, formp, formbtn);
            // });
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
            
        },
        // showWindowSize() {
        //     // console.log(window.innerWidth);
        //     var UserLoggingUi = $('.UserLogging ul')
        //     if (window.innerWidth <= 765 ) {
        //         // console.log(UserLoggingUi);
        //         // console.log(UserLoggingUi.children());
        //         UserLoggingUi.children().each((index, li) => {
        //             console.log(li);
        //             UserLoggingUi.css('display', 'none');
        //         });
        //     } else {
        //         UserLoggingUi.css('display', 'flex');
        //     }
        // }
    }
}
</script>

<style scoped lang="scss">
.UserLogging {
    position: absolute;
    top: 14px;
    right: 40px;
    text-align: center;
    font-weight: 300;
    

    ul {
        list-style: none;
        display: flex;
    }
    li {
        margin-right:24px;
        cursor: pointer;
        min-width:120px;
        height:44px;
        // line-height: 44px;
        color:silver;

        // animation: fadeIn .5s;

        z-index: 1;
        position: relative;
        overflow: hidden;
    }



    .first-li-log:after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background: #222;
        -webkit-transform-origin: 100% 0;
        -ms-transform-origin: 100% 0;
        transform-origin: 100% 0;
        -webkit-transform: skew(-33deg);
        -ms-transform: skew(-33deg);
        transform: skew(-33deg);
        z-index: -1;
    }

    .user-li-log {
        color:rgb(8, 97, 30);
    }

    .user-li-log:after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background: #a1bccc;
        -webkit-transform-origin: 100% 0;
        -ms-transform-origin: 100% 0;
        transform-origin: 100% 0;
        -webkit-transform: skew(-33deg);
        -ms-transform: skew(-33deg);
        transform: skew(-33deg);
        z-index: -1;
    }

    // .second-li-log {
    //     background-color: #000;
    // }
    // .second-li-log:before {
    //     content: '';
    //     position: absolute;
    //     top: 0;
    //     left: 0;
    //     width: 0;
    //     height: 0;
    //     border-style: solid;
    //     border-width: 44px 44px 0 0;
    //     border-color: #ccc transparent transparent transparent;
    // }

    .second-li-log:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #222;
        -webkit-transform-origin: 0 100%;
        -ms-transform-origin: 0 100%;
        transform-origin: 0 100%;
        -webkit-transform: skew(-33deg);
        -ms-transform: skew(-33deg);
        transform: skew(-33deg);
        z-index: -1;
    }

    .first-li-log:hover:after, .second-li-log:hover:after {
        background:#555;
    }

}
.Form-position {
    position: relative;
    width:100%;
}
#loginForm {
    position:absolute;
    top:76px;
    right:40px;
    width: 200px;
    background-color: rgba($color: #222, $alpha: .9);
    border-radius: 5px;
    padding:5px;
    z-index: 20;

    // transition: opacity 1s ease;

    animation: fadeIn .5s;

    input, label {
        font-family: 'Montserrat', sans-serif;
        color: #999;
        display:block;
        margin-top:10px;
        margin-left: auto;
        margin-right: auto;
        max-width:150px;
    }
    input {
        padding:8px;
        color:#333;
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
    top: 76px;

    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;

    background-color: rgba($color: #222, $alpha: .9);
    border-radius: 5px;
    padding:5px;
    z-index: 20;

    animation: fadeIn .5s;

    input, label {
        font-family: 'Montserrat', sans-serif;
        color: #999;
        display: block;
        margin-top:20px;
        margin-left: auto;
        margin-right: auto;
    }
    input {
        color:#333;
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
    .error {
        color:red;
    }
}
.hide {
    display: none;
}

.error {
    color:red;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@media screen and (max-width:767px) {
        .UserLogging {
            position:static;
            ul {
                display:block;
            }
        }
        #loginForm {
            top:324px;
        }
        #signupForm {
            top:324px;
        }
    }
</style>