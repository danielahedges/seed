angular.module('Users').factory('PasswordService', ['$http', function($http) {
  var checkStrength = function(password, next) {
    if (!password) {
      password = '';
    }
    $http.post('/passwordStrength', {password: password}).then(function(response) {
      next(response.data);
    }).catch(function(err) {
      // doing nothing is okay for an error retrieving password strength.
    });
  };

  var change = function(currentPassword, password, next, errorCb) {
    $http.post('/password', {
      currentPassword: currentPassword,
      password: password,
    }).then(function(response) {
      next(); // no data returned
    }).catch(function(err) {
      errorCb(err);
    });
  };

  return {
    checkStrength: checkStrength,
    change: change,
  };
}]);

angular.module('Users').factory('Authentication', [
  function() {
    this.user = window.user;
    return {
      user: this.user,
    };
  }
]);
