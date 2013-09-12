var app = angular.module('TechRadarApp');
app.factory('RingModel',['TrigFunctions','BlipFunctions',function(trigFunctions, blipFunctions){
    return function RingModel(title, radius, center)
    {
        var self = this;
        self.title = title;
        self.radius = radius;
        self.y = center.y+ radius -10;
        self.x = center.x; 
        self.blips = [];
        self.addBlip = function(blipModel)
        {
            self.blips.push(blipModel);
            blipFunctions.calculateBlipPositions(self.blips, center);
        }
        self.removeBlip = function()
        {
            self.blips.pop();
            blipFunctions.calculateBlipPositions(self.blips,center);
        }
    }
}]);
