var app = angular.module('app', ['ui.router', 'angular-flexslider', 'angularModalService'])
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('home', {
            url: '/',
            views: {
                '' : {
                    templateUrl: 'templates/home.html',
                    controller : 'MainModalCtrl'

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
        .state('contact', {
            url: '/contact',
            views: {
                '' : {
                    templateUrl: 'templates/contact.html'
                },
                'Header@contact': {
                    templateUrl: 'templates/Header.html',
                    controller: 'NavCtrl'
                },

                'Contact-Form@contact': {
                    templateUrl: 'templates/form.html',
                    controller: 'SliderCtrl'
                },
                'Footer@contact': {
                    templateUrl: 'templates/Footer.html',
                }
            }
        })


    //END ROUTE CONFIGURTATION
    }]);

      

app.controller('RootCtrl', function($scope) {
    $scope.bar = [];

});



app.controller('MainModalCtrl', function($scope, ModalService) {
    
    $scope.show = function() {
        ModalService.showModal({
            templateUrl: 'templates/main-modal.html',
            controller: "ModalController"
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
                $scope.message = "You said " + result;
            });
        });
    };
    
});

app.controller('ModalController', function($scope, close) {
  
 $scope.close = function(result) {
    close(result, 500); // close, but give 500ms for bootstrap to animate
 };

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