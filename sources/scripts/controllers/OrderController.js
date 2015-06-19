
function OrderController($scope, OrderService, UserService, ClientService) {
    $scope.orders = [];
    $scope.order = {};
    $scope.orders = {};
    $scope.userExp = "";
    $scope.users = [];
    $scope.clientExp = "";
    $scope.clients = [];
    $scope.create = false;

    $scope.getOrders = function () {
        OrderService.getOrders().then(function (orders) {
            $scope.orders = orders;
            $scope.getOrder($scope.orders[0]);
        });
    };

    $scope.getOrder = function (order) {
        $scope.order = order;
        $scope.create = false;
        $scope.userExp = "";
        OrderService.getOrder(order.id).then(function (order) {
            for (var key in order) {
                if (order.hasOwnProperty(key)) {
                    $scope.order[key] = order[key];
                }
            }
        });
    };

    $scope.createOrder = function () {
        $scope.roles.forEach(function (role) {
            if (role.name == $scope.order.role.name) {
                $scope.order.role.id = role.id;
            }
        });

        OrderService.createOrder($scope.order).then(function (order) {
            $scope.orders.push(order);
            $scope.create = false;
        });
    };

    $scope.updateOrder = function () {
        OrderService.updateOrder($scope.order).then(function (order) {
            for (var key in order) {
                if (order.hasOwnProperty(key)) {
                    $scope.order[key] = order[key];
                }
            }
        });
    };

    $scope.deleteOrder = function () {
        OrderService.deleteOrder($scope.order.id).then(function () {
            $scope.orders.splice($scope.orders.indexOf($scope.order), 1);
            $scope.getOrder($scope.orders[0]);
        });
    };

    $scope.clearOrder = function () {
        $scope.order = {};
        $scope.create = true;
    };

    $scope.getUsers = function () {
        UserService.getUsers($scope.userExp).then(function (users) {
            $scope.users = users;
        });
    };

    $scope.getClients = function () {
        ClientService.getClients($scope.clientExp).then(function (clients) {
            $scope.clients = clients;
        });
    };
}

/**
 * @ngdoc controller
 * @name OrderController
 * @module project401
 */
angular
    .module("project401")
    .controller("OrderController", OrderController);