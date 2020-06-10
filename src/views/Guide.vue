<template>
    <div>
        <Login />
        <div class="guideHeader">
            <h3>Guides</h3>
            <div class="createGuide">
                <span @click="showCreateGuide">Create Guide</span>
            </div>
        </div>
        <div class="createGuideForm hide">
            <form>
                <label for="guideTitle">Title</label>
                <input type="text" id="guideTitle" v-model="guideTitle">
                <label for="guideContent">Content</label>
                <textarea type="text" id="guideContent" v-model="guideContent"></textarea>
                <button @click="createGuide">Create Guide</button>
            </form>
            

        </div>
        
        <!-- passing probs through components / vuex gloabal state -->
        <!-- <div v-if="loggedIn == true">
            <span>Create Guide</span>
        </div> -->
      
        <ul class="guideList">

        </ul>
    </div>
</template>

<script>
    import Login from '@/components/Login.vue';
    import $ from 'jquery';
    import firebase from 'firebase';
    import 'firebase/auth';
    import 'firebase/firestore';

    // console.log(firebase);
    export default {
        name: 'guide',
        data() {
            return {
                db: firebase.firestore(),
                loggedIn: false,
                guideTitle: '',
                guideContent: ''
            }
        },
        created() {

            this.db.collection('guide').onSnapshot(guides => {
                // get ul, empty out
                var guideList = $('.guideList');
                guideList.empty();
                
                // get guides, append to ul
                guides.docs.forEach(doc => {

                    var guide = doc.data();

                    var li = $('<li/>');
                    li.text(guide.title);
                    var content = $('<p/>').text(guide.content);
                    li.append(content);
                    guideList.append(li);
                })
            }, function(err) {
                console.log(err.message);
            }

            );
        },
        methods: {
            closeForms: () => {
                var signupForm = $('#signupForm');
                signupForm.addClass('hide');
                var loginForm = $('#loginForm');
                loginForm.addClass('hide');
            },
            createGuide: function() {
                // console.log(this.guideTitle, this.guideContent);
                if (firebase.auth().currentUser) {
                    var vm = this;
                    this.db.collection('guide').add({
                        title: this.guideTitle,
                        content: this.guideContent
                    }).then(function() {
                        console.log('guide created');
                        // close and reset Form
                        var createGuideForm = $('.createGuideForm');
                        createGuideForm.addClass('hide');
                        vm.guideTitle = '';
                        vm.guideContent = '';

                    }), function(err) {
                        console.log(err.message);
                        
                    }
                } else {
                    console.log('Log in');
                }
              
            },
            showCreateGuide: function() {
                var createGuideForm = $('.createGuideForm');
                createGuideForm.toggleClass('hide');
                // close other Forms
                // var signupForm = $('#signupForm');
                // signupForm.addClass('hide');
                // var loginForm = $('#loginForm');
                // loginForm.addClass('hide');
                this.closeForms();
            }
        },
        components: {
            Login
        }
    }
</script>

<style lang="scss" scoped>
    .guideHeader {
        position: relative;
    }
    .createGuide {
        position: absolute;
        right: 40px;
        top: 0;
        span {
            cursor: pointer;
        }
    }

    .createGuideForm {
        position: absolute;
        background-color: rgba($color: #222, $alpha: .89);
        border-radius: 5px;
        width: 60%;
        color:seashell;

        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;

        animation: fadeIn .5s;

        input, label, button {
            display: block;
            margin-top:10px;
            margin-left: auto;
            margin-right: auto;
        }
        input {
           padding:8px;
        }
        textarea {
            margin-top:10px;
            padding: 8px;
            min-width: 400px;
            min-height: 200px;
            border-radius: 4px;
        }
        button {
            font-family: 'Montserrat', sans-serif;
            background-color: slategray;
            color: #000;
            border-radius: 4px;
            width:131px;
            height:40px;
            margin-top: 10px;
        }
    }
    .hide {
        display: none;
    }

    .guideList {
        margin: 0;
        padding: 0;
        list-style: none;
        background-color: seashell;
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