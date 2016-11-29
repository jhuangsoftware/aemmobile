function ProductsCarousel() {

}

ProductsCarousel.prototype.drawProductsCarousel = function (collection) {
    var ThisClass = this;

    // make sure collection is valid
    if (collection.metadata.entityName) {
        collection.getChildren(function (data) {
            var collectionEntities = data;
            var processedConnectionEntities = {'entities': []};

            $.each(collectionEntities.entities, function () {
                var thisEntity = this;

                // turn ASYNC process to get entity thumbnail image into SYNC
                ThisClass.getProductCarouselItemImage(thisEntity, function (data) {
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

// when device is ready
document.addEventListener('deviceready', function () {
    // when DOM is ready
    $(document).ready(function() {
        var productsCarouselObj = new ProductsCarousel();
        var mboxName = 'target-global-mbox';
        var collectionName = '';

        // clear target cookies, this is important
        ADB.targetClearCookies();

        ADB.targetLoadRequest(
            function (value) {
                // success
                collectionName = value;
                console.log(collectionName);

                cq.mobile.context.getEntity(
                    collectionName,
                    'collection',
                    true,
                    function(data){
                        productsCarouselObj.drawProductsCarousel(data);
                    },
                    function(){
                        console.log('failed ' + collectionName);
                    }
                );
            },
            function () {
                // fail
                myTempVal = null;
                console.log('Failure: connecting to ' + mboxName);
            },
            mboxName,
            'none'
        );
    });
}, false);
