function RoleService($http) {
    this.serverUrl = "http://localhost:8090";

    this.getRoles = function () {
        return $http.get(this.serverUrl + "/role/getRoles/").then(function (response) {
            return response.data;
        });
    };
}

angular
    .module("project401")
    .service("RoleService", RoleService);