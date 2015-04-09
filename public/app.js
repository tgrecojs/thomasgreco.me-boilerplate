var app = angular.module('app', ['firebase',
    'ui.router.config',
    'angular-flexslider',
    'angularModalService',
    'ngResource',
])


angular.module('ui.router.config', ['ui.router'])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('home', {
                url: '/',
                views: {
                    '': {
                        templateUrl: './templates/home.html'
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
                        templateUrl: './templates/firebase.html',
                        controller: 'FirebaseFormController'
                    },
                    'Footer@contact': {
                        templateUrl: './templates/footer.html'
                    }
                }
            })
            .state('admin', {
                url: '/admin',
                views: {
                    '': {
                        templateUrl: './templates/login.html'
                    },
                    'Header@admin': {
                        templateUrl: './templates/nav.html',
                        controller: 'NavController'
                    },
                    'Blog-UI@admin': {
                        templateUrl: './templates/post.html',
                        controller: 'postController'
                    },
                    'Footer@admin': {
                        templateUrl: './templates/footer.html'
                    }
                }
            })


        //END ROUTE CONFIGURTATION
    }]);



app.factory('Posts', function($resource) {
    var Posts = $resource('https://api.mongolab.com/api/1/databases/thomasgreco/collections/posts/:id', {
        apiKey: 'VG9Bt0pY7wiNT8yuD9W21auYAgjq8C5W',
        id: '@_id.$oid'
    });

    return Posts;
});



app.controller('postController', function($scope, Posts) {

    $scope.posts = Posts.query();

    $scope.remove = function(post) { //Posts['delete']({}, post); //alternate
        post.$delete();
        alert('post removed. Refresh page to reflect changes.');
    };

    $scope.add = function() {
        var post = new Posts({
            postTitle: $scope.postTitle,
            postAuthor: $scope.postAuthor,
            postMessage: $scope.postMessage
        });
        post.$save();
        //Posts.save(post); //alternate method
        alert('post added. Refresh page to reflect changes.');
    };

});


app.factory('Contacts', function($resource) {
    var Contacts = $resource('https://api.mongolab.com/api/1/databases/thomasgreco/collections/contacts/:id', {
        apiKey: 'VG9Bt0pY7wiNT8yuD9W21auYAgjq8C5W',
        id: '@_id.$oid'
    });

    return Contacts;
});


app.controller('contactController', function($scope, Contacts) {

    $scope.contacts = Contacts.query();

    $scope.remove = function(contact) { //Posts['delete']({}, post); //alternate
        contact.$delete();
        alert('contact removed. Refresh page to reflect changes.');
    };

    $scope.add = function() {
        var contact = new Contacts({
            contactName: $scope.contactName,
            contactEmail: $scope.contactEmail,
            contactLocation: $scope.contactLocation,
            contactReason: $scope.contactReason,
            contactMessage: $scope.contactMessage
        });
        contact.$save();
        //Posts.save(post); //alternate method
        alert('contact added. Refresh page to reflect changes.');
    };

});


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

app.controller('FirebaseFormController', ['$scope', '$firebase',
    function($scope, $firebase) {
        //CREATE A FIREBASE REFERENCE
        var ref = new Firebase("https://zaperr.firebaseio.com/");

        // GET MESSAGES AS AN ARRAY
        $scope.messages = $firebase(ref).$asArray();



        //ADD MESSAGE METHOD
        $scope.add = function(e) {

            //LISTEN FOR RETURN KEY
            if (e.keyCode === 13 && $scope.message) {
                //ALLOW CUSTOM OR ANONYMOUS USER NAMES


                //ADD TO FIREBASE
                $scope.messages.$add({
                    name: $scope.name,
                    email: $scope.email,
                    location: $scope.location,
                    reason: $scope.reason,
                    message: $scope.message
                });


                //RESET MESSAGE
                $scope.message = "";
                $scope.name = "";
                $scope.location = "";
                $scope.email = "";
                $scope.reason = "";
            }
        }
    }
]);








app.controller('BlogController', function($scope, $http) {


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