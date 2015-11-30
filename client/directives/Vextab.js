app.directive('vextab', function($compile){
  return{
    restrict: 'EC', 
    scope: {
      code: '=code'
    }, 
    link: function(scope, element){
      element.text(scope.code);
      new Vex.Flow.TabDiv(element);
    }
  }
});

/*
To use: <vextab code=""></vextab>
set code equal to the code property of a stablature object

in order for it to work you put have the following script on your view:
<script src="/js/vex.js"></script>
*/