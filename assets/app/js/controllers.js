'use strict';

/* Controllers */
var update, deleteItems, create, getIndex;
var myAppControllers = angular.module('myApp.controllers', []);
var type = "DESC";
var sort = "title";
var titleSort = function() {

    if (sort == "title") {
        if (type == 'DESC') {
            type = 'ASC';
        } else {
            type = 'DESC';
        }
    } else {
        sort = "title"
        type = 'ASC';
    }
    getIndex();
}
var dateSort = function() {

    if (sort == "date") {
        if (type == 'DESC') {
            type = 'ASC';
        } else {
            type = 'DESC';
        }
    } else {
        sort = "date"
        type = 'ASC';
    }
    getIndex();
}
myAppControllers.controller('MyCtrl1', ['$scope', '$sails', '$filter',
    function($scope, $sails, $filter) {
        ///////////
        $scope.lookup = {};
        $scope.items = [];
        $scope.action = function(n) {
            //  $scope.name = 'OK';
            var id = n;
            console.log(id);
            deleteItems(n);

            if (!n) {
                create();
            }
        }

        getIndex = function() {
            $sails.get("/statement/index?sort=" + sort + "&sortType=" + type).success(function(response) {
                $scope.items = response.statements;
                $scope.lookup = {};
                for (var i in $scope.items) {
                    $scope.lookup[$scope.items[i].id] = i;
                    console.log($scope.lookup[$scope.items[i].id]);
                }
            }).error(function(response) {
                console.log('error');
            });
        }
        create = function() {

            var title = document.getElementById("title").value;
            var desc = document.getElementById("desc").value;
            var author = document.getElementById("author").value;
            $sails.post("/statement/create/", {
                author: author,
                description: desc,
                title: title
            }).success(function(response) {

                getIndex();

            }).error(function(response) {


                console.log('error');
            });
        };
        deleteItems = function(n) {


            $sails.get("/statement/delete/" + n).success(function(response) {
                getIndex();

            }).error(function(response) {


                console.log('error');
            });
        };

        update = function(n) {
            var id = n[0].id.split('_')[1];
            var title = document.getElementById("title_" + id).textContent;
            var desc = document.getElementById("desc_" + id).textContent;

            $sails.post("/statement/update", {
                id: id,
                description: desc,
                title: title
            }).success(function(response) {


            }).error(function(response) {


                console.log('error');
            });
        };
        (function() {
            getIndex();




        })();
        ///////////

    }
]);

myAppControllers.controller('MyCtrl2', [function() {}]);