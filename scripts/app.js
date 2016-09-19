(function () {

    let baseUrl = "https://baas.kinvey.com";
    let appId = "kid_H1r1EKGI";
    let appSecret = "0b6c946135e3413481b9dafdd8e3ff62";
    var _guestCredentials = "90a6b7ed-69de-480c-a3bf-d0e6838e507f.Ckk8CV532LkiFTmGOI8Mk/OH/V6T5r09Aa3DSnnzSGE=";

    let authService = new AuthorizationService(baseUrl, appId, appSecret, _guestCredentials);
    authService.initAuthorizationType("Kinvey");

    let requester = new Requester(authService);

    let selector = ".wrapper";
    let mainContentSelector = ".main-content";
    var postsPerPage = 6;

    let homeView = new HomeView(selector, mainContentSelector);
    let homeController = new HomeController(homeView, requester, baseUrl, appId);

    let userView = new UserView(selector, mainContentSelector);
    let userController = new UserController(userView, requester, baseUrl, appId);

    let postView = new PostView(selector, mainContentSelector);
    let postController = new PostController(postView, requester, baseUrl, appId);


    initEventServices();

    onRoute("#/", function () {

        //here we test it we can get the query param named page
        // try http://localhost:59887/BlogJavaScript/index.html#/?page=2
        //and open the console to see the result
        var currentPage = this.params['page'];
        console.log(currentPage);
        if (!authService.isLoggedIn()) {
            homeController.showGuestPage(currentPage, postsPerPage);
        }
        else {
            homeController.showUserPage(currentPage, postsPerPage);
        }
    });

    onRoute("#/post-:id", function () {
        homeController.showSinglePost();
    });

    onRoute("#/login", function () {
        userController.showLoginPage(authService.isLoggedIn());
    });

    onRoute("#/register", function () {
        userController.showRegisterPage(authService.isLoggedIn());
    });

    onRoute("#/logout", function () {
        userController.logout();
    });

    onRoute('#/posts/create', function () {
        let data = {
            fullname: sessionStorage['fullname']
        };

        postController.showCreatePostPage(data, authService.isLoggedIn());
    });

    onRoute("#/post/:id", function () {
        sessionStorage.setItem('id', this.params['id']);
        homeController.getArticle();
    });

    onRoute("#/about", function () {
        let data = {
            fullname: sessionStorage['fullname']
        };
        homeView.showAboutPage(authService.isLoggedIn());

    });
    onRoute("#/thebooks", function () {
        let data = {
            fullname: sessionStorage['fullname']
        };
        homeView.showTheBooksPage(authService.isLoggedIn());

    });

    onRoute('#/delete/article/', function (postId) {
        postController.deleteArticle(postId.params.id);
        sessionStorage.setItem('id', this.params['id']);
    });
    onRoute("#/edit/article/", function (articleId) {
        postController.editArticlePage(articleId.params.id);
        postController.showSelectedArticle(data);
    });


    bindEventHandler('login', function (ev, data) {
        userController.login(data);
    });

    bindEventHandler('register', function (ev, data) {
        userController.register(data);
    });

    bindEventHandler('createPost', function (ev, data) {
        postController.createPost(data);
    });
    bindEventHandler('editArticle', function (event, data) {
        postController.editArticle(data);
    });
   
    run("#/");
})();
