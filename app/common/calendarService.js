
//Calendar
angular.module('myWtrApp').factory('CalendarService', function () {
  var calendarService = {};

  //getter
  calendarService.events = [];

  //Config
  calendarService.eventSource={};
  calendarService.eventsF = function (start, end, callback) {
                 callback(calendarService.events);
               };
  calendarService.eventSources = [calendarService.events, calendarService.eventSource, calendarService.eventsF];


  //Ajoute un evenement au calendrier
  calendarService.ajouterActivite=function(eventToAdd){
    calendarService.events.push(eventToAdd);
  }

  //Modifier un evenement du calendrier
  calendarService.modifierActivite=function(eventToUpdate){
   var eventTrouve =  _.findWhere(calendarService.events,{id:eventToUpdate.id});
   eventTrouve.title = eventToUpdate.title;
   eventTrouve.start=eventToUpdate.start;
   eventTrouve.end=eventToUpdate.end;
  }

  calendarService.supprimerActivite = function(idASupprimer){
       angular.forEach(calendarService.events,function(value, key){
                if(calendarService.events[key].id === idASupprimer){
                  calendarService.events.splice(key,1);

                }});
  }

  calendarService.recupererActiviteDuJour = function(date){
    var activitesARetourner=[];
    _.map(calendarService.events,function(unEvent){
        //Soit le end est nul et le start est exactement egal a date
        if(!unEvent.end && unEvent.start.getDate() == date.getDate()  ){
            activitesARetourner.push(unEvent);
        }
        else if(unEvent.start<=date && unEvent.end>=date ){
            activitesARetourner.push(unEvent);
        }
        //Soit le end est non nul ET la date est entre Start et End
    });
     return activitesARetourner;
  }

  return calendarService;

});


