var app = angular.module('myFlicks.controllers', []); //this is where you create your angular module

app.controller('myHomePageCtrl', ['$scope', '$rootScope', '$location', //this is the controller for the home page html
    function ($scope, $rootScope, $location) {
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

app.controller('myAboutPageCtrl', ['$scope', '$rootScope', '$location', 'Contact', //this is the controller for the about page html
    function ($scope, $rootScope, $location, Contact) {
        window.initMap = function () {
            var coordinates = { lat: 33.511920, lng: -86.812562 };
            divNode = $('#googleMap').get(0);
            var map = new google.maps.Map(divNode, {
                zoom: 16,
                center: coordinates,
                scrollwheel: false
            });
            var icon = {
                url: "../resources/logo.svg",
                scaledSize: new google.maps.Size(35, 35),
                origin: new google.maps.Point(0,0), // origin
                anchor: new google.maps.Point(0, 0)
            };
            
            var marker = new google.maps.Marker({
                position: coordinates,
                map: map,
                icon: icon
            });
        }
        $scope.contactData = {
          fullname: '',
          fromEmail: '',
          subject: '',
          content: ''  
        };
        $scope.submitButtonDisabled = false;
        $scope.sendEmail = function(){
            var contact = {
                fullname: $scope.contactData.fullname,
                fromEmail: $scope.contactData.fromEmail,
                subject: $scope.contactData.subject,
                content: $scope.contactData.content
            }
            var newContact = new Contact(contact);
            newContact.$save(function(){
                console.log("Email sent!")
                console.log(newContact);
                // disable submit button once message is sent to prevent spamming.
                $scope.submitButtonDisabled = true;
                var contactFrm = document.getElementById('contact-form');
                contactFrm.reset();
                alert('Thanks for your inquiry! You will recieve a response shortly. If you need to send us another message, please refresh the page.')
                // return false;
            }, function(err){
                console.log(err);
            });
        };
    }
]);

app.controller('myMenuPageCtrl', ['$scope', '$rootScope', '$location', //this is the controller for the menu page html
    function ($scope, $rootScope, $location) {
        var btn = document.createElement('button');
        btn.setAttribute("class", "menuButton");
        var clickText = document.createTextNode("Can't Decide?");
        var heroWords = document.getElementsByClassName("heroWords");

        var answerArray = [];
        var genreArray = ["Action", "Comedy", "Romance"];
        var villainArray = ["The Joker", "Cruella de Vil", "Lex Luther"];
        var tasteArray = ["Sweet", "Savory", "Spicy"];

        var val = 0;


        btn.appendChild(clickText);

        var firstButton = document.createElement('div')
        firstButton.appendChild(btn);
        heroWords[0].appendChild(firstButton);

        // var questionDiv = document.createElement('div');
        // questionDiv.setAttribute("class", "questionText");
        // heroWords[0].appendChild(questionDiv);

        // var answerDiv = document.createElement('div');
        // answerDiv.setAttribute("class", "answerText");
        // heroWords[0].appendChild(answerDiv);
        var theDiv = document.getElementsByClassName('answerText')
        $rootScope.answerDiv = theDiv[0];
        btn.addEventListener('click', selectGenre);

        var AnswerBox = function (value) {
            this.value = value;
        };

        function selectGenre() {
            heroWords[0].removeChild(firstButton);

            $rootScope.changeQuestion = document.getElementById("questionText");
            $rootScope.changeQuestion.innerHTML = "Please Select a Movie Genre";

            for (var i = 0; i < genreArray.length; i++) {
                var answer = document.createElement('div');
                var newAnswer = new AnswerBox(genreArray[i]);
                var name = document.createTextNode(newAnswer.value);
                answer.appendChild(name);
                answer.setAttribute("class", "options");
                answer.setAttribute("id", newAnswer.value);
                $rootScope.answerDiv.appendChild(answer);
                answer.addEventListener('click', getGenre);
            }
        }

        function getGenre() {
            var genre = this.id;
            answerArray.push(genre);
            selectVillain();
        };

        function selectVillain() {

            $rootScope.changeQuestion.innerHTML = "Please Select Your Favorite Villain";

            for (var j = 0; j < genreArray.length; j++) {
                var answerID = document.getElementById(genreArray[j]);
                $rootScope.answerDiv.removeChild(answerID);
            }

            for (var i = 0; i < villainArray.length; i++) {
                var answer = document.createElement('div');
                var newAnswer = new AnswerBox(villainArray[i]);
                var name = document.createTextNode(newAnswer.value);
                answer.appendChild(name);
                answer.setAttribute("class", "options");
                answer.setAttribute("id", newAnswer.value);
                $rootScope.answerDiv.appendChild(answer);
                answer.addEventListener('click', getVillain);
            }
        };

        function getVillain() {
            var villain = this.id;
            answerArray.push(villain);
            selectTaste();
        };

        function selectTaste() {

            $rootScope.changeQuestion.innerHTML = "Please Select A Flavor Profile";

            for (var j = 0; j < genreArray.length; j++) {
                var answerID = document.getElementById(villainArray[j]);
                var answerChild = answerID.childNodes;
                var thisChild = answerChild[0]
                $rootScope.answerDiv.removeChild(answerID);
            }

            for (var i = 0; i < tasteArray.length; i++) {
                var answer = document.createElement('div');
                var newAnswer = new AnswerBox(tasteArray[i]);
                var name = document.createTextNode(newAnswer.value);
                answer.appendChild(name);
                answer.setAttribute("class", "options");
                answer.setAttribute("id", newAnswer.value);
                $rootScope.answerDiv.appendChild(answer);
                answer.addEventListener('click', getSelection);
            }
        };

        function getSelection() {
            var taste = this.id;
            answerArray.push(taste);

            

            for (var j = 0; j < tasteArray.length; j++) {
                var answerID = document.getElementById(tasteArray[j]);
                var answerChild = answerID.childNodes;
                var thisChild = answerChild[0]
                $rootScope.answerDiv.removeChild(answerID);
            }

            if (answerArray[0] == "Action") {
                if (answerArray[1] == "The Joker") {
                    if (answerArray[2] == "Sweet") {
                        var order = "the Zombieland";
                    }
                    else if (answerArray[2] == "Savory") {
                        var order = ("The Big Short");
                    }
                    else {
                        var order = ("the Frankenweenie");
                    }
                }
                else if (answerArray[1] == "Cruella de Vil") {
                    if (answerArray[2] == "Sweet") {
                        var order = ("The Help");
                    }
                    else if (answerArray[2] == "Savory") {
                        var order = ("the Sound of Music");
                    }
                    else {
                        var order = ("the Fried Green Tomatoes");
                    }
                }
                else {
                    if (answerArray[2] == "Sweet") {
                        var order = ("the Labor Day");
                    }
                    else if (answerArray[2] == "Savory") {
                        var order = ("the Pulp Fiction");
                    }
                    else {
                        var order = ("The Big Short");
                    }
                }
            }
            else if (answerArray[0] == "Comedy") {
                if (answerArray[1] == "The Joker") {
                    if (answerArray[2] == "Sweet") {
                        var order = ("the Serendipity");
                    }
                    else if (answerArray[2] == "Savory") {
                        var order = ("the Lady and the Tramp");
                    }
                    else {
                        var order = ("The Martian");
                    }
                }
                else if (answerArray[1] == "Cruella de Vil") {
                    if (answerArray[2] == "Sweet") {
                        var order = ("the Tequila Sunrise");
                    }
                    else if (answerArray[2] == "Savory") {
                        var order = ("the Mean Girls");
                    }
                    else {
                        var order = ("the Frankenweenie");
                    }
                }
                else {
                    if (answerArray[2] == "Sweet") {
                        var order = ("the Labor Day");
                    }
                    else if (answerArray[2] == "Savory") {
                        var order = ("The Big Short");
                    }
                    else {
                        var order = ("the Frankenweenie");
                    }
                }
            }
            else {
                if (answerArray[1] == "The Joker") {
                    if (answerArray[2] == "Sweet") {
                        var order = ("the Serendipity");
                    }
                    else if (answerArray[2] == "Savory") {
                        var order = ("the Lady and the Tramp");
                    }
                    else {
                        var order = ("the Fried Green Tomatoes");
                    }
                }
                else if (answerArray[1] == "Cruella de Vil") {
                    if (answerArray[2] == "Sweet") {
                        var order = ("the Labor Day");
                    }
                    else if (answerArray[2] == "Savory") {
                        var order = ("the Pulp Fiction");
                    }
                    else {
                        var order = ("the Sound of Music");
                    }
                }
                else {
                    if (answerArray[2] == "Sweet") {
                        var order = ("the Serendipity");
                    }
                    else if (answerArray[2] == "Savory") {
                        var order = ("The Martian");
                    }
                    else {
                        var order = ("The Big Short");
                    }
                }
            }

            $rootScope.changeQuestion.innerHTML = "You Should Order " + order;

            var btnTwo = document.createElement('button');
            btnTwo.setAttribute("class", "menuButtonTry");
            var resetText = document.createTextNode("Nah, that's not it. Retry!");
            btnTwo.appendChild(resetText);
            $rootScope.secondButton = document.createElement('div');
            $rootScope.secondButton.appendChild(btnTwo);
            heroWords[0].appendChild($rootScope.secondButton);
            btnTwo.addEventListener('click', selectGenreReset);
        };
        
        function selectGenreReset() {
            heroWords[0].removeChild($rootScope.secondButton);
            answerArray = [];

            $rootScope.changeQuestion = document.getElementById("questionText");
            $rootScope.changeQuestion.innerHTML = "Please Select a Movie Genre";

            for (var i = 0; i < genreArray.length; i++) {
                var answer = document.createElement('div');
                var newAnswer = new AnswerBox(genreArray[i]);
                var name = document.createTextNode(newAnswer.value);
                answer.appendChild(name);
                answer.setAttribute("class", "options");
                answer.setAttribute("id", newAnswer.value);
                $rootScope.answerDiv.appendChild(answer);
                answer.addEventListener('click', getGenre);
            }
        }
    }
]);

app.controller('myRecipesPageCtrl', ['$scope', '$rootScope', '$location', //this is the controller for the recipes page html
    function ($scope, $rootScope, $location) {

    }
]);

app.controller('myMoviesPageCtrl', ['$scope', '$rootScope', '$location', //this is the controller for the available movies page html
    function ($scope, $rootScope, $location) {
        
    }
]);

app.controller('myReviewsPageCtrl', ['$scope', '$rootScope', '$location', //this is the controller for the movie review page html
    function ($scope, $rootScope, $location) {

    }
]);

app.controller('myEventsPageCtrl', ['$scope', 'BlogpostFactory', '$location', //this is the controller for the events page html
    function ($scope, BlogpostFactory, $location) {
        console.log('events page');

        $scope.blogposts = BlogpostFactory.query();
        // console.log(blogposts);

        $scope.goToSinglePost = function (id) {
            $location.path('/events/' + id);
        }

        $scope.goToNewPost = function () {
            $location.path('/newpost');
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

    $scope.deletePost = function () {
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

    $scope.backToEvents = function () {
        $location.path('/events');
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

    $scope.backToEvents = function () {
        $location.path('/events');
    }
}])

app.controller('myTicketsPageCtrl', ['$scope', '$rootScope', '$location', 'Purchase', '$routeParams', 'MoviesFactory',//this is the controller for the ticket purchase page html
    function ($scope, $rootScope, $location, Purchase, $routeParams, MoviesFactory) {
        var idofmovie = $routeParams.id;
        $scope.movie = MoviesFactory.get({id: idofmovie}, function(success){
            console.log(success);
        });
        // navigate back to movies view on button click.
        $scope.backToMovies = function(){
            $location.path('/movies');
        }
        //charge card function that calls Stripe API. Also reveals purchase error if payment error response from Stripe.
        $scope.purchaseError = false;
        $scope.chargeCard = function () {
            Stripe.card.createToken({
                number: $scope.cardNum,
                cvc: $scope.cvc,
                exp_month: $scope.expiryMonth,
                exp_year: $scope.expiryYear,
            }, function (status, response) {
                if (response.error) {
                    console.log(response.error);
                    $scope.$apply(function () {
                        $scope.purchaseError = true;
                    })
                } else {
                    var stripeToken = response.id;
                    var purchase = new Purchase({
                        amountToCharge: $scope.ticketAmount * 8 * 100,
                        token: stripeToken
                    });

                    purchase.$save(function () {
                        console.log('purchased');
                    })

                    console.log("success!");
                }
            });
        };
    }]);


