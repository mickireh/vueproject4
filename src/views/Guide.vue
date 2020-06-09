<template>
    <div>
        <h3>Guide</h3>
    </div>
</template>

<script>
    import firebase from 'firebase';
    import 'firebase/auth';
    import 'firebase/firestore';

    // console.log(firebase);
    export default {
        name: 'guide',
        data() {
            return {
                db: firebase.firestore()
            }
        },
        created() {
            console.log(this.db);
        }
    }
</script>

<style lang="scss" scoped>

</style>