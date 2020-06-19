<template>
    <div>
        <Login />
        <div class="guideHeader">
            <h1>Guides</h1>
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
            <div class="guideList col1_80p1">

            </div>
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
                errors: {}
            }
        },
        created() {

            this.db.collection('guide').onSnapshot(guides => {
                // get ul, empty out
                var guideList = $('.guideList');
                guideList.empty();
                var categoryList = $('.categories ul');
                // categoryList.empty();
                // console.log(categoryList);
                
                // get guides, get category in array (create if not exist) append to ul
                guides.docs.forEach(doc => {

                    var guide = doc.data();

                    // get category (put in array (maybe not necessary?) create left overview)
                    // also create article sections with class? named after category
                    // if (this.guideCategories.length === 0) {
                    //     this.guideCategories.push(guide.category);
                    //     var categoryLi = $('<li/>').text(guide.category);
                    //     categoryList.append(categoryLi);
                    // } else {
                    if (this.guideCategories.includes(guide.category) === false) {
                        this.guideCategories.push(guide.category);
                        var categoryLi = $('<li/>');
                        var categoryAnchor = $('<a/>').text(guide.category);
                        // categoryAnchor.attr('v-on:click','goto('+guide.category+')');
                        // this.$on('click',this.goto (guide.category));
                        categoryLi.append(categoryAnchor);
                        categoryList.append(categoryLi);

                        let article = $('<article/>');
                        article.attr('ref',guide.category);
                        let h3guideCategory = $('<h3/>').text(guide.category);
                        let ulguideCategory = $('<ul/>').addClass(guide.category);
                        article.append(h3guideCategory);
                        article.append(ulguideCategory);
                        guideList.append(article);
                    }
                    // }

                    // console.log(this.guideCategories);



                    // <div class="guideList">
                    //     article id="{{guide.category}}" class="{{guide.category}}"
                    //          h3 guide category
                    //          ul
                    //              li guide entry
                    //              li guide entry
                    //      article class="CSS"
                    //          h3 guide category
                    //          ul
                    //              li guide entry
                    //       article class="HTML"
                    //          h3 guide category
                    //          ul
                    //              li 


                    // get all articles, if article hasClass "guideCategory" append
                    var articlesAll = $('.guideList ul');
                    // console.log(articlesAll);

                    articlesAll.each(function() {
                        // console.log(this);

                        if($(this).hasClass(guide.category)) {
                            // console.log($(this));

                            var li = $('<li/>');
                            li.text(guide.title);
                            var content = $('<p/>').text(guide.content);
                            li.append(content);

                            // if link is there
                            if (guide.link) {
                                var a = $('<a/>').text(guide.link);
                                a.attr('href',guide.link);
                                li.append(a);

                            }
                            
                            $(this).append(li);
                        }
                    });



                    
                })
            }, function(err) {
                console.log(err.message);
            });

            // console.log(this.guideCategories);

            // does not work! either of them

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
            goto(refName) {
                var element = this.$refs[refName];
                console.log(element);
                element.scrollIntoView();
            },
            createGuide: function() {
                // console.log(this.guideTitle, this.guideContent);
                if (firebase.auth().currentUser) {
                    var vm = this;
                    this.errors = {};

                    // both categories empty
                    if (this.guideCategory === '' && this.guideCategoryNew.trim() === '' ) {
                        // console.log('empty');
                        this.errors['category'] = 'Please select an already used category or define a new one. Thanks!';
                    }

                    // both categories not empty and not the same
                    if (this.guideCategory !== '' && this.guideCategoryNew.trim() !== '' && this.guideCategory !== this.guideCategoryNew.trim()) {
                        this.errors['category'] = 'Please select either an already used category or define a new one, not both. Thanks!';
                    }
                    // console.log(this.guideCategory);   

                    // title empty
                    if (this.guideTitle.trim() === '') {
                        this.errors['title'] = 'Please enter a title. Thanks!';
                    }

                    // content empty , should always be there, even if link is provided for defining at least the link
                    // TODO

                    // both content and link empty
                    if (this.guideContent.trim() === '' && this.guideLink.trim() === '') {
                        this.errors['content'] = 'Please provide either a bit of content or a link to an external site. Thanks!';
                    }

                    // for the adding to the database, only one category "field" needed
                    if (this.guideCategory === '' && this.guideCategoryNew.trim() !== '' ) {
                        this.guideCategory = this.guideCategoryNew;
                    }
                    // console.log(this.errors);
                    // console.log(this.errors['title']);

                    console.log(this.errors);
                    // checking if object errors is empty with jQuery
                    if ($.isEmptyObject(this.errors)) {

                        this.db.collection('guide').add({
                            title: this.guideTitle,
                            content: this.guideContent,
                            category: this.guideCategory,
                            link: this.guideLink
                        }).then(function() {
                            console.log('guide created');
                            // close and reset Form
                            var createGuideForm = $('.createGuideForm');
                            createGuideForm.addClass('hide');
                            vm.guideTitle = '';
                            vm.guideContent = '';
                            vm.guideCategory = '';
                            vm.guideLink = '';

                            // TODO try redirect, refresh page because of unwanted behavior with onSnapshot
                            // reload entire page, not perfect but needed
                            vm.$router.go(); 

                            // vm.$router.push(); NO
                            // vm.$router.push(''guide); NO, error: redundant routing :( )
                            // vm.$forceUpdate(); NO

                        }), function(err) {
                            console.log(err.message);
                            
                        }
                    }
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
                this.errors = {};
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
        color: seashell;
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

    .guideList::v-deep ul {
        margin: 0;
        padding:0;
        list-style-type: none;
        border-bottom: 2px solid #444;
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
        z-index: 1;

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