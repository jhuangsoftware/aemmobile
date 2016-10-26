document.addEventListener("deviceready", function() {
    // Mobile SDK is now initialized, write your code in here
    ADB.trackAction("someTrackAction hit #1",
                    [
                        {
                            "my.test1": "some test data #1"
                        },
                        {
                            "my.testEvent1": "1"
                        }
                    ]);
    ADB.trackState("someTrackState hit #2",
                   [
                        {
                            "my.test1": "some test data #2"
                        },
                        {
                            "my.testEvent1": "1"
                        }  
                    ]);
    ADB.getVersion(
                    function (value) {
                        var versionNum = value;
                        console.log(versionNum);
                    }, 
                    function () {
                        var versionNum = 1.0;
                        console.log(versionNum);
                    });
}, false);