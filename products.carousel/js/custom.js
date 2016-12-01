function ProductsCarousel() {

}

ProductsCarousel.prototype.drawProductsCarousel = function (collection, ignoreEntity) {
    var ThisClass = this;

    // make sure collection is valid
    if (collection.metadata.entityName) {
        collection.getChildren(function (data) {
            var collectionEntities = data;
            var filteredCollectionEntities = {'entities': []};
            var processedConnectionEntities = {'entities': []};

            // filter out entity to be ignored
            $.each(collectionEntities.entities, function () {
                if (this.id != ignoreEntity.id) {
                    var modifiedDate = new Date(this.metadata.modified);
                    var today = new Date();
                    var threeDaysAgo = new Date();
                    threeDaysAgo.setDate(today.getDate() - 3);

                    if(modifiedDate.getTime() > threeDaysAgo.getTime()) {
                        filteredCollectionEntities.entities.push(this);
                    }
                }
            });

            $.each(filteredCollectionEntities.entities, function () {
                var thisEntity = this;

                // turn ASYNC process to get entity thumbnail image into SYNC
                ThisClass.getProductCarouselItemImage(thisEntity, function (data) {
                    thisEntity.thumbnailimage = data;
                    processedConnectionEntities.entities.push(thisEntity);

                    if (filteredCollectionEntities.entities.length == processedConnectionEntities.entities.length) {
                        var theTemplateScript = $('#template-products-carousel').html();
                        var theTemplate = Handlebars.compile(theTemplateScript);
                        $('.home').append(theTemplate(processedConnectionEntities));
                    }
                });
            });
        });
    }
};

ProductsCarousel.prototype.getProductCarouselItemImage = function (entity, callbackFunc) {
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
    var productsCarouselObj = new ProductsCarousel();

    var currentEntity = cq.mobile.context.entity;
    var currentCollection = cq.mobile.context.collection;

    productsCarouselObj.drawProductsCarousel(currentCollection, currentEntity);
}, false);
