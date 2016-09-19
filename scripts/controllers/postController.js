class PostController {
    constructor(postView, requester, baseUrl, appId) {
        this._postView = postView;
        this._requester = requester;
        this._appId = appId;
        this._baseServiceUrl = baseUrl + "/appdata/" + appId + "/posts/";
    }

    showCreatePostPage(data, isLoggedIn) {
        this._postView.showCreatePostPage(data, isLoggedIn);
    }

    createPost(requestData) {

        if (requestData.title.length < 10) {
            showPopup('error', "Post title must consist of atleast 10 symbols.");
            return;
        }

       // if (requestData.content.length < 10) {
        //    showPopup('error', "Post content must consist of atleast 10 symbols.");
        //    return;
      //  }

        let requestUrl = this._baseServiceUrl;

        this._requester.post(requestUrl, requestData,
            function success(data) {
                showPopup('success', "You have successfully created a new post.");
                redirectUrl("#/");
            },
            function error(data) {
                showPopup('error', "An error has occurred while attempting to create a new post.");
            });
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
    showSelectedArticle(article) {
        this._postView.showSelectedArticle(article);
    }

    deleteArticle(articleId) {

        let requestUrl = this._baseServiceUrl + articleId;

        let headers = {};
        headers['Authorization'] = "Kinvey " + sessionStorage.getItem('_authToken');
        headers['Content-Type'] = "application/json";
        let requestData = {
            headers: headers
        };

        this._requester.delete(requestUrl, requestData,
            function success(response) {
                showPopup("success", "You have successfully deleted this article");
                redirectUrl("#/home")
            },
            function error(response) {
                showPopup("error", "You don't have authorization to delete this article");
            });
    }
    editArticlePage(data) {
        let requestUrl = this._baseServiceUrl + data;
        let _that = this;
        this._requester.get(requestUrl,
            function success(data) {
                showPopup('success', "Success loading this article!");
                _that._postView.showEditArticlePage(data);
            },
            function error() {
                showPopup('error', "Error loading this article!");
            });
    }

    editArticle(requestData) {

        if (requestData.content.length < 50) {
            showPopup('error', "Article content must consist of at least 50 symbols.");
            return;
        }
        let requestUrl = this._baseServiceUrl + requestData._id;
        let articleTitle = requestData.title;
        let articleText = requestData.content;
        let articleAuthor = requestData.author;
        let date = requestData.date;

        let request = {
            title: articleTitle,
            content: articleText,
            author: articleAuthor,
            date: date
        };
        this._requester.put(requestUrl, request,
            function success() {
                showPopup("success", "You have successfully edited this article.");
                redirectUrl("#/")
            },
            function error() {
              showPopup("error", "You are not log in or you are not the author.");
                //redirectUrl("#/")
            });
    }
}