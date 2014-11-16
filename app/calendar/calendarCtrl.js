angular.module('myWtrApp')
  .controller('calendarCtrl',['$scope','CalendarService','$rootScope','$filter', function($scope,CalendarService, $rootScope,$filter) {

    //TODO :ne pas ajoute un evenement avec un meme nom et jour deja present
    //TODO : Debug changement de mois
    //TODO refactoring
    $scope.eventSources = CalendarService.eventSources;
    $scope.afficherAjoutActivite=true;
    $scope.afficherFormulaireActivite=false;
    $scope.afficherActiviteDuJour=false;
    $scope.modifierEvenement=false;
    $scope.lesCodeProjet=[];
    $scope.idDisponible=0;
    $scope.idCourant;
    $scope.tjm=0;
    $scope.activiteDuJour=[];


    $scope.ajouterActivite = function(){
      $scope.afficherAjoutActivite=false;
      $scope.modifierEvenement=false;
      $scope.afficherFormulaireActivite=true;
      $scope.startDate=null
      $scope.endDate=null;
      $scope.codeProjet="";
      $scope.tjm=0;
      $scope.selectedCodeProjet="";
    };

    $scope.modifierActivite=function(){

     if(!$scope.formActivite.$valid) {
                return;
      }
      CalendarService.modifierActivite({
        title: $scope.codeProjet,
        start: $scope.startDate,
        end: $scope.endDate,
        tjm: $scope.tjm,
        id : $scope.idCourant
      });
       //Si le nouveau codeProjet n'est pas dans la liste des codes existant on l'ajoute
       if(!_.findWhere($scope.lesCodeProjet,{code : $scope.codeProjet}))
        $scope.lesCodeProjet.push({code: $scope.codeProjet,name: $scope.codeProjet});
      $scope.afficherFormulaireActivite=false;
      $scope.afficherAjoutActivite=true;
      $rootScope.$broadcast('newEvent');
    };

    $scope.afficherRecapitulatif = function(date, jsEvent, view){
        $scope.afficherFormulaireActivite=false;
        $scope.modifierEvenement=false;
        $scope.afficherAjoutActivite=false;
        $scope.activiteDuJour =CalendarService.recupererActiviteDuJour(date);
        if($scope.activiteDuJour.length==0){
            $scope.messageDuJour="Aucune activité n'est prévue le "+$filter('date')(date, "dd/MM/yyyy");
        }else{
            $scope.messageDuJour="Voici les activités du jour :";
        }
        $scope.afficherActiviteDuJour=true;
    }


    $scope.fermerRecapitulatif=function(){
        $scope.afficherActiviteDuJour=false;
        $scope.afficherAjoutActivite=true;
    }

    $scope.supprimerActivite = function(){
        CalendarService.supprimerActivite($scope.idCourant);
        $rootScope.$broadcast('newEvent');
        $scope.annulerActivite();
    }

    $scope.annulerActivite=function(){
        $scope.afficherFormulaireActivite=false;
        $scope.afficherAjoutActivite=true;
    }

    $scope.enregistrerActivite=function(){
     if(!$scope.formActivite.$valid) {
            return;
      }
     CalendarService.ajouterActivite({
              title: $scope.codeProjet,
              start: $scope.startDate,
              end: $scope.endDate,
              id : $scope.idDisponible,
              tjm: $scope.tjm,
            });
      $scope.lesCodeProjet.push({code: $scope.codeProjet,name: $scope.codeProjet});
      $scope.idDisponible++;
      $scope.afficherFormulaireActivite=false;
      $rootScope.$broadcast('newEvent');
      $scope.afficherAjoutActivite=true;
    };

    $scope.$watch("selectedCodeProjet",function(newValue,oldValue){
        if(newValue!=oldValue && newValue){
            $scope.codeProjet=newValue.code;
        }
    });

    $scope.onResizeClick=function( date, jsEvent, view){
      $scope.afficherFormulaireActivite=false;
      $scope.afficherAjoutActivite=true;
      $scope.afficherActiviteDuJour=false;
      $rootScope.$broadcast('newEvent');
    };

    //Lorsque l'on clique sur l'evenement
    $scope.onEventClick=function( date, jsEvent, view){
          $scope.startDate=date.start;
          $scope.endDate=date.end?date.end:date.start;
          $scope.codeProjet=date.title;
          $scope.idCourant = date.id;
          $scope.modifierEvenement=true;
          $scope.afficherFormulaireActivite=true;
          $scope.afficherAjoutActivite=false;
          $scope.afficherActiviteDuJour=false;
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
            dayClick: $scope.afficherRecapitulatif,
            eventClick: $scope.onEventClick,
            eventDrop: $scope.onResizeClick,
            eventResize: $scope.onResizeClick,
            viewRender: $scope.renderView
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
      //$scope.minDate = $scope.minDate ? null : new Date();
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
