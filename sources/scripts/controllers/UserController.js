function UserController($scope, UserService, RoleService) {
    $scope.users = [];
    $scope.user = {};
    $scope.roles = [];
    $scope.create = false;

    $scope.getUsers = function () {
        UserService.getUsers().then(function (users) {
            $scope.users = users;
            $scope.getUser($scope.users[0]);
        });
    };

    $scope.getUser = function (user) {
        $scope.user = user;
        $scope.create = false;
        UserService.getUser(user.id).then(function (user) {
            for (var key in user) {
                if (user.hasOwnProperty(key)) {
                    $scope.user[key] = user[key];
                }
            }
        });
    };

    $scope.createUser = function () {
        $scope.roles.forEach(function (role) {
            if (role.name == $scope.user.role.name) {
                $scope.user.role.id = role.id;
            }
        });

        UserService.createUser($scope.user).then(function (user) {
            $scope.users.push(user);
            $scope.create = false;
        });
    };

    $scope.updateUser = function () {
        UserService.updateUser($scope.user).then(function (user) {
            for (var key in user) {
                if (user.hasOwnProperty(key)) {
                    $scope.user[key] = user[key];
                }
            }
        });
    };

    $scope.deleteUser = function () {
        UserService.deleteUser($scope.user.id).then(function () {
            $scope.users.splice($scope.users.indexOf($scope.user), 1);
            $scope.getUser($scope.users[0]);
        });
    };

    $scope.clearUser = function () {
        $scope.user = {};
        $scope.create = true;
    };

    $scope.getRoles = function () {
        RoleService.getRoles().then(function (roles) {
            $scope.roles = roles;
        });
    };
}

angular
    .module("project401")
    .controller("UserController", UserController);