
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


  return calendarService;

});


