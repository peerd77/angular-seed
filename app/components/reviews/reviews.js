(function () {
    'use strict'; 

    angular.module('app')
        .component('reviews', reviews())
        .service('ReviewsService', ReviewsService);

    function reviews() {
        ctrl.$inject = ['ReviewsService'];
        function ctrl(ReviewsService) {
            let $ctrl = this;
            $ctrl.addReview = function () {
                $ctrl.modelList = ReviewsService.add($ctrl.model);
                $ctrl.model = {};
            }
            $ctrl.deleteReview = function (model) {
                $ctrl.modelList = ReviewsService.delete(model);
            }
            $ctrl.editReview = function (model) {
                $ctrl.modelList = ReviewsService.edit(model);
                model.showEdit = false;
            }
            $ctrl.$onInit = function () {
                $ctrl.model = {};
                $ctrl.modelList = ReviewsService.getList();
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



    function ReviewsService() {
        let service = this;

        service.getList = function () {
            let jsonList = sessionStorage.getItem('reviewList');
            if (!jsonList)
                return [];
            let list = angular.fromJson(jsonList);
            let listLength = list ? list.length : 0;
            if (listLength)
                return list;
            return [];
        }

        service.add = function (model) {
            let list = angular.fromJson(sessionStorage.getItem('reviewList'));
            let listLength = list ? list.length : 0;
            model.id = listLength + 1;
            if (listLength === 0)
                list = [];
            list.push(model);
            sessionStorage.setItem('reviewList', angular.toJson(list));
            return list;

        }

        service.delete = function (model) {
            let list = angular.fromJson(sessionStorage.getItem('reviewList'));
            let listLength = list ? list.length : 0;
            if (listLength === 0)
                return [];
            let idx = list.findIndex((e) => e.id == model.id);
            list.splice(idx, 1);
            sessionStorage.setItem('reviewList', angular.toJson(list));
            return list;
        }

        service.edit = function (model) {
            let list = angular.fromJson(sessionStorage.getItem('reviewList'));
            let listLength = list ? list.length : 0;
            if (listLength === 0)
                return [];
            let idx = list.findIndex((e) => e.id == model.id);
            model.showEdit = false;
            list[idx] = model;
            sessionStorage.setItem('reviewList', angular.toJson(list));
            return list;
        }
    }
})();