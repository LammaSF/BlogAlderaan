class PostView {

    constructor(wrapperSelector, mainContentSelector) {
        this._wrapperSelector = wrapperSelector;
        this._mainContentSelector = mainContentSelector;
    }

    showCreatePostPage(data, isLoggedIn) {
        let _that = this;
        let templateUrl = isLoggedIn ? "templates/form-user.html" : "templates/form-guest.html";

        $.get(templateUrl, function(template) {
            let renderedWrapper = Mustache.render(template, null);
            $(_that._wrapperSelector).html(renderedWrapper);

            $.get('templates/create-post.html', function (template) {
                var renderedContent = Mustache.render(template, null);
                $(_that._mainContentSelector).html(renderedContent);

                $('#author').val(data.fullname);

                $('#create-new-post-request-button').on('click', function (ev) {
                    let title = $('#title').val();
                    let author = $('#author').val();
                    let content = $('#content').val();
                    let date = moment().format("MMMM Do YYYY");

                    let data = {
                        title: title,
                        author: author,
                        content: content,
                        date: date
                    };

                    triggerEvent('createPost', data);
                });
            });
        });
    }
    showSelectedArticle(article) {
        let _that = this;
        let theData = {
            selectedArticle: article
           
        };
        $.get('templates/single-post.html', function (template) {
            var renderMainContent = Mustache.render(template, theData);
            $(_that._mainContentSelector).html(renderMainContent);
        });
    }
    showEditArticlePage(data) {

        let _that = this;
        let templateUrl;
        let authToken = sessionStorage['_authToken'];
        if(authToken != null && authToken != 'undefined') {
            templateUrl = "templates/form-user.html";
        }
        else {
            templateUrl = "templates/form-guest.html";
        }

        $.get(templateUrl, function (template) {
            let navSelector = Mustache.render(template, null);
            $(_that._wrapperSelector).html(navSelector);
        });


        $.get('templates/form-edit-post.html', function (template) {

            var renderMainContent = Mustache.render(template, null);
            $(_that._mainContentSelector).html(renderMainContent);
            $('#article-author').val(sessionStorage.getItem('fullname'));
            document.getElementById('content').value = data.content;
            document.getElementById('title').value = data.title;
            let articleId = data._id;

            $('#edit-article-request-button').on('click', function (ev) {
                let authorName = sessionStorage.getItem("fullname");
                let date = moment().format("MMMM Do YYYY,h:mm A");
                let data = {
                    "title":  document.getElementById('title').value,
                    "author": authorName,
                    "content": document.getElementById('content').value,
                    "date": date,
                    "_id": articleId
                };
                triggerEvent('editArticle', data);
            })
        });
    }
}