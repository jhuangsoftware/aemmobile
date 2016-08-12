$(document).ready(function () {
    var AccessManagerObj = new AccessManager();

    var $authenticationModal = $('#authentication-modal');

    AccessManagerObj.init(function(){
        $authenticationModal.modal();
        $authenticationModal.find('.alert-danger').hide();

        $authenticationModal.on('click', '.login', function(){
            $authenticationModal.find('.alert-danger').hide();

            var username = $authenticationModal.find('.username').val();
            var password = $authenticationModal.find('.password').val();

            AccessManagerObj.authenticate(username, password, function(data){
                if(data) {
                    // success
                    $authenticationModal.modal('hide');
                } else {
                    // failed
                    $authenticationModal.find('.alert-danger').show();
                }
            });
        });
    });
});