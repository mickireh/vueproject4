<template>
    <div>
        <div class="login">
            <span v-on:click="showLogin">Login</span>
        </div>  
        <div id="loginForm" class="hide">
            <form action="">
                <label for="loginEmail">Email</label>
                <input id="loginEmail" type="email">
                <label for="loginPassword">Password</label>
                <input id="loginPassword" type="password">
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
        }
    }
}
</script>

<style scoped lang="scss">
.login {
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