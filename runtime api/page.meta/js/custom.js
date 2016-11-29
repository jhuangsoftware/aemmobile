function PageMeta() {

}

PageMeta.prototype.drawPage = function (currentCollection, currentEntity) {
    this.getImage(currentEntity, function (data) {
        currentEntity.thumbnailimage = data;

        var pageEntity = {'collection': currentCollection, 'entity': currentEntity};

        console.log(pageEntity);

        var theTemplateScript = $('#template-page').html();
        var theTemplate = Handlebars.compile(theTemplateScript);
        $('.home').append(theTemplate(pageEntity));
    });
};

PageMeta.prototype.getImage = function (entity, callbackFunc) {
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

document.addEventListener('deviceready', function () {
    var pageMetaObj = new PageMeta();

    var currentEntity = cq.mobile.context.entity;
    var currentCollection = cq.mobile.context.collection;

    pageMetaObj.drawPage(currentCollection, currentEntity);
}, false);
