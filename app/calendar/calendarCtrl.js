angular.module('myWtrApp')
  .controller('calendarCtrl',['$scope','CalendarService', function($scope,CalendarService) {


    $scope.eventSources = CalendarService.eventSources;
    $scope.afficherFormulaireActivite=false;
    $scope.lesCodeProjet=[];

    $scope.ajouterActivite = function(){
      $scope.afficherFormulaireActivite=true;
      $scope.startDate=null;
      $scope.endDate=null;
      $scope.codeProjet="";
    };

    $scope.annulerActivite=function(){
        $scope.afficherFormulaireActivite=false;
    }

    $scope.enregistrerActivite=function(){
     CalendarService.ajouterActivite({
              title: $scope.codeProjet,
              start: $scope.startDate,
              end: $scope.endDate
            });
      $scope.lesCodeProjet.push({code: $scope.codeProjet,name: $scope.codeProjet});
      $scope.afficherFormulaireActivite=false;

    };

    $scope.$watch("selectedCodeProjet",function(newValue,oldValue){
        if(newValue!=oldValue){
            $scope.codeProjet=newValue.code;
        }
    });

    $scope.uiConfig = {
          calendar:{
            //defaultView: 'agendaWeek',
            height: 450,
            firstDay: 1,
            weekends:false,
            editable: true,
            header:{
              left: 'title',
              right: 'today prev,next'
            },
            dayNames :["Dimanche","Lundi", "Mardi", "Mercredi", "Jeudi","Vendredi","Samedi"],
            dayNamesShort : ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
            dayClick: $scope.alertEventOnClick,
            eventDrop: $scope.alertOnDrop,
            eventResize: $scope.alertOnResize
          }
        };

//--------------------------------------------------------------------
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
