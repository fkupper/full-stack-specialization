/* global angular */
angular.module('confusionApp')
    .controller('MenuController', ['$scope','menuFactory', function ($scope, menuFactory) {
        'use strict';
        $scope.tab = 1;
        $scope.filtText = '';
        $scope.showDetails = false;


        $scope.dishes = menuFactory.getDishes();


        $scope.select = function (setTab) {
            $scope.tab = setTab;

            if (setTab === 2) {
                $scope.filtText = "appetizer";
            }
            else if (setTab === 3) {
                $scope.filtText = "mains";
            }
            else if (setTab === 40) {
                $scope.filtText = "dessert";
            }
            else {
                $scope.filtText = "";
            }
        };

        $scope.isSelected = function (checkTab) {
            return ($scope.tab === checkTab);
        };

        $scope.toggleDetails = function () {
            $scope.showDetails = !$scope.showDetails;
        };

    }])


.controller('ContactController', ['$scope', function ($scope) {
    'use strict';
    $scope.feedback = {
        mychannel: "",
        firstName: "",
        lastName: "",
        agree: false,
        email: ""
    };

    $scope.channels = [{
        value: "tel",
        label: "Tel."
    }, {
        value: "Email",
        label: "Email"
    }];

    $scope.invalidChannelSelection = false;

    }])

.controller('FeedbackController', ['$scope', function ($scope) {
    'use strict';

    $scope.sendFeedback = function () {

        console.log($scope.feedback);

        if ($scope.feedback.agree && ($scope.feedback.mychannel === "") && !$scope.feedback.mychannel) {
            $scope.invalidChannelSelection = true;
            console.log('incorrect');
        }
        else {
            $scope.invalidChannelSelection = false;
            $scope.feedback = {
                mychannel: "",
                firstName: "",
                lastName: "",
                agree: false,
                email: ""
            };
            $scope.feedback.mychannel = "";

            $scope.feedbackForm.$setPristine();

            console.log($scope.feedback);
        }
    };
}])

.controller('DishDetailController', ['$scope', 'menuFactory', function ($scope, menuFactory) {
    'use strict';

    $scope.dish= menuFactory.getDish(3);

    //Step 1: Create a JavaScript object to hold the comment from the form
    $scope.newComment = {
        rating: 5,
        comment: '',
        author:'',
        date: new Date().toISOString()

    };

}])

.controller('DishCommentController', ['$scope', function ($scope) {
    'use strict';


    $scope.submitComment = function () {

        //Step 2: This is how you record the date
        $scope.newComment.date = new Date().toISOString();

        console.log($scope.newComment);

        // Step 3: Push your comment into the dish's comment array
        $scope.dish.comments.push($scope.newComment);

        //Step 4: reset your form to pristine
        $scope.newCommentForm.$setPristine();

        //Step 5: reset your JavaScript object that holds your comment
        $scope.newComment = {
            rating: 5,
            comment: '',
            author:'',
            date: new Date().toISOString()

        };
    };
}])

;