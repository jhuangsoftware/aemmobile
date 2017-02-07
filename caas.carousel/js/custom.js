function CaasCarousel(domain, jsonPath) {
    var ThisClass = this;
    ThisClass.domain = domain;
    ThisClass.jsonPath = jsonPath;

    ThisClass.getJson(function(jsonData){
       ThisClass.drawCarousel(jsonData);
    });
}

CaasCarousel.prototype.saveJson = function (jsonData) {
    localStorage.setItem('data', JSON.stringify(jsonData));
};

CaasCarousel.prototype.loadJson = function () {
    return JSON.parse(localStorage.getItem('data') );
};

CaasCarousel.prototype.getJson = function (callbackFunc) {
    var ThisClass = this;
    var jsonData;

    $.ajax({
        type: 'POST',
        url: this.domain + this.jsonPath,
        success: function(data){
            console.log(data);
        },
        error: function(){
        }
    });

    /*
    $.ajax({
        dataType: "json",
        url: this.domain + this.jsonPath,
        success: function(data){
            jsonData = data;
            ThisClass.saveJson(jsonData);

            if(callbackFunc){
                callbackFunc(jsonData);
            }
        },
        error: function(){
            jsonData = ThisClass.loadJson();

            if(callbackFunc){
                callbackFunc(jsonData);
            }
        }
    });
    */
};

CaasCarousel.prototype.drawCarousel = function (jsonData) {
    var carouselImages = {'images': []};

    $.each(jsonData, function(){
        // scan for page objects
        if(this.hasOwnProperty('root')){
            // scan for hero image in page object
            if(this.root.hasOwnProperty('hero_image')){
                carouselImages.images.push({'title': this['jcr:title'], 'image': this.root.hero_image.fileReference});
            }
        }

    });

    var theTemplateScript = $('#template-image-carousel').html();
    var theTemplate = Handlebars.compile(theTemplateScript);
    $('.home').empty();
    $('.home').append(theTemplate(carouselImages));
};

$(document).ready(function() {
    var CaasCarouselObj = new CaasCarousel('http://localhost:4503', '/content/entities/we_retail_mobile_spa/experience.caas.1.json');

});
