$(document).ready(function(){
    $(this).scrollTop(0);
});
var app = angular.module('myFlicks', ['ngRoute', 'ngResource', 'myFlicks.controllers', 'myFlicks.factories']);


//this is your address book
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/home', { //when we nav to localhost:3000/#/home...
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
        .when('/events', {
            templateUrl: 'views/events.html',
            controller: 'myEventsPageCtrl'
        })

        .when('/newpost', {
            templateUrl: 'views/newpost.html',
            controller: 'NewPostController'
        })
        .when('/events/:id', {
                templateUrl: 'views/singlepost.html',
                controller: 'SinglePostController'
            })

        .when('/editpost/:id', {
                templateUrl: 'views/editpost.html',
                controller: 'EditPostController'
            })
        // this one needs to have the reviews ids worked into it!
        .when('/movies/:id', {
            templateUrl: 'views/tickets.html',
            controller: 'myTicketsPageCtrl'
        })
        .otherwise({
            redirectTo: '/home'
        })
}]);