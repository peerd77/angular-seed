(function () {
    'use strict'; 

    angular.module('app')
        .component('reviews', reviews());

    function reviews() {
        function ctrl() {
            let $ctrl = this;
            $ctrl.$onInit = function () {

            }
        }
        return {
            templateUrl: "./components/reviews/reviews.html",
            controller: ctrl,
            bindings: {
                model: '<'
            }
        }
    }
})();