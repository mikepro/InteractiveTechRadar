var app = angular.module('TechRadarApp');

app.service('TrigFunctions', function()
    {
        this.ConvertDegToRad = function(deg){
            return (deg * Math.PI)/180;
        },
        this.ConvertRadToDeg= function(rad)
        {
            return rad * (180 / Math.PI);
        }
        this.RoundToThreeDecimalPlaces = function(number)
        {
            return this.RoundToDecimalPlaces(number, 3);
        }

        this.padRadiusWith = function(radius, padding)
        {
            var sine = padding / radius;
            var radians = Math.asin(sine);
            var degres = this.ConvertRadToDeg(radians);
            return this.RoundToDecimalPlaces(degres,3);
        }

        this.RoundToDecimalPlaces = function(number, decimalPlaces)
        {
            return parseFloat(number.toFixed(decimalPlaces));
        }
        this.computeXandYCords = function(center, degress, radius)
        {
            var radians = this.RoundToDecimalPlaces(this.ConvertDegToRad(degress),4);
            var sine = this.RoundToDecimalPlaces(Math.sin(radians),4);
            var cosine = this.RoundToDecimalPlaces(Math.cos(radians),4);
            var newXCord = this.RoundToDecimalPlaces(center.x + (sine* radius),4);
            var newYCord = this.RoundToDecimalPlaces(center.y - (cosine * radius),4);
            return { x:newXCord, y:newYCord}; 
        }
    }
);

app.service('BlipFunctions',['TrigFunctions','SvgPathFactory',function(trigFunctions, SvgPathFactory){
    var self = this;
    self.calculateMaxNumberOfBlipsForRing = function(radius, distancePerBlib, numberOfGroups) 
    {
        var diameter = radius * 2;
        var circumference = diameter * Math.PI;
        var groupArchCircumference = circumference / numberOfGroups;
        return Math.floor(groupArchCircumference / distancePerBlib);
    }

    self.countNumberOfBlipsOnAgivenRing = function(startingRadius, radiusInc, ringNumber, distancePerBlib, totalLength)
    {
        var numberOfBlipsProccessedSoFar = 0;
        var itter =1;
        var numberOfGroups = 4;
        while(itter <=ringNumber)
        {
            var currentRadius = startingRadius + (radiusInc * (itter-1));
            var maxNumberOfBlipsForCurrentRing = self.calculateMaxNumberOfBlipsForRing(currentRadius, distancePerBlib, numberOfGroups);
            var isAtDesiredRing = itter == ringNumber;
            var hasMaxiumNumberOfBlips = totalLength >= numberOfBlipsProccessedSoFar + maxNumberOfBlipsForCurrentRing

            if(isAtDesiredRing && hasMaxiumNumberOfBlips)
            {
                return maxNumberOfBlipsForCurrentRing;
            }
            else if(isAtDesiredRing)
            {
                return totalLength - numberOfBlipsProccessedSoFar;
            }
            numberOfBlipsProccessedSoFar = numberOfBlipsProccessedSoFar + maxNumberOfBlipsForCurrentRing;
            itter = itter +1;
        }
    }

    self.calculateLargestRadius = function(startingRadius, radiusInc,distancePerBlib,blipLength,numberOfGroups)
    {
       var itemsProcessed =0;
       var currentRadius = startingRadius;
       while(itemsProcessed < blipLength)
       {
           var maxBlips =self.calculateMaxNumberOfBlipsForRing(currentRadius, distancePerBlib, numberOfGroups);
           itemsProcessed = itemsProcessed + maxBlips;
           if(itemsProcessed >= blipLength)
           {
               return currentRadius;
           }
           currentRadius = currentRadius + radiusInc;
       }
    }

    self.calculateBlipPositions = function(blips, center, group, startingRadius)
    {
        var localRadius =startingRadius;
        var blipPosition =0;
        var radiusNumber=1;
        var offset = 90*group;
        var radiusInc = 10;
        var distancePerBlib = 12.563;
        var numberOfGroups = 4
        var totalBlipsForIter =self.countNumberOfBlipsOnAgivenRing(startingRadius, radiusInc, radiusNumber, distancePerBlib, ((blips)? blips.length:0));
        var totalMaxBlipsForIter =self.calculateMaxNumberOfBlipsForRing(localRadius, distancePerBlib, numberOfGroups);
        var padding = 10;
        angular.forEach(blips, function(value, key){
                blipPosition = blipPosition +1; 
                var itteration = key +1;
                var shouldCreateNewRadius = blipPosition %(totalMaxBlipsForIter+1) ==0;
                if(shouldCreateNewRadius)
                {
                    createNewRadius();
                }
                var angle = (blipPosition * workOutNumberOfDegressForEachBlip()) - offset;
                setBlipPosition(value,angle);
        },this);

        function createNewRadius()
        {
            localRadius = localRadius + radiusInc;
            radiusNumber = radiusNumber +1;
            totalBlipsForIter =self.countNumberOfBlipsOnAgivenRing(startingRadius, radiusInc,radiusNumber, distancePerBlib, blips.length);
            totalMaxBlipsForIter =self.calculateMaxNumberOfBlipsForRing(localRadius, distancePerBlib, numberOfGroups);
            blipPosition=1; 
        }

        function workOutNumberOfDegressForEachBlip()
        {
            function paddingInDegress()
            {
                var isRadiusToSmallForPadding = localRadius <= padding;
                return (isRadiusToSmallForPadding)? 0 :trigFunctions.padRadiusWith(localRadius,padding);

            }
            var availableDegress = 90 - paddingInDegress();
            var totalBlips =  totalBlipsForIter>1? totalBlipsForIter: 2;
            return (availableDegress) / (totalBlips);
        }
        function setBlipPosition(blip, angle)
        {
            var newY = Math.sin(trigFunctions.ConvertDegToRad(angle)) * localRadius;
            var newX = Math.cos(trigFunctions.ConvertDegToRad(angle)) * localRadius;
            blip.x =trigFunctions.RoundToThreeDecimalPlaces(center.x + newX);
            blip.y = trigFunctions.RoundToThreeDecimalPlaces(center.y - newY);
        }
    }
    self.generateBlipsShapes = function (blips)
    {
        var blipRadius = 3;
        var triangleHeight = 9;
        var triangleWidth = 6;
        
        function updateBlipPath(blip, path)
        {
            blip.path = path;
        }

        angular.forEach(blips, function(blip, key){
            var blipCenter = {x:blip.x, y:blip.y};
            if(blip.isNew == true){updateBlipPath(blip, SvgPathFactory.CreateTriangle(blipCenter,triangleWidth, triangleHeight));}
            if(blip.isNew != true){updateBlipPath(blip, SvgPathFactory.CreateCircle(blipCenter,blipRadius));}
        },this);
    }
}]);

app.service('InnerSegmentGenerator',function(TrigFunctions,SvgPathBuilder){
    var self = this;
    self.computePositions =function(center, startingRadius, endingRadius,offset, numberOfDegress)
    {
        var startAt = TrigFunctions.computeXandYCords(center, offset, startingRadius);
        var lineTo = TrigFunctions.computeXandYCords(center, offset, endingRadius);
        var largeArch= TrigFunctions.computeXandYCords(center, offset + numberOfDegress, endingRadius);
        var secondLineTo = TrigFunctions.computeXandYCords(center, offset + numberOfDegress, startingRadius);
        return {
            'startAt': startAt,
            'lineTo': lineTo,
            'secondLineTo': secondLineTo,
            'largeArchTo': largeArch,
            'smallerArchTo': startAt,
            'endingRadius': endingRadius,
            'startingRadius': startingRadius
        }
    }
});
