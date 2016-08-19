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

    let homeView = new HomeView(selector, mainContentSelector);
    let homeController = new HomeController(homeView, requester, baseUrl, appId);

    let userView = new UserView(selector, mainContentSelector);
    let userController = new UserController(userView, requester, baseUrl, appId);

    let postView = new PostView(selector, mainContentSelector);
    let postController = new PostController(postView, requester, baseUrl, appId);

    initEventServices();

    onRoute("#/", function () {
        if (!authService.isLoggedIn()) {
            homeController.showGuestPage();
        }
        else {
            homeController.showUserPage();
        }
    });

    onRoute("#/post-:id", function () {
        let top = $("#post-" + this.params['id']).position().top;
        $(window).scrollTop(top);
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

    bindEventHandler('login', function (ev, data) {
        userController.login(data);
    });

    bindEventHandler('register', function (ev, data) {
        userController.register(data);
    });

    bindEventHandler('createPost', function (ev, data) {
        postController.createPost(data);
    });

    run('#/');
})();
