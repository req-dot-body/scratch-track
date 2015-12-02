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
        var code = formatCode(modelCtrl.$viewValue);
        element.text(code);
        new Vex.Flow.TabDiv(element);
      }

      //formats user input into vex notation
      function formatCode(code){
        var split = code.split('\n');
        split.forEach(function(line, i){
          split[i] = prefix + line;
        });

        return split.join('\n');
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