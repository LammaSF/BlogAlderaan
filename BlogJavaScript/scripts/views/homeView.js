class HomeView {
    constructor(wrapperSelector, mainContentSelector) {
        this._wrapperSelector = wrapperSelector;
        this._mainContentSelector = mainContentSelector;
    }

    showGuestPage(sideBarData, mainData, numberOfPages) {
        console.log('The main data is paged so we see only fixed number here in Gust page ' + mainData);
        console.log('The total number of pages for Guest page is ' + numberOfPages);

        var pages = [];
        for(var i = 1; i <= numberOfPages; i++){
            pages[i-1] = i;
        }

        let _that = this;
        $.get('templates/welcome-guest.html', function (template) {
            let renderedWrapper = Mustache.render(template, null);

            $(_that._wrapperSelector).html(renderedWrapper);

            $.get('templates/posts.html', function (template) {

                var blogPosts = {
                    blogPosts: mainData,
                    pages:pages
                };

                console.log(blogPosts);
                let renderedPosts = Mustache.render(template, blogPosts);
                $('.articles').html(renderedPosts);
            });

            $.get('templates/recent-posts.html', function (template) {
                let recentPosts = {
                    recentPosts: sideBarData
                };

                let renderedRecentPosts = Mustache.render(template, recentPosts);
                $('.recent-posts').html(renderedRecentPosts);
            });
        });
    }

    showUserPage(sideBarData, mainData, numberOfPages) {
        console.log('The main data is paged so we see only fixed number here in User page ' + mainData);
        console.log('The total number of pages for User page is ' + numberOfPages);


        var pages = [];
        for(var i = 1; i <= numberOfPages; i++){
            pages[i-1] = i;
        }

        let _that = this;
        $.get('templates/welcome-user.html', function (template) {
            let renderedWrapper = Mustache.render(template, sideBarData);

            $(_that._wrapperSelector).html(renderedWrapper);

            $.get('templates/posts.html', function (template) {

                var blogPosts = {
                    blogPosts: mainData,
                    pages:pages
                };

                console.log(blogPosts);
                let renderedPosts = Mustache.render(template, blogPosts);
                $('.articles').html(renderedPosts);
            });

            $.get('templates/recent-posts.html', function (template) {
                let recentPosts = {
                    recentPosts: sideBarData
                };

                let renderedRecentPosts = Mustache.render(template, recentPosts);
                $('.recent-posts').html(renderedRecentPosts);
            });
        });
    }
    showAboutPage() {
        let _that = this;
        let templateUrl;

        $.get(templateUrl,function (template) {
            let navSelector = Mustache.render(template,null);
            $(_that._selector).html(navSelector);
        });
        $.get('templates/about.html', function (template) {
            let renderMainContent = Mustache.render(template, null);
            $(_that._mainContentSelector).html(renderMainContent);
        });
    }
    showCommentPage() {
        let _that = this;
        let templateUrl;

        $.get(templateUrl,function (template) {
            let navSelector = Mustache.render(template,null);
            $(_that._selector).html(navSelector);
        });
        $.get('templates/chat.html', function (template) {
            let renderMainContent = Mustache.render(template, null);
            $(_that._mainContentSelector).html(renderMainContent);
        });
    }

    showSinglePost(article) {
        let _that = this;
        let singlePost = {
            singlePost: article
        };


        $.get('templates/single-post.html', function (template) {

            let renderedSinglePost = Mustache.render(template, singlePost);
            $('.main-content').html(renderedSinglePost);
        });
    }
}