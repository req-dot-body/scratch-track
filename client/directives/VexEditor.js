app.directive('vexeditor', function($compile){
  return{
    restrict: 'E',
    templateUrl: '../views/vexEditor.html',
    controller: 'StablatureCtrl'
  }
});