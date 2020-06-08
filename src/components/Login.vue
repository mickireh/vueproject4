<template>
    <div>
        <div class="UserLogging">
            <ul>
                <li v-on:click="showLogin">Login</li>
                <li v-on:click="showSignup">Signup</li>
                <li v-on:click="logout">Logout</li>
            </ul>
        </div>

        <div id="loginForm" class="hide">
            <form action="">
                <label for="loginEmail">Email</label>
                <input id="loginEmail" type="email">
                <label for="loginPassword">Password</label>
                <input id="loginPassword" type="password">
                <button @click="loginbtn">Login</button>
            </form>
        </div>
        <div id="signupForm" class="hide">
            <form action="">
                <label for="signupEmail">Email</label>
                <input id="signupEmail" type="email">
                <label for="signupPassword">Password</label>
                <input id="signupPassword" type="password">
                <button @click="signupbtn">Sign up</button>
            </form>
        </div>
       
    </div>
</template>

<script>
import $ from 'jquery'
export default {

    methods: {
        showSignup: () => {
            var signupForm = $('#signupForm');
            signupForm.toggleClass('hide');
            var loginForm = $('#loginForm');
            loginForm.addClass('hide');
        },
        signupbtn: (e) => {
            e.preventDefault();
        },
        showLogin: () => {
            var loginForm = document.getElementById('loginForm');
            loginForm.classList.toggle('hide');
            var signupForm = $('#signupForm');
            signupForm.addClass('hide');
        },
        loginbtn: function(e) {
            e.preventDefault();
        },
        logout: () => {

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
    cursor: pointer;

    ul {
        list-style: none;
        display: flex;
    }
    li {
        margin-right:14px;
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
</style>