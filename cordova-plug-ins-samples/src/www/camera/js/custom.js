function CordovaPluginCamera(pictureSourceType, destinationType) {
    this.pictureSource = pictureSourceType;
    this.destinationType = destinationType;
}

CordovaPluginCamera.prototype.onDeviceReady = function () {
    this.pictureSource = navigator.camera.PictureSourceType;
    this.destinationType = navigator.camera.DestinationType;
};

CordovaPluginCamera.prototype.getPictureSource = function () {
    return this.pictureSource;
};

CordovaPluginCamera.prototype.onPhotoDataSuccess = function (imageData) {
    // Uncomment to view the base64-encoded image data
    // console.log(imageData);
    var smallImageObj = {
        'src': 'data:image/jpeg;base64,' + imageData
    };

    var theTemplateScript = $('#template-camera-image-small').html();
    var theTemplate = Handlebars.compile(theTemplateScript);
    $('#camera-images').append(theTemplate(smallImageObj));

    $('#messages').empty();
};

// Called when a photo is successfully retrieved
CordovaPluginCamera.prototype.onPhotoURISuccess = function (imageURI) {
    // Uncomment to view the image file URI
    // console.log(imageURI);
    var largeImageObj = {
        'src': imageURI
    };

    var theTemplateScript = $('#template-camera-image-large').html();
    var theTemplate = Handlebars.compile(theTemplateScript);
    var theTemplatedData = theTemplate(largeImageObj);
    $('#camera-images').append(theTemplatedData);

    $('#messages').empty();
};

CordovaPluginCamera.prototype.capturePhoto = function () {
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(this.onPhotoDataSuccess, this.onFail, {
        quality: 50,
        destinationType: this.destinationType.DATA_URL
    });
};

CordovaPluginCamera.prototype.capturePhotoEdit = function () {
    // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
    navigator.camera.getPicture(this.onPhotoDataSuccess, this.onFail, {
        quality: 20,
        allowEdit: true,
        destinationType: this.destinationType.DATA_URL
    });
};

CordovaPluginCamera.prototype.getPhoto = function (source) {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(this.onPhotoURISuccess, this.onFail, {
        quality: 50,
        destinationType: this.destinationType.FILE_URI,
        sourceType: source
    });
};

CordovaPluginCamera.prototype.onFail = function (message) {
    var errorObj = {
        'message': message
    };

    var theTemplateScript = $('#template-camera-alert-error').html();
    var theTemplate = Handlebars.compile(theTemplateScript);
    $('#messages').empty();
    $('#messages').append(theTemplate(errorObj));
};

var CordovaPluginCameraObj = new CordovaPluginCamera();

$(document).ready(function () {
    document.addEventListener('deviceready', function () {
        CordovaPluginCameraObj.onDeviceReady();
    }, false);

    $('#capture-photo').on('click', function () {
        CordovaPluginCameraObj.capturePhoto();
    });

    $('#capture-photo-edit').on('click', function () {
        CordovaPluginCameraObj.capturePhotoEdit();
    });

    $('#get-photo-photo-library').on('click', function () {
        CordovaPluginCameraObj.getPhoto(CordovaPluginCameraObj.getPictureSource().PHOTOLIBRARY);
    });

    $('#get-photo-saved-photo-album').on('click', function () {
        CordovaPluginCameraObj.getPhoto(CordovaPluginCameraObj.getPictureSource().SAVEDPHOTOALBUM);
    });
});