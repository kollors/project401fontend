function config($routeProvider, $locationProvider) {
    $routeProvider
        .when("/order", {
            templateUrl: "templates/order.html",
            controller: "OrderController"
        })
        .when("/client", {
            templateUrl: "templates/client.html",
            controller: "ClientController"
        })
        .when("/user", {
            templateUrl: "templates/user.html",
            controller: "UserController"
        });

    $locationProvider
        .html5Mode(true)
        .hashPrefix("!");
}

/**
 * @ngdoc config
 * @name config
 * @module project401
 */
angular
    .module("project401")
    .config(config);