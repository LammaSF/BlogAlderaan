class CommentView {
    constructor(selector, mainContentSelector) {
        this._selector = selector;
        this._mainContentSelector = mainContentSelector;
    }

    showCreateCommentPage(isLoggedIn) {
        let _that = this;

        let templateUrl = '';

        

        $.get(templateUrl, function (template) {
            let navSelector = Mustache.render(template, null);
            $(_that._selector).html(navSelector);
        });

        $.get('templates/form-create-comment.html', function (template) {
            var renderMainContent = Mustache.render(template, null);
            $(_that._mainContentSelector).html(renderMainContent);

            $('#commentAuthor').val(sessionStorage.getItem('fullname'));

            $('#create-new-comment-request-button').on('click', function (ev) {

                if (isLoggedIn != true) {
                    showPopup('error', "Please log in to be able to comment articles");
                    redirectUrl("#/login");
                }

                else {
                    let commentAuthor = $('#commentAuthor').val();
                    let commentContent = $('#commentContent').val();
                    let date = moment().format("MMMM Do YYYY, h:mm A");
                    let data = {
                        author: commentAuthor,
                        content: commentContent,
                        date: date,
                       articleid: sessionStorage.getItem('id')
                    };
                    triggerEvent('createComment', data);
                }
            });
        })
    }
}