
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

  return calendarService;

});


