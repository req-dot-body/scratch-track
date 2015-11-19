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

/*
To use: <vextab code=""></vextab>
set code equal to the code property of a stablature object

sad reality of this directive
in order for it to work you put have the following code on your view:

<script type="text/javascript">
  var jq = $
</script>
<script src="/js/vex.js"></script>
<script type="text/javascript">
  $ = jq;
</script>

 I'll try to fix this if I can.

 Goddammit, vex
*/