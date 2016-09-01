class CommentController {
    constructor(commentView, requester, baseUrl, appId) {
        this._commentView = commentView;
        this._requester = requester;
        this._appId = appId;
        this._baseServiceUrl = baseUrl + "/appdata/" + appId + "/comments/";
    }

    showCreateCommentPage(data, isLoggedIn) {
        this._commentView.showCreateCommentPage(data, isLoggedIn);
    }

    createComment(requestData) {

        if (requestData.title.length < 8) {
            showPopup('error', "Comment title must consist of at least 8 symbols.");
            return;
        }

        // if (requestData.content.length < 10) {
        //    showPopup('error', "Post content must consist of atleast 10 symbols.");
        //    return;
        //  }

        let requestUrl = this._baseServiceUrl;

        this._requester.comment(requestUrl, requestData,
            function success(data) {
                showPopup('success', "You have successfully created a new comment.");
                redirectUrl("#/chat");
            },
            function error(data) {
                showPopup('error', "An error has occurred while attempting to create a new comment.");
            });
    }
    showSelectedComment(data) {
        this._postView.showSelectedComment(data);
    }
  
}