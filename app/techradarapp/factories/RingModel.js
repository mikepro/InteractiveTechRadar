var app = angular.module('TechRadarApp');
app.factory('RingModel',['TrigFunctions','BlipFunctions','$rootScope','ClickableRing',function(trigFunctions, blipFunctions, rootScope,clickableRing){
    return function RingModel(title, startingRadius, radius, center)
    {
        var self = this;
        self.title = title;
        self.radius = radius;
        self.y = undefined;
        self.x = undefined; 
        setTextPosition(radius);
        self.blips = [];
        self.groupedBlips ={};
        self.startingRadius = startingRadius;
        self.clickableRings = clickableRing.constructAll(center, self.startingRadius,radius);
        self.addBlip = function(blipModel)
        {
            var group = blipModel.group;
            self.blips.push(blipModel);
            if(!self.groupedBlips[group])
            {
                self.groupedBlips[group] =[];
            }
            self.groupedBlips[group].push(blipModel);
            blipFunctions.calculateBlipPositions(self.groupedBlips[group] , center, group,self.startingRadius);
            setRadius();
        }
        self.removeBlip = function()
        {
            var removedBlip = self.blips.pop();
            var groupToCalculate = removedBlip.group;
            self.groupedBlips[groupToCalculate].pop();
            blipFunctions.calculateBlipPositions(self.groupedBlips[groupToCalculate],center,groupToCalculate,self.startingRadius);
            setRadius();
        }

        self.offsetRadius = function(offset){
            self.radius = self.radius + offset;
            self.startingRadius = self.startingRadius + offset;
            setTextPosition(self.radius);
            offsetClickableRing();
            offsetAllBlips();
        }

        function offsetAllBlips()
        {
            var numberOfGroups = 4;
            for(var group=0; group< numberOfGroups;group++)
            {
                blipFunctions.calculateBlipPositions(self.groupedBlips[group] , center,group,self.startingRadius);
            }
        }

        function offsetClickableRing(){
            self.clickableRings = clickableRing.constructAll(center, self.startingRadius,self.radius);
        }

        function setTextPosition(radius)
        {
            self.y = center.y;
            self.x = center.x + radius -80;
        }

        function setRadius()
        {
            function getLargestRadius()
            {
                var radiusSoFar = 0;
                angular.forEach(self.groupedBlips, function(value, index){
                   var currentRadius = blipFunctions.calculateLargestRadius(self.startingRadius,10,12.563,value.length,4) + 10; 
                   if(currentRadius >radiusSoFar)
                    {
                        radiusSoFar= currentRadius;
                    }
                });
                return radiusSoFar;
            }

            function hasRadiusChanged()
            {
                return hasRadiusIncreased=== true || hasRadiusDecreased===true;
            }

            function changeRadius()
            {
                var radiusChangeInc = 10;
                if(hasRadiusDecreased=== true)
                {
                    radiusChangeInc = radiusChangeInc *-1;
                }
                self.radius =biggestGroupRadius; 
                rootScope.$broadcast('radiusChange',{ring:self, inc: radiusChangeInc});
                setTextPosition(biggestGroupRadius);
                offsetClickableRing();
            }

            var biggestGroupRadius = getLargestRadius();

            var hasRadiusIncreased = biggestGroupRadius > self.radius;
            var hasRadiusDecreased = biggestGroupRadius < self.radius && !(self.radius < radius);
            if(hasRadiusChanged() && biggestGroupRadius > radius)
            {
                changeRadius();
            }
        }
    }
}]);
