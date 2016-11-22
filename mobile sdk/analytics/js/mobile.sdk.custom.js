function printConsole(messageType, messageHead, messageText) {
    var theTemplateScript = $('#template-message').html();
    var theTemplate = Handlebars.compile(theTemplateScript);
    $('#output').append(theTemplate({'messagetype': messageType, 'messageheading': messageHead, 'messagetext': messageText}));
};

document.addEventListener('deviceready', function () {
    // Mobile SDK is now initialized, write your code in here
    ADB.getVersion(function (value) {
        var versionNum = value;
        $('#mobile-sdk-version').append(versionNum);
    }, function () {
        var versionNum = 1.0;
        $('#mobile-sdk-version').append(versionNum);
    });

    var trackName = '';
    var trackData = '';

    trackName = 'someTrackAction hit #1';
    trackData = {'my.test1': 'some test data #1'};

    ADB.trackAction(trackName, trackData);
    printConsole('success', trackName, JSON.stringify(trackData));

    trackName = 'someTrackAction hit #2';
    trackData = {'my.test1': 'some test data #1', 'my.testEvent1': '1'};

    ADB.trackAction(trackName, trackData);
    printConsole('success', trackName, JSON.stringify(trackData));

    trackName = 'someTrackState hit #1';
    trackData = {'my.test1': 'some test data #2'};

    ADB.trackAction(trackName, trackData);
    printConsole('success', trackName, JSON.stringify(trackData));

    trackName = 'someTrackState hit #2';
    trackData = {'my.test1': 'some test data #2', 'my.testEvent1': '1'};

    ADB.trackAction(trackName, trackData);
    printConsole('success', trackName, JSON.stringify(trackData));
}, false);