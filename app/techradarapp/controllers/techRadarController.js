var app = angular.module('TechRadarApp');
app.controller('TechRadarController',['$scope','TechRadarModel','RingModel', function($scope,TechRadarModel,RingModel){
    var self = this;
    self.centerCords= {'x': 500, 'y': 250};
    $scope.model = new TechRadarModel(self.centerCords.x, self.centerCords.y );
    $scope.model.init();
    $scope.addRing = function()
    {
        var numberOfRings = $scope.model.rings.length;
        $scope.model.addRing(new RingModel('trial', numberOfRings ?$scope.model.rings[numberOfRings-1].radius + 80 : 80,self.centerCords));
    }

    $scope.removeRing = function()
    {
        $scope.model.removeRing();
    }
    $scope.addBlip = function(group){
        $scope.model.rings[0].addBlip(new BlipModel('3', 't', false,group));
    }
    $scope.removeBlip = function(){
        $scope.model.rings[0].removeBlip();
    }
}]);
