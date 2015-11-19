app.directive('vextab', function($compile){
  return{
    restrict: 'EC', 
    scope: {
      code: '=code'
    }, 
    link: function(scope, element, attrs){
      element.text(scope.code);
      new Vex.Flow.TabDiv(element);
    }
  }
});