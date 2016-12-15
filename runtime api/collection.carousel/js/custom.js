function CollectionCarousel() {

}

CollectionCarousel.prototype.drawCarousel = function (collection) {
    var ThisClass = this;

    // make sure collection is valid
    if (collection.metadata.entityName) {
        collection.getChildren(function (data) {
            var collectionEntities = data;
            var processedConnectionEntities = {'entities': []};

            $.each(collectionEntities.entities, function () {
                var thisEntity = this;

                // turn ASYNC process to get entity thumbnail image into SYNC
                ThisClass.getCarouselItemImage(thisEntity, function (data) {
                    thisEntity.thumbnailimage = data;
                    processedConnectionEntities.entities.push(thisEntity);

                    if (collectionEntities.entities.length == processedConnectionEntities.entities.length) {
                        var theTemplateScript = $('#template-products-carousel').html();
                        var theTemplate = Handlebars.compile(theTemplateScript);
                        $('.home').empty();
                        $('.home').append(theTemplate(processedConnectionEntities));
                    }
                });
            });
        });
    }
};

CollectionCarousel.prototype.getCarouselItemImage = function (entity, callbackFunc) {
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

// when device is ready
document.addEventListener('deviceready', function () {
    // when DOM is ready
    $(document).ready(function() {
        var currentEntity = cq.mobile.context.entity;
        var collectionName = currentEntity.metadata.department;

        var collectionCarouselObj = new CollectionCarousel();

        cq.mobile.context.getEntity(
            collectionName,
            'collection',
            true,
            function(data){
                collectionCarouselObj.drawCarousel(data);
            },
            function(){
                console.log('failed ' + collectionName);
            }
        );
    });
}, false);
