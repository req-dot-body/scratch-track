app.directive("pwCheck", function() {
 return {
  require: 'ngModel',
  replace: true,
    link: function (scope, elem, attrs, ctrl) {
      var firstPassword = '#' + attrs.pwCheck;
      elem.add(firstPassword).on('keyup', function () {
        scope.$apply(function () {
          var value = elem.val()===$(firstPassword).val();
          ctrl.$setValidity('pwmatch', value);
        });
      });
    }
 };
});