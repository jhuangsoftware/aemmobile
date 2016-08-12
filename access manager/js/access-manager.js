function AccessManager() {
    this.expirationDurationSeconds = 12 * 60 * 60;
    this.expirationLabel = 'expirationseconds';

    this.getSecondsNow = function () {
        return Math.floor(Date.now() / 1000);
    };

    this.setExpiration = function () {
        var expirationFromNow = this.getSecondsNow() + this.expirationDurationSeconds;
        localStorage.setItem(this.expirationLabel, expirationFromNow);
    };

    this.getExpiration = function () {
        var expirationFromNow = localStorage.getItem(this.expirationLabel);

        // if undefined
        if (!expirationFromNow) {
            expirationFromNow = '0';
        }

        return parseInt(expirationFromNow);
    };

    this.isExpired = function () {
        var retValue = false;

        if (this.getSecondsNow() > this.getExpiration()) {
            retValue = true;
        }

        return retValue;
    };
}

AccessManager.prototype.init = function (callbackFunc) {
    if (this.isExpired()) {
        if (callbackFunc) {
            callbackFunc();
        }
    }
};

AccessManager.prototype.authenticate = function (username, password, callbackFunc) {
    var isValid = false;

    // sample hardcoded authentication
    // replace with your own authentication
    /*
    var ThisClass = this;
    $.ajax({
        url: 'http://localhost/authenticate',
        data: {'username': username, 'password': password},
        success: function (data) {
            // connection was made
            if(data.valid == true) {
                isValid = true;
                ThisClass.setExpiration();
            }

            if(callbackFunc) {
                callbackFunc(isValid);
            }
        },
        error: function () {
            // if no internet connection
            if(callbackFunc) {
                callbackFunc(isValid);
            }
        }
    });
    */

    // hardcoded username and password for demo
    var testAuthentication = {
        'username': 'jsmith',
        'password': '123'
    }

    if(username.toLowerCase() == testAuthentication.username && password == testAuthentication.password) {
        isValid = true;
        this.setExpiration();
    }

    if(callbackFunc) {
        callbackFunc(isValid);
    }
};

