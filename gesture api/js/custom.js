$(document).ready(function () {
    // init owl carousels
    var carouselWithGesture = $('#carousel-with-gesture');

    carouselWithGesture.owlCarousel({
        nav: false,
        merge: true,
        mouseDrag: false,
        touchDrag: true,
        pullDrag: false,
        responsive: {
            0: {
                items: 1
            }
        }
    });

    adobeDPS.Gesture.disableNavigation(carouselWithGesture[0]);

    carouselWithGesture.on('touchstart.owl.carousel', '.owl-item', function(event) {
        carouselWithGesture.pageXStart = event.originalEvent.pageX;
    });

    carouselWithGesture.on('touchmove.owl.carousel', '.owl-item', function(event) {
        carouselWithGesture.pageXEnd = event.originalEvent.pageX;
        var deltaX = carouselWithGesture.pageXStart - carouselWithGesture.pageXEnd;

        carouselWithGesture.trigger('gesture', [deltaX]);
    });

    carouselWithGesture.on('gesture', function(event, parameters) {
        // negative is left, positive is right
        if(parameters < 0) {
            if($(this).find('.owl-item:first.active').length > 0){
                // first and swipe left
                adobeDPS.Gesture.relinquishCurrentGesture();
            }
        } else {
            if($(this).find('.owl-item:last').hasClass('active')){
                // last and swipe right
                adobeDPS.Gesture.relinquishCurrentGesture();
            }
        }
    });

    $('#carousel-without-gesture').owlCarousel({
        nav: false,
        merge: true,
        responsive: {
            0: {
                items: 1
            }
        }
    });

    // toggle navigation ui
    adobeDPS.Gesture.enableNavigation($('#btn-toggle-navigation-ui')[0]);
    $('#btn-toggle-navigation-ui').on('click', function () {
        adobeDPS.Gesture.toggleNavigationUI();
    });

    // enable gesture api
    $('#enable-gesture').on('change', function () {
        adobeDPS.Gesture.enableNavigation($('body')[0]);
    });

    // disable gesture api
    $('#disable-gesture').on('change', function () {
        adobeDPS.Gesture.disableNavigation($('body')[0]);
    });
});