var app = angular.module('myFlicks.controllers',[]); //this is where you create your angular module

app.controller('myHomePageCtrl', ['$scope', '$rootScope', '$location', //this is the controller for the home page html
    function($scope, $rootScope, $location) {
        $(function () {
	$('.box').hover(
		function () {
			var overlay = $(this).find('.box-overlay');
			overlay.removeClass(overlay.data('return')).addClass(overlay.data('hover'));
		},
		function () {
			var overlay = $(this).find('.box-overlay');		
			overlay.removeClass(overlay.data('hover')).addClass(overlay.data('return'));

		}
	);
});

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

app.controller('myEventsPageCtrl', ['$scope', 'BlogpostFactory', '$location', //this is the controller for the events page html
    function($scope, BlogpostFactory, $location) {
        console.log('events page');

        $scope.blogposts = BlogpostFactory.query();
        // console.log(blogposts);

        $scope.goToSinglePost = function (id) {
            $location.path('/events/' + id);
        }
    }
]);

app.controller('SinglePostController', ['$scope', '$routeParams', 'BlogpostFactory', '$location', function ($scope, $routeParams, BlogpostFactory, $location) {
        //gets the ID of the post and stores in var, do this for edit post as well
        var theidoftheblogpost = $routeParams.id;
        //gets the specific blog with the id 
        $scope.singleblog = BlogpostFactory.get(
            { id: theidoftheblogpost }
        );

        $scope.goToEditPost = function (id) {
            $location.path('/editpost/' + id);
        }

        $scope.deletePost = function() {
            $scope.singleblog.$delete(function () {
                console.log('i deleted');
                $location.path('/events');
            })
        }
    }])

app.controller('NewPostController', ['$scope', 'BlogpostFactory', '$location', function ($scope, BlogpostFactory, $location) {
       console.log('newpost page');
       
        //stores the content in empty places
        $scope.blog = {
            title: '',
            author: '',
            content: '',
        }
        //puts that content in the html (creates post)
        $scope.savePost = function () {
            var newPost = {
                title: $scope.blog.title,
                author: $scope.blog.author,
                content: $scope.blog.content,
            }
            //causes the page to go back home when button is clicked
            $location.path('/events');

            //puts the post in the variable p
            var p = new BlogpostFactory(newPost);
            //calls the function on p
            p.$save(function () {
                console.log('you posted me');
                console.log(p);
            })
        }
    }])

app.controller('EditPostController', ['$scope', 'BlogpostFactory', '$routeParams', '$location', function ($scope, BlogpostFactory, $routeParams, $location) {
        var theidoftheblogpost = $routeParams.id;
        //gets the specific blog with the id 
        $scope.singleblog = BlogpostFactory.get(
            { id: theidoftheblogpost }
        );

        $scope.updatePost = function () {
            $scope.singleblog.$update(function () {
                console.log('i updated');
                $location.path('/events');
            })
        }

    }])

app.controller('myTicketsPageCtrl', ['$scope', '$rootScope', '$location', //this is the controller for the ticket purchase page html
    function($scope, $rootScope, $location) {

    }
]);