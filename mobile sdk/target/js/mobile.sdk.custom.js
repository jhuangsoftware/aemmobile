function printConsole(messageType, messageHead, messageText) {
    var theTemplateScript = $('#template-message').html();
    var theTemplate = Handlebars.compile(theTemplateScript);
    $('#output').append(theTemplate({'messagetype': messageType, 'messageheading': messageHead, 'messagetext': messageText}));
};

document.addEventListener('deviceready', function () {
    ADB.getVersion(function (value) {
        var versionNum = value;
        $('#mobile-sdk-version').append(versionNum);
    }, function () {
        var versionNum = 1.0;
        $('#mobile-sdk-version').append(versionNum);
    });

    $(document).ready(function() {
        $('#test').on('click', function(){
            var mboxName = $('#mbox-name').val();

            // clear target cookies, this is important
            ADB.targetClearCookies();

            ADB.targetLoadRequest(
                function (value) {
                    // success
                    myTempVal = value;
                    printConsole('success', 'Success:', mboxName  + ' returned ' + value);
                },
                function () {
                    // fail
                    myTempVal = null;
                    printConsole('danger', 'Failure:', ' connecting to ' + mboxName);
                },
                mboxName,
                'none'
            );
        });
    });
}, false);