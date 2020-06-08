<template>
    <div>
        <div class="UserLogging">
            <ul>
                <li v-on:click="showLogin">Login</li>
                <li v-on:click="showSignup">Signup</li>
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
    </div>
</template>

<script>
export default {
    methods: {
        showLogin: function() {
            console.log(this);
            var loginForm = document.getElementById('loginForm');
            loginForm.classList.toggle('hide');
        },
        loginbtn: function(e) {
            e.preventDefault();
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
}

#loginForm {
    position:absolute;
    top:100px;
    right:40px;
    background-color: #111;
    border-radius: 5px;
    padding:5px;

    input, label {
        display:block;
        margin-top:10px;
    }
}
.hide {
    display: none;
}
</style>