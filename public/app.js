var app = angular.module('app', ['ui.router', 'angular-flexslider', 'angularModalService']).

config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('home', {
            url: '/',
            views: {
                '' : {
                    templateUrl: 'templates/home.html'
                },
                'Header@home': {
                    templateUrl: 'templates/Header.html',
                    controller: 'NavCtrl'
                },

                'Main-Content@home': {
                    templateUrl: 'templates/Main-Content.html',
                    controller: 'SliderCtrl'
                },
                'Footer@home': {
                    templateUrl: 'templates/Footer.html',
                }
            }
        })
        .state('blog', {
            url: '/blog',
            views: {
                '' : {
                    templateUrl: 'templates/blog.html'
                },
                'Header@blog': {
                    templateUrl: 'templates/Header.html',
                    controller: 'NavCtrl'
                },

                'Blog-Content@blog': {
                    templateUrl: 'templates/blog-content.html',
                    controller: 'SliderCtrl'
                },
                'Sidebar@blog': {
                    templateUrl: 'templates/blog-sidebar.html'
                },
                'Footer@blog': {
                    templateUrl: 'templates/Footer.html',
                }
            }
        })


    //END ROUTE CONFIGURTATION
    }]);
      

app.controller('RootCtrl', function($scope) {
    $scope.bar = [];

});

app.controller('ModalCtrl', function($scope, ModalService) {

            $scope.yesNoResult = null;
            $scope.complexResult = null;
            $scope.customResult = null;

            $scope.showYesNo = function() {

                ModalService.showModal({
                    templateUrl: "yesno/yesno.html",
                    controller: "YesNoController"
                }).then(function(modal) {
                    modal.element.modal();
                    modal.close.then(function(result) {
                        $scope.yesNoResult = result ? "You said Yes" : "You said No";
                    });
                });

            };

            $scope.showComplex = function() {

                ModalService.showModal({
                    templateUrl: "templates/modal.html",
                    controller: "ComplexController",
                    inputs: {
                        title: "A More Complex Example"
                    }
                }).then(function(modal) {
                    modal.element.modal();
                    modal.close.then(function(result) {
                        $scope.complexResult = "Name: " + result.name + ", age: " + result.age;
                    });
                });

            };

            $scope.showCustom = function() {

                ModalService.showModal({
                    templateUrl: "custom/custom.html",
                    controller: "CustomController"
                }).then(function(modal) {
                    modal.close.then(function(result) {
                        $scope.customResult = "All good!";
                    });
                });

            }
        });

        

        app.controller('NavCtrl', function($scope) {
            $(function() {
                $("#nav").tinyNav();
            });

        });
  



        app.controller('WijmoGalleryCtrl', function($scope) {
            $scope.vm = this;
        }); app.controller('SliderCtrl', function($scope, $timeout) {
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