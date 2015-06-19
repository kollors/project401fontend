function UserService($http) {
    this.serverUrl = "http://localhost:8090";

    this.getUsers = function () {
        return $http.get(this.serverUrl + "/user/getUsers").then(function (response) {
            return response.data;
        });
    };

    this.getUser = function (id) {
        return $http.get(this.serverUrl + "/user/getUser/" + id).then(function (response) {
            return response.data;
        });
    };

    this.createUser = function (user) {
        return $http.post(this.serverUrl + "/user/create", user).then(function (response) {
            return response.data;
        });
    };

    this.updateUser = function (user) {
        return $http.put(this.serverUrl + "/user/update", user).then(function (response) {
            return response.data;
        })
    };

    this.deleteUser = function (id) {
        return $http.delete(this.serverUrl + "/user/deleteUser/" + id).then(function (response) {
            return response.data;
        });
    };
}

angular
    .module("project401")
    .service("UserService", UserService);