angular.module('myWtrApp')
  .controller('calendarCtrl',['$scope', function($scope) {

    $scope.eventSources =

    $scope.afficherFormulaireActivite=false;

    $scope.ajouterActivite = function(){
      $scope.afficherFormulaireActivite=true;
    };

    //TODO
    $scope.enregistrerActivite=function(){

      //Utiliser un service d'ajout au calendrier dans service.js
    }
}]);
