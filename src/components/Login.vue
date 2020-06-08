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
                <button @click="signupbtn">Login</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        showSignup: () => {
            var signupForm = document.getElementById('signupForm');
            signupForm.classList.toggle('hide');
            var loginForm = document.getElementById('loginForm');
            loginForm.classList.toggle('hide');
        },
        signupbtn: (e) => {
            e.preventDefault();
        },
        showLogin: () => {
            // console.log(this);
            var loginForm = document.getElementById('loginForm');
            loginForm.classList.toggle('hide');
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
        margin-right:10px;
    }
}

#loginForm, #signupForm {
    position:absolute;
    top:130px;
    right:40px;
    background-color: rgba($color: #222, $alpha: .5);
    border-radius: 5px;
    padding:5px;

    input, label {
        display:block;
        margin-top:10px;
    }
    input {
        padding:8px;
    }
}
.hide {
    display: none;
}
</style>