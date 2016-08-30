class CommentController {
    constructor(commentView, requester, baseUrl, appKey) {
        this._commentView = commentView;
        this._requester = requester;
        this._appKey = appKey;
        this._baseServiceUrl = baseUrl + "/appdata/" + appKey + "/comments/";
    }

    showCreateCommentPage(isLoggedIn) {
        this._commentView.showCreateCommentPage(isLoggedIn);
    }

    createComment(requestData) {
        if (requestData.content.length < 5) {
            showPopup('error', "Comment must consist at least 10 characters.");
            return;
        }

        let requestUrl = this._baseServiceUrl;
        this._requester.post(requestUrl, requestData,
            function success(data) {
                showPopup('success', "You have successfully added a new comment.");
                redirectUrl("#/home");
            },
            function error(data) {
                showPopup('error', "An error has occurred while attempting to post a comment.");
            });
    }

    loadComments(requestData) {

        this._requester.get(this._baseServiceUrl,
            function success(data) {
                let commentList = [];
                for (let comment of data) {
                    if (comment['postid'] == requestData['_id'])  {
                        commentList.push(comment);
                    }
                }

                requestData['commentsList'] = commentList;

                triggerEvent('postCommentList', requestData);
            },

            function error(data) {
                showPopup('error', "Error");
            });
    }
}