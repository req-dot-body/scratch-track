// app.directive('vextab', function($compile){
//   return{
//     restrict: 'E',
//     require: 'ngModel', 
//     replace: true, 
//     link: function(scope, element, attrs, modelCtrl){
//       element.text(scope.code);
//       new Vex.Flow.TabDiv(element);
//     }
//   }
// });

app.directive('vextab', function($compile){
  return{
    restrict: 'E',
    require: 'ngModel', 
    replace: false, 
    link: function(scope, element, attrs, modelCtrl){

      modelCtrl.$render = function(){
        console.log('view value', modelCtrl.$viewValue);
        element.text(modelCtrl.$viewValue);
        new Vex.Flow.TabDiv(element);
        // scope.displayCode = modelCtrl.$viewValue;
      }

    }
  }
});

/*
To use: <vextab code=""></vextab>
set code equal to the code property of a stablature object

in order for it to work you put have the following script on your view:
<script src="/js/vex.js"></script>
*/