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
            var marker = new google.maps.Marker({
                position: coordinates,
                map: map
            });
        }
        $scope.contactData = {
          fullname: '',
          email: '',
          subject: '',
          message: ''  
        };
        $scope.sendEmail = function(){
            var contact = {
                fullname: $scope.contactData.fullname,
                email: $scope.contactData.email,
                subject: $scope.contactData.subject,
                message: $scope.contactData.message
            }
            var newContact = new Contact(contact);
            newContact.$save(function(){
                console.log("Email sent!")
                console.log(newContact);
            }, function(err){
                console.log(err);
            });
        };
    }
]);

app.controller('myMenuPageCtrl', ['$scope', '$rootScope', '$location', //this is the controller for the menu page html
    function ($scope, $rootScope, $location) {
        console.log('this controller');
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


        var questionDiv = document.createElement('div');
        questionDiv.setAttribute("id", "questionText");
        heroWords[0].appendChild(questionDiv);

        var answerDiv = document.createElement('div');
        answerDiv.setAttribute("class", "diceDivClass");
        heroWords[0].appendChild(answerDiv);

        btn.addEventListener('click', selectGenre);

        var AnswerBox = function (value) {
            this.value = value;
        };

        function selectGenre() {
            heroWords[0].removeChild(firstButton);

            var question = document.createTextNode("Please Select a Movie Genre");
            questionDiv.appendChild(question);

            for (var i = 0; i < genreArray.length; i++) {
                var answer = document.createElement('div');
                var newAnswer = new AnswerBox(genreArray[i]);
                var name = document.createTextNode(newAnswer.value);
                answer.appendChild(name);
                answer.setAttribute("class", "dices");
                answer.setAttribute("id", newAnswer.value);
                answerDiv.appendChild(answer);
                answer.addEventListener('click', getGenre);
            }
        }

        function getGenre() {
            var genre = this.id;
            answerArray.push(genre);
            selectVillain();
        };

        function selectVillain() {
            var changeQuestion = document.getElementById("questionText");
            var textQuest = changeQuestion.childNodes;
            changeQuestion.removeChild(textQuest[0]);
            var villainQuest = document.createTextNode("Please Select Your Favorite Villain");
            changeQuestion.appendChild(villainQuest);

            for (var j = 0; j < genreArray.length; j++) {
                var answerID = document.getElementById(genreArray[j]);
                // var answerChild = answerID.childNodes;
                // var thisChild = answerChild[0];
                answerDiv.removeChild(answerID);
            }

            for (var i = 0; i < villainArray.length; i++) {
                var answer = document.createElement('div');
                var newAnswer = new AnswerBox(villainArray[i]);
                var name = document.createTextNode(newAnswer.value);
                answer.appendChild(name);
                answer.setAttribute("class", "dices");
                answer.setAttribute("id", newAnswer.value);
                answerDiv.appendChild(answer);
                answer.addEventListener('click', getVillain);
            }
        };

        function getVillain() {
            var villain = this.id;
            answerArray.push(villain);
            selectTaste();
        };

        function selectTaste() {
            var changeQuestion = document.getElementById("questionText");
            var textQuest = changeQuestion.childNodes;
            changeQuestion.removeChild(textQuest[0]);
            var tasteQuest = document.createTextNode("Please Select What Taste You Are Looking For");
            changeQuestion.appendChild(tasteQuest);

            for (var j = 0; j < genreArray.length; j++) {
                var answerID = document.getElementById(villainArray[j]);
                var answerChild = answerID.childNodes;
                var thisChild = answerChild[0]
                answerDiv.removeChild(answerID);
            }

            for (var i = 0; i < tasteArray.length; i++) {
                var answer = document.createElement('div');
                var newAnswer = new AnswerBox(tasteArray[i]);
                var name = document.createTextNode(newAnswer.value);
                answer.appendChild(name);
                answer.setAttribute("class", "dices");
                answer.setAttribute("id", newAnswer.value);
                answerDiv.appendChild(answer);
                answer.addEventListener('click', getSelection);
            }
        };

        function getSelection() {
            var taste = this.id;
            answerArray.push(taste);

            var changeQuestion = document.getElementById("questionText");
            var textQuest = changeQuestion.childNodes;
            changeQuestion.removeChild(textQuest[0]);
            var orderShould = document.createTextNode("You Should Order...");
            changeQuestion.appendChild(orderShould);

            for (var j = 0; j < tasteArray.length; j++) {
                var answerID = document.getElementById(tasteArray[j]);
                var answerChild = answerID.childNodes;
                var thisChild = answerChild[0]
                answerDiv.removeChild(answerID);
            }

            if (answerArray[0] == "Action") {
                if (answerArray[1] == "The Joker") {
                    if (answerArray[2] == "Sweet") {
                        var order = document.createTextNode("Action, The Joker, Sweet");
                        changeQuestion.appendChild(order);
                    }
                    else if (answerArray[2] == "Savory") {
                        var order = document.createTextNode("Action, The Joker, Savory");
                        changeQuestion.appendChild(order);
                    }
                    else {
                        var order = document.createTextNode("Action, The Joker, Spicy");
                        changeQuestion.appendChild(order);
                    }
                }
                else if (answerArray[1] == "Cruella de Vil") {
                    if (answerArray[2] == "Sweet") {
                        var order = document.createTextNode("Action, Cruella de Vil, Sweet");
                        changeQuestion.appendChild(order);
                    }
                    else if (answerArray[2] == "Savory") {
                        var order = document.createTextNode("Action, Cruella de Vil, Savory");
                        changeQuestion.appendChild(order);
                    }
                    else {
                        var order = document.createTextNode("Action, Cruella de Vil, Spicy");
                        changeQuestion.appendChild(order);
                    }
                }
                else {
                    if (answerArray[2] == "Sweet") {
                        var order = document.createTextNode("Action, Lex Luther, Sweet");
                        changeQuestion.appendChild(order);
                    }
                    else if (answerArray[2] == "Savory") {
                        var order = document.createTextNode("Action, Lex Luther, Savory");
                        changeQuestion.appendChild(order);
                    }
                    else {
                        var order = document.createTextNode("Action, Lex Luther, Spicy");
                        changeQuestion.appendChild(order);
                    }
                }
            }
            else if (answerArray[0] == "Comedy") {
                if (answerArray[1] == "The Joker") {
                    if (answerArray[2] == "Sweet") {
                        var order = document.createTextNode("Comedy, The Joker, Sweet");
                        changeQuestion.appendChild(order);
                    }
                    else if (answerArray[2] == "Savory") {
                        var order = document.createTextNode("Comedy, The Joker, Savory");
                        changeQuestion.appendChild(order);
                    }
                    else {
                        var order = document.createTextNode("Comedy, The Joker, Spicy");
                        changeQuestion.appendChild(order);
                    }
                }
                else if (answerArray[1] == "Cruella de Vil") {
                    if (answerArray[2] == "Sweet") {
                        var order = document.createTextNode("Comedy, Cruella de Vil, Sweet");
                        changeQuestion.appendChild(order);
                    }
                    else if (answerArray[2] == "Savory") {
                        var order = document.createTextNode("Comedy, Cruella de Vil, Savory");
                        changeQuestion.appendChild(order);
                    }
                    else {
                        var order = document.createTextNode("Comedy, Cruella de Vil, Spicy");
                        changeQuestion.appendChild(order);
                    }
                }
                else {
                    if (answerArray[2] == "Sweet") {
                        var order = document.createTextNode("Comedy, Lex Luther, Sweet");
                        changeQuestion.appendChild(order);
                    }
                    else if (answerArray[2] == "Savory") {
                        var order = document.createTextNode("Comedy, Lex Luther, Savory");
                        changeQuestion.appendChild(order);
                    }
                    else {
                        var order = document.createTextNode("Comedy, Lex Luther, Spicy");
                        changeQuestion.appendChild(order);
                    }
                }
            }
            else {
                if (answerArray[1] == "The Joker") {
                    if (answerArray[2] == "Sweet") {
                        var order = document.createTextNode("Romance, The Joker, Sweet");
                        changeQuestion.appendChild(order);
                    }
                    else if (answerArray[2] == "Savory") {
                        var order = document.createTextNode("Romance, The Joker, Savory");
                        changeQuestion.appendChild(order);
                    }
                    else {
                        var order = document.createTextNode("Romance, The Joker, Spicy");
                        changeQuestion.appendChild(order);
                    }
                }
                else if (answerArray[1] == "Cruella de Vil") {
                    if (answerArray[2] == "Sweet") {
                        var order = document.createTextNode("Romance, Cruella de Vil, Sweet");
                        changeQuestion.appendChild(order);
                    }
                    else if (answerArray[2] == "Savory") {
                        var order = document.createTextNode("Romance, Cruella de Vil, Savory");
                        changeQuestion.appendChild(order);
                    }
                    else {
                        var order = document.createTextNode("Romance, Cruella de Vil, Spicy");
                        changeQuestion.appendChild(order);
                    }
                }
                else {
                    if (answerArray[2] == "Sweet") {
                        var order = document.createTextNode("Romance, Lex Luther, Sweet");
                        changeQuestion.appendChild(order);
                    }
                    else if (answerArray[2] == "Savory") {
                        var order = document.createTextNode("Romance, Lex Luther, Savory");
                        changeQuestion.appendChild(order);
                    }
                    else {
                        var order = document.createTextNode("Romance, Lex Luther, Spicy");
                        changeQuestion.appendChild(order);
                    }
                }
            }
        };
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

app.controller('myTicketsPageCtrl', ['$scope', '$rootScope', '$location', 'Purchase',//this is the controller for the ticket purchase page html
    function ($scope, $rootScope, $location, Purchase) {
        console.log("this controller");

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


