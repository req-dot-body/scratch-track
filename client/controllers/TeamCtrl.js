app.controller('TeamCtrl', ['$scope', function($scope) {

  $scope.team = [
    {
      name: 'Diana Lee',
      special: 'ng-death-metal',
      // img_src: './images/team/diana.jpg',
      img_src: './images/team/diana.png',
      github: 'dianafaye17', 
      bio: 'Pretty much one of the realest in the game right now'
    },
    {
      name: 'Sergio Martin',
      special: 'ng-mate-gourd',
      // img_src: './images/team/sergio.jpg',
      img_src: './images/team/sergio.png',
      github: 'smartinsantos',
      bio: 'Pretty much one of the realest in the game right now'
    },
    {
      name: 'Nick Poling',
      special: 'ng-nunchaku',
      // img_src: './images/team/nick.jpg',
      img_src: './images/team/nick.png',
      github: 'npoling', 
      bio: 'Pretty much one of the realest in the game right now'
    },
    {
      name: 'Diandra Ryan-Mas',
      special: 'ng-street-musician',
      // img_src: './images/team/diandra.jpg',
      img_src: './images/team/diandra.png',
      github: 'dryanmas',
      bio: 'Pretty much one of the realest in the game right now'
    },
    {
      name: 'Adam Ziehl',
      special: 'ng-deer-skinner',
      // img_src: './images/team/horse.jpg',
      img_src: './images/team/adam.png',
      github: 'ajziehl',
      bio: 'Pretty much one of the realest in the game right now'
    },
  ];

  $scope.stack = [
    './images/stack/foundation.png',
    './images/stack/nodejs.png',
    './images/stack/knex.svg',
    './images/stack/angular.png',
    './images/stack/postgres.png'
  ];
  
}]);

