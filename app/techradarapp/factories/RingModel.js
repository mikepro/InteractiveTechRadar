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
        self.groupedBlips ={};
        self.addBlip = function(blipModel)
        {
            var group = blipModel.group;
            self.blips.push(blipModel);
            if(!self.groupedBlips[group])
            {
                self.groupedBlips[group] =[];
            }
            self.groupedBlips[group].push(blipModel);
            blipFunctions.calculateBlipPositions(self.groupedBlips[group] , center, group);
        }
        self.removeBlip = function()
        {
            var removedBlip = self.blips.pop();
            var groupToCalculate = removedBlip.group;
            self.groupedBlips[groupToCalculate].pop();
            blipFunctions.calculateBlipPositions(self.groupedBlips[groupToCalculate],center,groupToCalculate);
        }
    }
}]);
