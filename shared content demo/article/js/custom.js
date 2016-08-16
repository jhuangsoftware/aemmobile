$(document).ready(function () {
    var sharedContentRootPath;

    sharedContentRootPath = localStorage.getItem('sharedcontentrootpath');

    addHeaderPackage(sharedContentRootPath);

    addImage(sharedContentRootPath);
});

function addHeaderPackage(sharedContentRootPath) {
    var theTemplateScript = $('#template-header-bootstrap').html();
    var theTemplate = Handlebars.compile(theTemplateScript);
    $('head').append(theTemplate({ 'sharedcontentrootpath': sharedContentRootPath }));
}

function addImage(sharedContentRootPath) {
    var theTemplateScript = $('#template-image').html();
    var theTemplate = Handlebars.compile(theTemplateScript);
    $('body .container-fluid .row:last').append(theTemplate({ 'sharedcontentrootpath': sharedContentRootPath }));
}