function GraphCtrl($scope, CalendarService) {
    $scope.options = {
                chart: {
                    type: 'pieChart',
                    height: 350,
                    x: function(d){return d.title;},
                    y: function(d){return dateDiff(d.start, d.end).day + 1},
                    showLabels: true,
                    transitionDuration: 500,
                    labelThreshold: 0.01,
                    legend: {
                        margin: {
                            top: 5,
                            right: 35,
                            bottom: 5,
                            left: 0
                        }
                    }
                }
            };
     $scope.options2 = {
                chart: {
                    type: 'pieChart',
                    height: 450,
                    donut: true,
                    x: function(d){return d.key;},
                    y: function(d){return d.y;},
                    showLabels: true,

                    pie: {
                        startAngle: function(d) { return d.startAngle/2 -Math.PI/2 },
                        endAngle: function(d) { return d.endAngle/2 -Math.PI/2 }
                    },
                    transitionDuration: 500,
                    legend: {
                        margin: {
                            top: 5,
                            right: 70,
                            bottom: 5,
                            left: 0
                        }
                    }
                }
            };

    $scope.nbJoursTravailles = 0;
    $scope.$on('newEvent', function() {
        $scope.data = CalendarService.events;
        $scope.nbJoursTravailles = 0;
        angular.forEach($scope.data, function(e) {
            $scope.nbJoursTravailles += dateDiff(e.start, e.end).day+1;
        });
        $scope.data2[1].y = 20 - $scope.nbJoursTravailles;
        $scope.data2[0].y = $scope.nbJoursTravailles;
    });
    $scope.data2 = [
        {
                key: 'Jours travaillés',
                y : $scope.nbJoursTravailles
        },
        {
            key: 'Nombre de jours',
            y : 20 - $scope.nbJoursTravailles
        }

    ]
    $scope.data = CalendarService.events;
    console.log($scope.data);

    function dateDiff(date1, date2){
        var diff = {}                           // Initialisation du retour
        var tmp = date2 - date1;

        tmp = Math.floor(tmp/1000);             // Nombre de secondes entre les 2 dates
        diff.sec = tmp % 60;                    // Extraction du nombre de secondes

        tmp = Math.floor((tmp-diff.sec)/60);    // Nombre de minutes (partie entière)
        diff.min = tmp % 60;                    // Extraction du nombre de minutes

        tmp = Math.floor((tmp-diff.min)/60);    // Nombre d'heures (entières)
        diff.hour = tmp % 24;                   // Extraction du nombre d'heures

        tmp = Math.floor((tmp-diff.hour)/24);   // Nombre de jours restants
        diff.day = tmp;

        return diff;
    }
}

angular.module('myWtrApp')
    .controller('GraphCtrl', GraphCtrl);