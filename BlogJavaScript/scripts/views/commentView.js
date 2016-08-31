class CommentView {

    constructor(wrapperSelector, mainContentSelector) {
        this._wrapperSelector = wrapperSelector;
        this._mainContentSelector = mainContentSelector;
    }

    showCreateCommentPage(data, isLoggedIn) {
        let _that = this;
        let templateUrl = isLoggedIn ? "templates/form-user.html" : "templates/form-guest.html";

        $.get(templateUrl, function(template) {
            let renderedWrapper = Mustache.render(template, null);
            $(_that._wrapperSelector).html(renderedWrapper);

            $.get('templates/create-comment.html', function (template) {
                var renderedContent = Mustache.render(template, null);
                $(_that._mainContentSelector).html(renderedContent);

                $('#author').val(data.fullname);

                $('#create-new-comment-request-button').on('click', function (ev) {
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

                    triggerEvent('createComment', data);
                });
            });
        });
    }
    
}