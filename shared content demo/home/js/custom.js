document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    var entity = cq.mobile.context.entity;
    var entityRootPath = entity.rootPath;
    localStorage.setItem('sharedcontentrootpath', entityRootPath);

    $('#rootpath').append(localStorage.getItem('sharedcontentrootpath'));
}