function ClientService($http) {
    this.serverUrl = "http://localhost:8090";

    this.getClients = function () {
        return $http.get(this.serverUrl + "/client/getClients").then(function (response) {
            return response.data;
        });
    };

    this.getClient = function (id) {
        return $http.get(this.serverUrl + "/client/getClient/" + id).then(function (response) {
            return response.data;
        });
    };

    this.createClient = function (user) {
        return $http.post(this.serverUrl + "/client/create", user).then(function (response) {
            return response.data;
        });
    };

    this.updateClient = function (user) {
        return $http.put(this.serverUrl + "/client/update", user).then(function (response) {
            return response.data;
        })
    };

    this.deleteClient = function (id) {
        return $http.delete(this.serverUrl + "/client/deleteClient/" + id).then(function (response) {
            return response.data;
        });
    };
}

angular
    .module("project401")
    .service("ClientService", ClientService);