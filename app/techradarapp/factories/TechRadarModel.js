
var app = angular.module('TechRadarApp');
app.factory('TechRadarModel',['BlipModel','RingModel',function(BlipModel,RingModel){
    return function TechRadarModel (centerX, centerY){
        var self = this;
        self.rings = [];
        self.centerCords = {'x':centerX, 'y':centerY}
        self.init = function()
        {
            self.addRing(new RingModel('test', 40, self.centerCords));
            self.addRing(new RingModel('bob', 60, self.centerCords));

            self.rings[0].addBlip(new BlipModel('1', 'test', true));
            self.rings[0].addBlip(new BlipModel('2', 'test', true));
        }

        self.addRing = function(ringModel)
        {
            self.rings.push(ringModel);
        }
        self.removeRing = function()
        {
            self.rings.pop();
        }
    }
}]);
