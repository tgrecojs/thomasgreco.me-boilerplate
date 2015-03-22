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
                    controller: 'BlogController'

                },
                'Header@home': {
                    templateUrl: './templates/nav.html',
                    controller: 'NavController'
                },

                'Main-Content@home': {
                    templateUrl: './templates/main-content.html',
                    controller: 'SliderController'
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
                    templateUrl: './templates/nav.html',
                    controller: 'NavController'
                },

                'Top-Content@about': {
                    templateUrl: './templates/top-content.html'
                },
                'Bottom-Content@about': {
                    templateUrl: './templates/bottom-content.html'
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
                    templateUrl: './templates/nav.html',
                    controller: 'NavController'
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
                    templateUrl: './templates/nav.html',
                    controller: 'NavController'
                },

                'Contact-Form@contact': {
                    templateUrl: './templates/form.html',
                    controller: 'FirebaseController'
                },
                'Footer@contact': {
                    templateUrl: './templates/footer.html'
                }
            }
        })
        .state('account', {
            url: '/account',
            views: {
                '': {
                    templateUrl: './templates/login.html'
                },
                'Header@account': {
                    templateUrl: './templates/nav.html',
                    controller: 'NavController'
                },
                'Account-Info@account': {
                    templateUrl: './templates/account.html'
                },
                'Footer@account': {
                    templateUrl: './templates/footer.html'
                }
            }
        })


    //END ROUTE CONFIGURTATION
}]);

app.value('fbURL', 'https://rest-api.firebaseio.com/')
    .factory('Person', function(fbURL, $firebase) {
        return $firebase(new Firebase(fbURL)).$asArray();
    });


app.controller('FirebaseController', function($scope, Person) {
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
            return alert('something went wrong');
        }
    }
    });






app.controller('RootController', function($scope, $http) {

    });
    //



app.controller('BlogController', function($scope, $http) {
$scope.realTimeData;

  var url = "http://api.tumblr.com/v2/blog/pitchersandpoets.tumblr.com/posts?api_key=CnNeCnRgvPewXintuzhdtOoXJ1IRbPZv3vOVIE7cYhbaKtYOwf" + "?callback=JSON_CALLBACK";

    $http.jsonp(url)
        .success(function(data){
            $scope.realTimeData = data;
        });
});





app.controller('MainModalController', function($scope, ModalService) {

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



app.controller('NavController', function($scope) {
    $(function() {
        $("#nav").tinyNav();
    });

});



app.controller('WijmoGalleryController', function($scope) {
    $scope.vm = this;
});
app.controller('SliderController', function($scope, $timeout) {
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
