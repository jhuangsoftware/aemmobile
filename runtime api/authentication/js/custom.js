function PageAuthentication() {
    $('body').on('click', '#sign-in', function () {
        cq.mobile.user.launchSignInUX(function (error) {
            console.log(error);
        });
    });

}

PageAuthentication.prototype.drawPage = function (currentCollection, currentEntity) {
    this.hideLoginDialog();

    this.getImage(currentEntity, function (data) {
        currentEntity.thumbnailimage = data;

        var pageEntity = {'collection': currentCollection, 'entity': currentEntity};

        var theTemplateScript = $('#template-page').html();
        var theTemplate = Handlebars.compile(theTemplateScript);
        $('.home').empty();
        $('.home').append(theTemplate(pageEntity));
    });
};

PageAuthentication.prototype.drawLoginDialog = function () {
    var theTemplateScript = $('#template-login').html();
    var theTemplate = Handlebars.compile(theTemplateScript);
    var theDialog = theTemplate({});
    $('.home').empty();
    $('.home').append(theDialog);
    this.showLoginDialog();
};

PageAuthentication.prototype.showLoginDialog = function () {
    var $loginDialog = $('.home').find('.modal');
    if ($loginDialog.length) {
        $loginDialog.modal('show');
    }
};

PageAuthentication.prototype.hideLoginDialog = function () {
    var $loginDialog = $('.home').find('.modal');
    if ($loginDialog.length) {
        $loginDialog.modal('hide');
    }
};

PageAuthentication.prototype.getImage = function (entity, callbackFunc) {
    entity.getThumbnailImage(
        100,
        100,
        function (data) {
            callbackFunc(data);
        },
        function () {
            // on error
            callbackFunc();
        }
    );
};

window.onAppear = function () {
    $(document).ready(function () {
        var currentEntity = cq.mobile.context.entity;
        var currentCollection = cq.mobile.context.collection;

        var PageAuthenticationObj = new PageAuthentication();

        document.addEventListener('deviceready', function () {
            if (cq.mobile.user.isAuthenticated) {
                PageAuthenticationObj.drawPage(currentCollection, currentEntity);
            } else {
                PageAuthenticationObj.drawLoginDialog();
                cq.mobile.user.launchSignInUX(function (error) {
                    if (error.code == 12) {
                        PageAuthenticationObj.drawPage(currentCollection, currentEntity);
                    }
                });
            }
        }, false);
    });
};
