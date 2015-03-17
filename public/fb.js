var fbService = angular.module('fbService', ['firebase', '$scope'])

fbService.value('fbURL', 'https://rest-api.firebaseio.com/');

fbService.factory('Message', function(fbURL, $firebase) {
    return $firebase(new Firebase(fbURL)).$asArray();

});

fbService.controller('formController',
    function($scope, Message) {
        $scope.add = function() {
            //ADD TO FIREBASE
            var save = Message.$add({
                name: $scope.name,
                location: $scope.location,
                email: $scope.email,
                phone: $scope.phone,
                lawArea: $scope.lawArea,
                body: $scope.msg
            });


            //RESET MESSAGE
            $scope.name = "";
            $scope.location = "";
            $scope.email = "";
            $scope.phone = "";
            $scope.lawArea = "";
            $scope.msg = "";
        }
    }
);
     