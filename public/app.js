var app = angular.module('app', ['firebase', 'ui.router.config', 'angular-flexslider', 'angularModalService'])


angular.module('ui.router.config', ['ui.router'])
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('home', {
            url: '/',
            views: {
                '': {
                    templateUrl: './templates/home.html',
                    controller: 'RootCtrl'

                },
                'Header@home': {
                    templateUrl: './templates/header.html',
                    controller: 'NavCtrl'
                },

                'Main-Content@home': {
                    templateUrl: './templates/main-content.html',
                    controller: 'SliderCtrl'
                },
                'Footer@home': {
                    templateUrl: './templates/footer.html'
                }
            }
        })
        .state('about', {
            url: '/this-app',
            views: {
                '': {
                    templateUrl: './templates/about.html'
                },
                'Header@about': {
                    templateUrl: './templates/header.html',
                    controller: 'NavCtrl'
                },

                'About-Content@about': {
                    templateUrl: './templates/about-content.html',
                    controller: 'SliderCtrl'
                },
                'Sidebar@about': {
                    templateUrl: './templates/about-sidebar.html'
                },
                'Footer@about': {
                    templateUrl: './templates/footer.html'
                }
            }
        })
        .state('blog', {
            url: '/blog',
            views: {
                '': {
                    templateUrl: './templates/blog.html'
                },
                'Header@blog': {
                    templateUrl: './templates/header.html',
                    controller: 'NavCtrl'
                },

                'Blog-Roll@blog': {
                    templateUrl: './templates/blog-roll.html'
                },
                'Sidebar@blog': {
                    templateUrl: './templates/blog-sidebar.html'
                },
                'Footer@blog': {
                    templateUrl: './templates/footer.html'
                }
            }
        })
        .state('contact', {
            url: '/contact',
            views: {
                '': {
                    templateUrl: './templates/contact.html'
                },
                'Header@contact': {
                    templateUrl: './templates/header.html',
                    controller: 'NavCtrl'
                },

                'Contact-Form@contact': {
                    templateUrl: './templates/form.html',
                    controller: 'firebaseCtrl'
                },
                'Footer@contact': {
                    templateUrl: './templates/footer.html'
                }
            }
        })
        .state('login', {
            url: '/contact',
            views: {
                '': {
                    templateUrl: './templates/contact.html'
                },
                'Header@contact': {
                    templateUrl: './templates/Header.html',
                    controller: 'NavCtrl'
                },

                'Contact-Form@contact': {
                    templateUrl: './templates/form.html',
                    controller: 'SliderCtrl'
                },
                'Footer@contact': {
                    templateUrl: './templates/Footer.html'
                }
            }
        })


    //END ROUTE CONFIGURTATION
}]);

app.value('fbURL', 'https://rest-api.firebaseio.com/')
    .factory('Person', function(fbURL, $firebase) {
        return $firebase(new Firebase(fbURL)).$asArray();
    });


app.controller('firebaseCtrl', function($scope, Person) {
    $scope.add = function() {
        var save = Person.$add({
            name: $scope.name,
            email: $scope.email,
            location: $scope.location,
            reason: $scope.reason,
            message: $scope.message
        });

        $scope.name = '';
        $scope.email = '';
        $scope.location = '';
        $scope.reason = '';
        $scope.message = '';

        if (save) {
            alert('saved successfully');
        } else {
            alert('something went wrong');
        }
    }
    });





app.controller('RootCtrl', function($scope, $http) {
    $scope.blog;


    $http.get('api.tumblr.com/v2/blog/tg18509.tumblr.com/posts?api_key=CnNeCnRgvPewXintuzhdtOoXJ1IRbPZv3vOVIE7cYhbaKtYOwf?callback=JSON_CALLBACK')
    .then(function (data) {
        console.log(data);
    })
});
    //





app.controller('MainModalCtrl', function($scope, ModalService) {

    $scope.show = function() {
        ModalService.showModal({
            templateUrl: './templates/main-modal.html',
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
});
app.controller('SliderCtrl', function($scope, $timeout) {
    $scope.slides = [
        './images/skills/AI6.png',
        './images/skills/cs6.png',
        './images/skills/js-logo.png',
        './images/skills/git.png',
        './images/skills/html5x300.png',
        './images/skills/yeoman.png',
        './images/skills/nodejs350.png',
        './images/skills/Angular.png',
        './images/skills/firebase.png',
        './images/skills/grunt.png',
        './images/skills/Sass320x320.png',
        './images/skills/Bower.png'

    ];
});
