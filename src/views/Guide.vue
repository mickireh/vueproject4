<template>
    <div>
        <div class="guideHeader">
            <h1 class="p-3">Guides</h1>
            <div class="createGuide" v-if="user.loggedIn">
                <span @click="showCreateGuide">Create Guide</span>
            </div>
            <div class="createGuide" v-else>
                <span>Log in to create Guide</span>
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
            <div class="col1_15">
                <div class="categories p-2">
                    <h3>Categories:</h3>
                    <ul>
                        <li v-for="category in this.guideCategories" v-bind:key="category" @click="goto(category)">{{category}}</li>
                    </ul>
                </div>
            </div>
            <div class="guideList col1_85">

            </div>
        </div>
        <button id="backToTop" class="btn-secondary" title="Back to the top" @click="backToTop()"></button>
        <!-- <button id="backToTop" title="Back to the top" @click="backToTop()">Top</button> -->
    </div>
</template>

<script>
    import $ from 'jquery';
    import firebase from 'firebase';
    import 'firebase/auth';
    import 'firebase/firestore';

    import { mapGetters } from "vuex";

    // console.log(firebase);
    export default {
        name: 'guide',
        data() {
            return {
                db: firebase.firestore(),
                loggedIn: false,
                guides: [],
                guideTitle: '',
                guideContent: '',
                guideCategories: [],
                guideCategory: '',
                guideCategoryNew: '',
                guideLink: '',
                errors: {},
                sticky: '124'
            }
        },
        computed: {
            ...mapGetters({
                user: "user"
            })
        },
        created() {
            // window.addEventListener(
            //     'resize',
            //     this.showWindowSize
            // );

            // adds event to window, after leaving this page, still on window, remove event
            // destroy() lifecycle 
            // better beforeDestroy()
            window.addEventListener('scroll', this.handleScroll);

            // var vm = this;
            this.db.collection('guide').onSnapshot(guides => {
                // get ul, empty out
                var guideList = $('.guideList');
                guideList.empty();
                // var categoryList = $('.categories ul');
                // categoryList.empty();
                // console.log(categoryList);
                
                // get guides, get category in array (create if not exist) append to ul
                guides.docs.forEach(doc => {
                    // console.log(doc.data());
                    // console.log(doc.id);

                    var guide = doc.data();

                    guide["id"] = doc.id

                    // this.guides.push(guide,doc.id);
                    this.guides.push(guide);
                    // console.log(this.guides);


                    // get category (put in array (maybe not necessary?) create left overview)
                    // also create article sections with class? named after category
                    // if (this.guideCategories.length === 0) {
                    //     this.guideCategories.push(guide.category);
                    //     var categoryLi = $('<li/>').text(guide.category);
                    //     categoryList.append(categoryLi);
                    // } else {
                    if (this.guideCategories.includes(guide.category) === false) {
                        this.guideCategories.push(guide.category);
                        // var categoryLi = $('<li/>');
                        // var categoryAnchor = $('<a/>').text(guide.category);

                        // anchor is ofc not working in vue for jump marks, 
                        // dynamically add event handler with scrollintoView(ref) to the links
                        // next try via component => get list, go thrpugh list, display list
                        // ? how to pass the referenced element
                        // to access refs they need to be rendered!!! mounted() $nextTick...
                        // solved
                        // render list via v-for, then just get the element for scrollintoView!!!!!

                        // categoryAnchor.attr('v-on:click','goto('+guide.category+')');
                        // this.$on('click',this.goto (guide.category));

                        // categoryLi.append(categoryAnchor);
                        // categoryList.append(categoryLi);

                        let article = $('<article/>');
                        article.attr('id',guide.category);
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

                            var li = $('<li/>').addClass('shadow guide-list-item');
                            var h4 = $('<h4/>').text(guide.title);
                            li.append(h4);

                            // if content
                            if (guide.content) {
                                var content = $('<p/>').text(guide.content);
                                li.append(content);
                            }
                            
                            // if link is there
                            if (guide.link) {
                                var a = $('<a/>').text(guide.link);
                                a.attr('href',guide.link);
                                a.attr('title',guide.title);
                                a.attr('target','_blank');
                                li.append(a);
                            }

                            // edit link, bot with router-link TODO try
                            // if user, not like this
                            // if (vm.user.loggedin) {
                            //     var editlink = $('<a/>').addClass('edit-link');
                            //     editlink.text('edit');
                            //     editlink.attr('href','#/guide/edit/' + guide.id);
                            //     li.append(editlink);
                            // }
                            // var editlink = $('<a/>').addClass('edit-link');
                            // editlink.text('edit');
                            // editlink.attr('href','#/guide/edit/' + guide.id);
                            // li.append(editlink);
                            
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
                // try via store
                var signupForm = $('#signupForm');
                signupForm.addClass('hide');
                var loginForm = $('#loginForm');
                loginForm.addClass('hide');
            },
            goto(refName) {
                // var element = this.$refs[refName];
                var element = $('#'+refName);
                // console.log(this.$refs.refName);
                // console.log(refName);

                // console.log($('#'+refName));
                element[0].scrollIntoView({behavior:"smooth"});
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
                            // goes against the idea of using Vue in the first place... noob
                            // solution? : extra component, get data, render the component
                            // reload entire page, not perfect but needed with this model
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
            },
            handleScroll () {
                var categoriesMenu = $('.categories');
                var backToTopBtn = $('#backToTop');
                // var sticky = categoriesMenu[0].offsetTop;
                // console.log(this.sticky);

                // collapse Navbar fpr mobile
                var NavBtn = $('.navbar-toggler')
                NavBtn.addClass('collapsed');
                var NavBar = $('.navbar-collapse');
                NavBar.removeClass('show');

                if (window.pageYOffset >= this.sticky) {
                    categoriesMenu.addClass("sticky");
                    categoriesMenu.css('box-sizing','border-box');
                    backToTopBtn.css('display','block');

                    if (window.innerWidth > 1000) {
                        categoriesMenu.css("width",'15%');
                    } else {
                        categoriesMenu.css("width",'');
                    }
                } else {
                    categoriesMenu.removeClass("sticky");
                    categoriesMenu.css("width",'');
                    backToTopBtn.css('display','none');
                }
            },
            backToTop () {
                document.body.scrollTop = 0; // For Safari
                document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
            },
            // showWindowSize() {
            //     console.log(window.innerWidth);
            // }
        },
        beforeDestroy() {
            window.removeEventListener('scroll', this.handleScroll);
        },
        // watch: {
        //     windowWidth: function() {
        //         if (this.windowWidth === 768) {
        //         console.log('The window width is 768px');
        //         }
        //     }
        // },
    }
</script>

<style lang="scss" scoped>
    *, *:after, *:before {
        box-sizing: content-box;
    }

    .relative {
        position: relative;
    }
    .guideHeader {
        position: relative;
        color: seashell;
    }
    .createGuide {
        position: absolute;
        right: 40px;
        top: 15px;
        span {
            cursor: pointer;
        }
    }

    .guideList {
        box-sizing: content-box;
        margin: 0;
        list-style: none;
        background-color: #eee;

        &::v-deep h3 {
            padding-top: 1rem;
        }

        &::v-deep ul {
            margin: 0;
            padding:1rem;
            list-style-type: none;
            border-bottom: 2px solid #aaa;
        }

        &::v-deep ul li {
            margin-bottom:20px;
            padding:10px;
            border: 1px solid #aaa;
            border-radius: 5px;
            // position: relative;
        }
        &::v-deep ul li h4 {
            margin:0;
            text-align:left;
            padding-left:20px;
        }
        &::v-deep ul li a.edit-link{
            position: absolute;
            right: 4px;
            bottom: 4px;
        }
    }

    .edit-link {
        position: absolute;
        right: 4px;
        bottom: 4px;
    }

    .categories {
        h3 {
            margin-top: 0;
            font-size: 20px;
            color:seashell;
        }
        ul {
            margin:0;
            list-style-type: none;
            color:seashell;
            text-align: right;
            font-size: 16px;
        }
        ul li {
            margin-top:10px;
            cursor: pointer;
        }

        // &:hover li  {
        //     color:lightgray;
        // }
    }
    .categories li:hover {
        color:#fff;
        text-shadow: 2px 2px rgba($color: #fff, $alpha: .35);
    }

    .col1_15 {
        min-height:1px;
    }
    .sticky {
        position: fixed;
        top:0;
    }
    .createGuideForm {
        position: absolute;
        background-color: rgba($color: #222, $alpha: .89);
        border-bottom-right-radius: 5px;
        border-bottom-left-radius: 5px;
        // width: 60%;
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

    #backToTop {
        display: none;
        position: fixed;
        // background-color: seashell;
        border-radius: 5px;
        bottom: 30px;
        left: 6%;
        line-height: 30px;
        font-size: 20px;
        width: 20px;
        height: 30px;
        background-image: url('../assets/dbl_arrow_up.png');
        background-repeat: no-repeat;
        background-size: 25px 25px;
        background-position: 5px 2px;
        opacity: .8;
    }

    @keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
    }
    @media screen and (max-width:1023px) {
        .createGuide {
            position: static;
        }
        .categories {
            width:100%;
            background-color: #333;
            box-sizing: border-box;
            ul li {
                display:inline-block;
                margin-left:14px;
            }
        }
        .sticky {
            width:100%;
        }
    }
</style>