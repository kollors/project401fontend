function OrderService($http) {
    this.serverUrl = "http://localhost:8090";

    this.getOrders = function () {
        return $http.get(this.serverUrl + "/order/getOrders").then(function (response) {
            return response.data;
        });
    };

    this.getOrder = function (id) {
        return $http.get(this.serverUrl + "/order/getOrder/" + id).then(function (response) {
            return response.data;
        });
    };
}

angular
    .module("project401")
    .service("OrderService", OrderService);