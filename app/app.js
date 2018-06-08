(function () {
    'use strict';

    // Declare app level module which depends on views, and components
    angular.module('app', ['ui.router'])
        .controller('AppCtrl', AppCtrl)
        .config(config);

    AppCtrl.$inject = ['$scope']
    function AppCtrl($scope) {
    }

    config.$inject = ['$urlRouterProvider', '$stateProvider']
    function config($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise('app/reviews');

        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: "../app/app.html",
                controller: "AppCtrl"
            })
            .state('app.reviews', {
                url: '/reviews',
                component: 'reviews',
                resolve: {
                    model: function () {
                        return {
                            model: [
                                { Id: 1, UserId: 1, Name: 'יוסי', Question: 'מה הולך?' },
                                { Id: 2, UserId: 2, Name: 'משה', Question: 'מה העניינים?' },
                                { Id: 3, UserId: 3, Name: 'רן', Question: 'מה שלום האישה?' },
                                { Id: 4, UserId: 4, Name: 'אפריים', Question: 'מה שלום הילדים?' },
                                { Id: 5, UserId: 5, Name: 'דודה', Question: 'מה הולך?' },
                            ]
                        }
                    },
                }

            })

    }

   
})();
