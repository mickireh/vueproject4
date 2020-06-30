<template>
    <div class="about">
        <span class="headlineNote">learning to be a</span>
        <div class="headlineAbout">
            <h1><span class="headline-line1">Full</span><br>
                <span class="headline-line2">Sta<span class="headlinetext-part1">ck</span><span class="headlinetext-part2">g</span></span><br>
                <span class="headline-line3">Dev</span>
            </h1>
        </div>
        <table class="table table-bordered">
            <tr>
                <td class="text-left">name</td>
                <td class="text-right">Georg Simon Michael Hirsch</td>
            </tr>
            <tr>
                <td class="text-left">born</td>
                <td class="text-right">yes</td>
            </tr>
            <tr>
                <td class="text-left">location</td>
                <td class="text-right">Lübeck, Germany</td>
            </tr>
        </table>

    </div>
</template>

<script>

export default {
    name: 'About'
}
</script>

<style lang="scss" scoped>
    .headlineNote {
        display: inline-block;
        width: 300px;
        margin-left:auto;
        margin-right:auto;
        text-align: left;
        color:#486b8e;
        padding-top: 0.75rem;
    }
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

    .table {
        font-size: 1.2rem;
        color:#486b8e;
        width:330px;
        margin-left:auto;
        margin-right:auto;
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