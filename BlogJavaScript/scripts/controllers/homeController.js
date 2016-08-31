class HomeController {

    constructor(homeView, requester, baseServiceUrl, appId, postsPerPage) {
        this._homeView = homeView;
        this._requester = requester;
        this._baseServiceUrl = baseServiceUrl;
        this._appId = appId;
    }

    showGuestPage(currentPage, postsPerPage) {

        currentPage = currentPage || 1;

        console.log(' hey we have tranfered it guste page ' + currentPage)
        let _that = this;

        let recentPosts = [];

        let requestUrl = this._baseServiceUrl + "/appdata/" + this._appId + "/posts";

        this._requester.get(requestUrl,
            function success(data) {
                let currentId = 1;

                var numberOfPostsTotal = data.length;
                console.log('Total number of posts '+ numberOfPostsTotal);
                var numberOfPages = Math.ceil(numberOfPostsTotal/postsPerPage);
                console.log('Number of pages  ' + numberOfPages)

                data.sort(function (elem1, elem2) {
                    let date1 = new Date(elem1._kmd.ect);
                    let date2 = new Date(elem2._kmd.ect);
                    return date2 - date1;
                });

                //we get the paged conted after the data is sorted by date, because otherwise it woul be sorted on each page
                var actualPageIndex = currentPage - 1 // because indexing in array starts from 0 not 1 and it not usefriendly to have page with value 0;
                var startIndexIncluding = actualPageIndex*postsPerPage;
                var endIndexNotIncluding = startIndexIncluding + postsPerPage;
                console.log('getting posts form array from index '+ startIndexIncluding + ' to index ' + endIndexNotIncluding);
                var postsForCurrentPage = data.slice(startIndexIncluding , endIndexNotIncluding);
                console.log('Posts for currentPage ' + currentPage + ">>> " + postsForCurrentPage);

                for (let i = 0; i < data.length && i < 5; i++) {
                    data[i].postId = currentId;
                    currentId++;
                    recentPosts.push(data[i]);
                }

                _that._homeView.showGuestPage(recentPosts, postsForCurrentPage, numberOfPages);
            },
            function error(data) {
                showPopup('error', "Error loading posts!");
            }
        );
    }
    showSinglePost(data){
        let _that = this;
        let requestUrl = this._baseServiceUrl + "/appdata/" + this._appId + "/posts";


        _that._homeView.showSinglePost(data);
    }
    showUserPage(currentPage, postsPerPage) {

        currentPage = currentPage || 1;

        console.log(' hey we have tranfered it userpage page ' + currentPage)
        let _that = this;

        let recentPosts = [];

        let requestUrl = this._baseServiceUrl + "/appdata/" + this._appId + "/posts";

        this._requester.get(requestUrl,
            function success(data) {
                let currentId = 1;

                var numberOfPostsTotal = data.length;
                console.log('Total number of posts '+ numberOfPostsTotal);
                var numberOfPages = Math.ceil(numberOfPostsTotal/postsPerPage);
                console.log('Number of pages  ' + numberOfPages);

                data.sort(function (elem1, elem2) {
                    let date1 = new Date(elem1._kmd.ect);
                    let date2 = new Date(elem2._kmd.ect);
                    return date2 - date1;
                });

                //we get the paged conted after the data is sorted by date, because otherwise it woul be sorted on each page
                var actualPageIndex = currentPage - 1 // because indexing in array starts from 0 not 1 and it not usefriendly to have page with value 0;
                var startIndexIncluding = actualPageIndex*postsPerPage;
                var endIndexNotIncluding = startIndexIncluding + postsPerPage;
                console.log('getting posts form array from index '+ startIndexIncluding + ' to index ' + endIndexNotIncluding);
                var postsForCurrentPage = data.slice(startIndexIncluding , endIndexNotIncluding);
                console.log('Posts for currentPage ' + currentPage + ">>> " + postsForCurrentPage);

                for (let i = 0; i < data.length && i < 5; i++) {
                    data[i].postId = currentId;
                    currentId++;
                    recentPosts.push(data[i]);
                }

                _that._homeView.showUserPage(recentPosts,  postsForCurrentPage, numberOfPages);
            },
            function error(data) {
                showPopup('error', "Error loading posts!");
            }
        );
    }
    showAboutPage() {
        let _that = this;
        $('onclick',function () {
            _that._homeView.showAboutPage();
        })
    }
    getArticle() {
        let _that = this;
        let articleid = sessionStorage.getItem('id');
        let requestUrl = this._baseServiceUrl + "/appdata/" + this._appId + "/posts/" + articleid;


        _that._requester.get(requestUrl,
            function success(article) {
                _that._homeView.showSinglePost(article);
            },
            function error(data) {
                showPopup('error', "Error loading this article!");
            });
    }



}