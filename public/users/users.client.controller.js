angular.module('Users').controller('UserController', [
  '$scope',
  'Authentication',
  '$location',
  'PasswordService',
  '$window',
  '$translate',
  function($scope, Authentication, $location, PasswordService, $window, $translate) {
    $scope.initSignUp = function() {
      $scope.password = "";
      $scope.repeatPassword = "";
      $scope.score = 0;
      angular.element('#sign-up-form').preventDoubleSubmission();
    };

    $scope.initChangePassword = function() {
      $scope.password = "";
      $scope.repeatPassword = "";
      $scope.score = 0;
      if ($window.location.hash == "#!/profile/changePassword") {
        // We most likely got here through the user profile link.
        // When done, just go back to the user profile.
        $scope.changePasswordSuccessfulCB = function() {
          $location.path('/profile');
          $scope.$apply();
        };
      } else {
        // We are probably a provisional user, prompted by the
        // system to change password in order to continue.
        // We need to force a reload of the current page.
        $scope.changePasswordSuccessfulCB = function() {
          $window.location.reload();
        };
      }
    };

    $scope.changePassword = function() {
      PasswordService.change($scope.currentPassword, $scope.password, function() {
        // success
        alert('Password change succeeded');
      }, function(err) {
        alert('Password change failed');
      });
    };

    var _setPasswordStrength = function(result) {
      $scope.score = result.score;
      $scope.feedback = result.feedback;
      var _strength = ["Worst", "Bad", "Weak", "Good", "Strong"];
      var _color = ["black", "red", "yellow", "orange", "green"];

      var val = angular.element(document.querySelector('#new-password'))[0].value;
      var indicator = angular.element(document.querySelector('#password-strength-indicator'));
      var text = angular.element(document.querySelector('#password-strength-text'))[0];

      indicator.css('width', ''+((result.score+1) * 20)+'%');
      indicator.css('background-color', _color[result.score]);

      if (val !== '') {
        text.innerHTML = "Strength: " + _strength[result.score];
      } else {
        text.innerHTML = "";
      }
    };

    $scope.refreshPasswordMeter = function() {
      var val = angular.element(document.querySelector('#new-password'))[0].value;
      PasswordService.checkStrength(val, _setPasswordStrength);
    };

    $scope.passwordIsStrongEnough = function() {
      return $scope.password !== '' && $scope.score >= 1;
    };

    $scope.validate = function() {
      if (!$scope.passwordIsStrongEnough() || $scope.password !== $scope.repeatPassword) {
        return false;
      }
      return true;
    };

  }
]);

// This is necessary for the user signup post form.
jQuery.fn.preventDoubleSubmission = function() {
  $(this).on('submit', function(e) {
    var $form = $(this);
    if ($form.data('submitted') === true) {
      // Previously submitted -- don't submit again
      e.preventDefault();
    } else {
      // Mark it so that the next submit can be ignored.
      $form.data('submitted', true);
    }
  });
  // Keep chainability
  return this;
};
