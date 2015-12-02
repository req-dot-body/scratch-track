app.directive('vextab', function($compile){
  return{
    restrict: 'E',
    scope: {
      notation: '=notation'
    },
    require: 'ngModel', 
    replace: true, 
    link: function(scope, element, attrs, modelCtrl){
      //asumes tabs if no other option is given 
      var notation = scope.notation || false; 
      var prefix = "tabstave notation="+ notation +" \n notes "

      //creates new tab when model is updated
      modelCtrl.$render = function(){
        console.log('render') 
        console.log('view value', modelCtrl.$viewValue)
        element.text(prefix + modelCtrl.$viewValue);
        new Vex.Flow.TabDiv(element);
      }

    }
  }
});

/*
To use: <vextab ng-model= notation=""></vextab>
set model equal to the code property of a stablature object
set notation equal to notation property if present 

in order for it to work you put have the following script on your view:
<script src="/js/vex.js"></script>
*/