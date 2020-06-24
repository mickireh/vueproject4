<template>
    <div class="about">
        <div class="headlineAbout">
            <h1><span class="headline-line1">Full</span><br>
                <span class="headline-line2">Sta<span class="headlinetext-part1">ck</span><span class="headlinetext-part2">g</span></span><br>
                <span class="headline-line3">Dev</span>
            </h1>
        </div>
        

    </div>
</template>

<script>

export default {
    name: 'About'
}
</script>

<style lang="scss" scoped>
    .headlineAbout {
        position: relative;
        width: 300px;
        margin-left:auto;
        margin-right:auto;
        h1 {
        font-family: 'Montserrat', sans-serif;
        font-size: 60px;
        color:seashell;
        text-shadow: 1px 3px rgba($color: #837d7d, $alpha: .25);
        }
    }

    .headline-line1 {
        text-align: left;
        display: inline-block;
        width:100%;
    }
    .headline-line2 {
        text-align: center;
        display: inline-block;
        width: 100%;
    }
    .headline-line3 {
        text-align: right;
        display: inline-block;
        width: 100%;
    }
    .headlinetext-part1 {
        animation: fadeOut 15s infinite;
    }
    .headlinetext-part2 {
        position: absolute;
        top:73px;
        right:94px;
        opacity: 0;
        animation: fadeIn 15s infinite;
    }

    @keyframes fadeIn {
        0% {opacity: 0;}
        50% {opacity: 1;}
        100% {opacity: 0;}
    }
    @keyframes fadeOut {
        0% {opacity: 1;}
        50% {opacity: 0;}
        100%{opacity:1;}
    }
</style>