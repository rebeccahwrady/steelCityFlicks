var app = angular.module('myFlicks', ['ngRoute']) //this is where you create your angular module

app.controller('myHomePageCtrl', ['$scope', '$rootScope', '$location', //this is the controller for the home page html
    function($scope, $rootScope, $location) {

    }
]);

app.controller('myAboutPageCtrl', ['$scope', '$rootScope', '$location', //this is the controller for the about page html
    function($scope, $rootScope, $location) {

    }
]);

app.controller('myMenuPageCtrl', ['$scope', '$rootScope', '$location', //this is the controller for the menu page html
    function($scope, $rootScope, $location) {

    }
]);

app.controller('myRecipesPageCtrl', ['$scope', '$rootScope', '$location', //this is the controller for the recipes page html
    function($scope, $rootScope, $location) {

    }
]);

app.controller('myMoviesPageCtrl', ['$scope', '$rootScope', '$location', //this is the controller for the available movies page html
    function($scope, $rootScope, $location) {

    }
]);

app.controller('myReviewsPageCtrl', ['$scope', '$rootScope', '$location', //this is the controller for the movie review page html
    function($scope, $rootScope, $location) {

    }
]);

app.controller('myEventsPageCtrl', ['$scope', '$rootScope', '$location', //this is the controller for the events page html
    function($scope, $rootScope, $location) {

    }
]);

app.controller('myTicketsPageCtrl', ['$scope', '$rootScope', '$location', //this is the controller for the ticket purchase page html
    function($scope, $rootScope, $location) {

    }
]);


//this is your address book
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/home', { //when we nav to localhost:3000/#/welcome...
            templateUrl: 'views/home.html', //this is the file you are getting
            controller: 'myHomePageCtrl' //this is the controller that is called
        })
        .when('/about', {
            templateUrl: 'views/about.html',
            controller: 'myAboutPageCtrl'
        })
        .when('/menu', {
            templateUrl: 'views/menu.html',
            controller: 'myMenuPageCtrl'
        })
        // this one needs to have the recipes ids worked into it!
        // .when('/recipes', {
        //     templateUrl: 'views/recipes.html',
        //     controller: 'myRecipePageCtrl'
        // })
        .when('/movies', {
            templateUrl: 'views/movies.html',
            controller: 'myMoviesPageCtrl'
        })
        // this one needs to have the reviews ids worked into it!
        // .when('/reviews', {
        //     templateUrl: 'views/reviews.html',
        //     controller: 'myReviewsPageCtrl'
        // })
        //  this one needs to have the event ids worked into it!
        // .when('/events', {
        //     templateUrl: 'views/events.html',
        //     controller: 'myEventsPageCtrl'
        // })
        // this one needs to have the reviews ids worked into it!
        .when('/tickets', {
            templateUrl: 'views/tickets.html',
            controller: 'myTicketsPageCtrl'
        })
        .otherwise({
            redirectTo: '/home'
        })
}]);