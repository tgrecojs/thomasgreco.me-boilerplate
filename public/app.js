var app = angular.module('app', ['ui.router', 'angular-flexslider']).

config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('home', {
            url: '/',
            views: {

                '': {
                    templateUrl: 'templates/home.html',
                    controller: 'RootCtrl'
                },

                'Header@home': {
                    templateUrl: 'templates/header.html',
                    controller: 'NavCtrl'
                },

                'Main-Content@home': {
                    templateUrl: 'templates/main-content.html',
                    controller : 'SliderCtrl'
                },
                'Footer@home': {
                    templateUrl: 'templates/footer.html',
                }
            }

        });
}]);

app.controller('RootCtrl', function($scope) {
    $scope.bar = [];

});

app.controller('NavCtrl', function($scope) {
    $(function() {
        $("#nav").tinyNav();
    });

});


app.controller('WijmoGalleryCtrl', function($scope) {
    $scope.vm = this;
});
app.controller('SliderCtrl', function($scope, $timeout) {
    $scope.slides = [
        'images/skills/AI6.png',
        'images/skills/cs6.png',
        'images/skills/js-logo.png',
        'images/skills/git.png',
        'images/skills/html5x300.png',
        'images/skills/yeoman.png',
        'images/skills/nodejs350.png',
        'images/skills/angular.png',
        'images/skills/firebase.png',
        'images/skills/grunt.png',
        'images/skills/sass320x320.png',
        'images/skills/bower.png'

    ];
});