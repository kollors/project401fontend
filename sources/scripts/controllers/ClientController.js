function ClientController($scope, ClientService) {
    $scope.clients = [];
    $scope.client = {};
    $scope.create = false;

    $scope.getClients = function () {
        ClientService.getClients().then(function (clients) {
            $scope.clients = clients;
            $scope.getClient($scope.clients[0]);
        });
    };

    $scope.getClient = function (client) {
        $scope.client = client;
        $scope.create = false;
        ClientService.getClient(client.id).then(function (client) {
            for (var key in client) {
                if (client.hasOwnProperty(key)) {
                    $scope.client[key] = client[key];
                }
            }
        });
    };

    $scope.createClient = function () {
        ClientService.createClient($scope.client).then(function (client) {
            $scope.clients.push(client);
            $scope.create = false;
        });
    };

    $scope.updateClient = function () {
        ClientService.updateClient($scope.client).then(function (client) {
            for (var key in client) {
                if (client.hasOwnProperty(key)) {
                    $scope.client[key] = client[key];
                }
            }
        });
    };

    $scope.deleteClient = function () {
        ClientService.deleteClient($scope.client.id).then(function () {
            $scope.clients.splice($scope.clients.indexOf($scope.client), 1);
            $scope.getClient($scope.clients[0]);
        });
    };

    $scope.clearClient = function () {
        $scope.client = {};
        $scope.create = true;
    };
}

angular
    .module("project401")
    .controller("ClientController", ClientController);