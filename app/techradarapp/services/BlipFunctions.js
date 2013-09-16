var app = angular.module('TechRadarApp');

app.service('BlipFunctions',['TrigFunctions',function(trigFunctions){
    this.calculateMaxNumberOfBlipsForRing = function(radius, distancePerBlib, numberOfGroups) 
    {
        var diameter = radius * 2;
        var circumference = diameter * Math.PI;
        var groupArchCircumference = circumference / numberOfGroups;
        return Math.floor(groupArchCircumference / distancePerBlib);

    }

    this.calculateNumberOfBlipsForRing = function(startingRadius, radiusInc, ringNumber, distancePerBlib, totalLength)
    {
        var numberOfBlipsProccessedSoFar = 0;
        var itter =1;
        while(itter <=ringNumber)
        {
            var maxNumberOfBlipsForCurrentRing = this.calculateMaxNumberOfBlipsForRing(startingRadius + (radiusInc * (itter-1)), distancePerBlib, 4);
            if(itter == ringNumber)
            {
                if(totalLength >= numberOfBlipsProccessedSoFar + maxNumberOfBlipsForCurrentRing)
                {
                        return maxNumberOfBlipsForCurrentRing;
                }
                else
                {
                    return totalLength - numberOfBlipsProccessedSoFar;
                }
            }
            numberOfBlipsProccessedSoFar = numberOfBlipsProccessedSoFar + maxNumberOfBlipsForCurrentRing;
            itter = itter +1;
        }
    }

    this.calculateBlipPositions = function(blips, center)
    {
        this.localRadius = 40;
        var blipPosition =0;
        var radiusNumber=1;
        angular.forEach(blips, function(value, key){
                blipPosition = blipPosition +1; 
                var itteration = key +1;
                var totalBlipsForIter = this.calculateNumberOfBlipsForRing(40, 10, radiusNumber, 12.563, blips.length);
                var totalMaxBlipsForIter = this.calculateMaxNumberOfBlipsForRing(this.localRadius, 12.563, 4);
                if(blipPosition %(totalMaxBlipsForIter+1) ==0)
                {
                    this.localRadius = this.localRadius + 10;
                    radiusNumber = radiusNumber +1;
                    totalBlipsForIter = this.calculateNumberOfBlipsForRing(40, 10,radiusNumber, 12.563, blips.length);
                    totalMaxBlipsForIter = this.calculateMaxNumberOfBlipsForRing(this.localRadius, 12.563, 4);
                    blipPosition=1; 
                }
                var numberOfDegressForEachBlip = 80 / ( totalBlipsForIter>1? totalBlipsForIter: 2);
                var angle = blipPosition * numberOfDegressForEachBlip;
                var newY = Math.sin(trigFunctions.ConvertDegToRad(angle)) * this.localRadius;
                var newX = Math.cos(trigFunctions.ConvertDegToRad(angle)) * this.localRadius;
                value.x = Math.round((center.x + newX) * 1000)/ 1000;
                value.y = Math.round((center.y - newY) * 1000)/1000;
        },this);
    }
}]);

