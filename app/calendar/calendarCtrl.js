angular.module('myWtrApp')
  .controller('calendarCtrl',['$scope','CalendarService', function($scope,CalendarService) {


    $scope.eventSources = CalendarService.eventSources;

    $scope.afficherFormulaireActivite=false;

    $scope.ajouterActivite = function(){
      $scope.afficherFormulaireActivite=true;
    };

    $scope.enregistrerActivite=function(){
     CalendarService.ajouterActivite({
              title: $scope.codeProjet,
              start: $scope.startDate,
              end: $scope.endDate
            });
    };


    //Options pour le dateTimePicker => a mettre dans un service?
    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
      $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
      return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.openStart = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.openedStart = true;
    };

    $scope.openEnd = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.openedEnd = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };
    $scope.format = 'dd/MM/yyyy';
}]);
