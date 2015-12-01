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

      var code = "tabstave notation=false \n notes "

      modelCtrl.$render = function(){
        console.log('view value', modelCtrl.$viewValue);
      
        // element.empty();
        // element.removeAttr('style');
        // debugger;
        element.text(code+modelCtrl.$viewValue);
        new Vex.Flow.TabDiv(element);
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