class ChatController {

    constructor(chatView, requester, baseServiceUrl, appId, postsPerPage) {
        this._homeView = chatView;
        this._requester = requester;
        this._baseServiceUrl = baseServiceUrl+ "/appdata/" + appId + "/comments/";;
        this._appId = appId;
    }

    showAboutPage() {
        let _that = this;
        $('onclick',function () {
            _that._homeView.showAboutPage();
        })
    }
    showCommentsPage() {
        let _that = this;
        $('onclick',function () {
            _that._commentView.showCommentsPage();
        })
    }
    

}