angular.module('myWtrApp')
  .controller('calendarCtrl',['$scope','CalendarService', function($scope,CalendarService) {


    $scope.eventSources = CalendarService.eventSources;
    $scope.afficherFormulaireActivite=false;
    $scope.lesCodeProjet=[];
    $scope.modifierEvenement=false;
    $scope.idDisponible=0;
    $scope.idCourant;

    $scope.ajouterActivite = function(){
      $scope.modifierEvenement=false;
      $scope.afficherFormulaireActivite=true;
      $scope.startDate=null;
      $scope.endDate=null;
      $scope.codeProjet="";
    };

    $scope.modifierActivite=function(){
      CalendarService.modifierActivite({
        title: $scope.codeProjet,
        start: $scope.startDate,
        end: $scope.endDate,
        id : $scope.idCourant
      });
       //Si le nouveau codeProjet n'est pas dans la liste des codes existant on l'ajoute
       if(!_.findWhere($scope.lesCodeProjet,{code : $scope.codeProjet}))
        $scope.lesCodeProjet.push({code: $scope.codeProjet,name: $scope.codeProjet});
      $scope.afficherFormulaireActivite=false;
    };

    $scope.annulerActivite=function(){
        $scope.afficherFormulaireActivite=false;
    }

    $scope.enregistrerActivite=function(){
     CalendarService.ajouterActivite({
              title: $scope.codeProjet,
              start: $scope.startDate,
              end: $scope.endDate,
              id : $scope.idDisponible
            });
      $scope.lesCodeProjet.push({code: $scope.codeProjet,name: $scope.codeProjet});
      $scope.idDisponible++;
      $scope.afficherFormulaireActivite=false;
    };

    $scope.$watch("selectedCodeProjet",function(newValue,oldValue){
        if(newValue!=oldValue){
            $scope.codeProjet=newValue.code;
        }
    });

    $scope.onDayClick = function( date, jsEvent, view){
            $scope.alertMessage = (date.title + ' was clicked ');

    };

    $scope.onEventClick=function( date, jsEvent, view){
          $scope.startDate=date.start;
          $scope.endDate=date.end?date.end:date.start;
          $scope.codeProjet=date.title;
          $scope.idCourant = date.id;
          $scope.modifierEvenement=true;
          $scope.afficherFormulaireActivite=true;
    }

    $scope.uiConfig = {
          calendar:{
            //defaultView: 'agendaWeek',
            height: 450,
            lang: 'fr',
            firstDay: 1,
            weekends:false,
            editable: true,
            header:{
              left: 'title',
              center: 'prev,next',
              right:''
            },
            dayNames :["Dimanche","Lundi", "Mardi", "Mercredi", "Jeudi","Vendredi","Samedi"],
            dayNamesShort : ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
            monthNames: ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet',
             'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
            dayClick: $scope.onDayClick,
            eventClick: $scope.onEventClick,
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
