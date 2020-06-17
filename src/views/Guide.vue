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
                <div class="form-group">
                    <label for="guideCategory">Category</label>
                    <select v-model="guideCategory" id="guideCategory">
                        <option></option>
                        <option v-for="category in this.guideCategories" v-bind:key="category">{{category}}</option>
                    </select>
                    <label for="guideCategoryNew">new Category</label>
                    <input type="text" id="guideCategoryNew" placeholder="new category.." v-model="guideCategoryNew">
                    <p class="error" v-if="this.errors['category'] !== undefined">{{this.errors['category']}}</p>
                </div>

                <div class="form-group">
                    <label for="guideTitle">Title</label>
                    <input type="text" id="guideTitle" placeholder="title.." v-model="guideTitle">
                    <p class="error" v-if="this.errors['title'] !== undefined">{{this.errors['title']}}</p>
                </div>

                <div class="form-group">
                    <label for="guideContent">Content</label>
                    <textarea type="text" id="guideContent" placeholder="content.." v-model="guideContent"></textarea>
                    <label for="guideLink">Link</label>
                    <input type="text" id="guideLink" placeholder="link.." v-model="guideLink">
                    <p class="error" v-if="this.errors['content'] !== undefined">{{this.errors['content']}}</p>
                </div>

                <button @click="createGuide">Create Guide</button>
            </form>

        </div>

        <!-- passing probs through components / vuex gloabal state -->
        <!-- <div v-if="loggedIn == true">
            <span>Create Guide</span>
        </div> -->
        <div class="clear wrapper">
            <div class="col1_20p1 categories">
                <h3>Categories:</h3>
                <ul>

                </ul>
            </div>
            <ul class="guideList col1_80p1">

            </ul>
        </div>
        
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
                guideContent: '',
                guideCategories: [],
                guideCategory: '',
                guideCategoryNew: '',
                guideLink: '',
                errors: []
            }
        },
        created() {

            this.db.collection('guide').onSnapshot(guides => {
                // get ul, empty out
                var guideList = $('.guideList');
                guideList.empty();
                var categoryList = $('.categories ul');
                categoryList.empty();
                // console.log(categoryList);
                
                // get guides, get category in array (create if not exist) append to ul
                guides.docs.forEach(doc => {

                    var guide = doc.data();

                    if (this.guideCategories.length === 0) {
                        this.guideCategories.push(guide.category);
                        var categoryLi = $('<li/>').text(guide.category);
                        categoryList.append(categoryLi);
                    } else {
                        if (this.guideCategories.includes(guide.category) === false) {
                            this.guideCategories.push(guide.category);
                            categoryLi = $('<li/>').text(guide.category);
                            categoryList.append(categoryLi);
                        }
                    }
                    // this.guideCategories.push(guide.category);
                    // console.log(this.guideCategories);



                    // <div class="guideList">
                    //     article class="{{guide.category}}"
                    //          ul
                    //              li guide entry
                    //              li guide entry
                    //      article class="CSS"
                    //          ul
                    //              li guide entry
                    //       article class="HTML"
                    //          ul
                    //              li 




                    var li = $('<li/>');
                    li.text(guide.title);
                    var content = $('<p/>').text(guide.content);
                    li.append(content);
                    guideList.append(li);

                    
                })
            }, function(err) {
                console.log(err.message);
            });

            // console.log(this.guideCategories);

            // does not work! either

            // for (let category of this.guideCategories) {
            //     console.log(category);
            // }
            // this.guideCategories.forEach(function(category, index) {
            //     console.log(category, index);
            //     console.log('what');
            // });

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
                    // var vm = this;
                    this.errors = [];

                    if (this.guideCategory === '' && this.guideCategoryNew.trim() === '' ) {
                        // console.log('empty');
                        this.errors['category'] = 'Please select an already used category or define a new one. Thanks!';
                    }

                    if (this.guideCategory !== '' && this.guideCategoryNew.trim() !== '' && this.guideCategory !== this.guideCategoryNew.trim()) {
                        this.errors['category'] = 'Please select either an already used category or define a new one, not both. Thanks!';
                    }
                    // console.log(this.guideCategory);   

                    if (this.guideTitle.trim() === '') {
                        this.errors['title'] = 'Please enter a title. Thanks!';
                    }

                    if (this.guideContent.trim() === '' && this.guideLink.trim() === '') {
                        this.errors['content'] = 'Please provide either a bit of content or a link to an external site. Thanks!';
                    }


                    // console.log(this.errors);
                    // console.log(this.errors['title']);

                    // Validation TODO
                    // not empty | not both category and categoryNew => guideCategory


                    // this.db.collection('guide').add({
                    //     title: this.guideTitle,
                    //     content: this.guideContent,
                    //     category: this.guideCategory
                    // }).then(function() {
                    //     console.log('guide created');
                    //     // close and reset Form
                    //     var createGuideForm = $('.createGuideForm');
                    //     createGuideForm.addClass('hide');
                    //     vm.guideTitle = '';
                    //     vm.guideContent = '';

                    // }), function(err) {
                    //     console.log(err.message);
                        
                    // }
                } else {
                    console.log('Log in');
                }
              
            },
            showCreateGuide: function() {
                var createGuideForm = $('.createGuideForm');
                createGuideForm.toggleClass('hide');
                // close other Forms, reset errors
                // var signupForm = $('#signupForm');
                // signupForm.addClass('hide');
                // var loginForm = $('#loginForm');
                // loginForm.addClass('hide');
                this.closeForms();
                this.errors = [];
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

    .guideList {
        margin: 0;
        list-style: none;
        background-color: seashell;
    }
    .categories {
        h3 {
            margin-top: 0;
            color:seashell;
        }
        ul {
            list-style-type: none;
            color:seashell;
            text-align: right;
            font-size: 30px;
        }
        ul li {
            margin-top:10px;
        }
    }
    .createGuideForm {
        position: absolute;
        background-color: rgba($color: #222, $alpha: .89);
        border-bottom-right-radius: 5px;
        border-bottom-left-radius: 5px;
        width: 60%;
        color:seashell;

        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;

        animation: fadeIn .5s;

        input, label, button, select, option {
            font-family: 'Montserrat', sans-serif;
            display: block;
            margin-top:10px;
            margin-left: auto;
            margin-right: auto;
        }
        input, select {
           padding:8px;
        }
        input {
            margin-bottom: 22px;
        }
        textarea {
            font-family: 'Montserrat', sans-serif;
            margin-top:10px;
            padding: 8px;
            min-width: 300px;
            min-height: 150px;
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
            margin-bottom: 10px;
        }
    }

    .form-group {
        position: relative;
        border-bottom: 2px solid #444;
    }

    .hide {
        display: none;
    }

    .error {
        color:red;
        position: absolute;
        bottom:0;
        margin-left: auto;
        margin-right: auto;
        margin-top: 0;
        margin-bottom: 0;
        left: 0;
        right: 0;
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