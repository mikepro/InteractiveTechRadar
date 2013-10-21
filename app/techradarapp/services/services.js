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

app.service('InitialData',['$http','_','RingModel','BlipModel', function($http,_,RingModel,BlipModel){
    var self = this;
    var startAtRadius =0;
    var radiusInc = 80;
    self.load =function(techRadarModel, center){
        $http.get('./sampleData.js')
        .success(function(data, status, headers, config){
            loadDataIntoModel(data);
        }).
        error(function(data, status, headers,config){
            alert('Boom! something went wrong failing back to hardcoded data');
            loadDataIntoModel(getDefaultData());
        });

        function loadDataIntoModel(data)
        {
            var currentRadius = startAtRadius;
            var ringModels = _.map(data.rings,function(ring){
                var newRing = new RingModel(ring.title,currentRadius,currentRadius + radiusInc, center); 
                currentRadius = currentRadius + radiusInc;
                return newRing;
            });

            _.forEach(ringModels,function(ring)
            {
                techRadarModel.addRing(ring);
                var blipsForRing = _.chain(data.rings)
                                    .filter(function(dataRing){
                                        return (dataRing.title === ring.title);})
                                    .map(function(dataRing){
                                        return dataRing.blips;})
                                    .map(function(blips){
                                        return _.map(blips,function(blip){return new BlipModel(blip.id, blip.name,blip.isNew, blip.group, blip.category)});
                                        })
                                    .value();
                //Hmm why does this result in an object containing an array and not the array
                _.forEach(blipsForRing[0],function(blip){
                    ring.addBlip(blip);
                });
            });
        }

        function getDefaultData()
        {
            return {
                "numberOfGroups": 4, 
                "rings": [
                    {"title":"Adopt", "blips":[
                            {"id":"1", "isNew": true, "group": 0, "name": "AngularJS"},
                            {"id":"2", "isNew": true, "group": 0, "name": "Knockout"},
                            {"id":"3", "isNew": true, "group": 0, "name": "SASS"},
                            {"id":"4", "isNew": true, "group": 0, "name": "Bootstrap"},
                            {"id":"5", "isNew": true, "group": 0, "name": "SPA"},
                            {"id":"6", "isNew": true, "group": 0, "name": "Jasmine"},
                            {"id":"7", "isNew": true, "group": 0, "name": "Selenium Web Driver"},
                            {"id":"8", "isNew": true, "group": 0, "name": "Jquery"},
                            {"id":"9", "isNew": true, "group": 0, "name": "HTML"},
                            {"id":"10", "isNew": true, "group": 0, "name": "CSS"},

                            {"id":"11", "isNew": true, "group":1, "name":"Rabbit"},
                            {"id":"12", "isNew": true, "group":1, "name":"Mongo"},
                            {"id":"13", "isNew": true, "group":1, "name":"Continuous Integration"},
                            {"id":"14", "isNew": true, "group":1, "name":"Git"},
                            {"id":"15", "isNew": true, "group":1, "name":"NUnit"},
                            {"id":"16", "isNew": true, "group":1, "name":"RhinoMocks"},
                            {"id":"17", "isNew": true, "group":1, "name":"Vagrant"},
                            {"id":"18", "isNew": true, "group":1, "name":"Virtual box"},
                            {"id":"19", "isNew": true, "group":1, "name":"Jenkins"},
                            {"id":"20", "isNew": true, "group":1, "name":"Continuous Delivery"},
                            {"id":"21", "isNew": true, "group":1, "name":"Splunk"},
                            {"id":"21", "isNew": true, "group":1, "name":"Configuration Managment"},
                            {"id":"22", "isNew": true, "group":1, "name":"Resharper"},
                            {"id":"23", "isNew": true, "group":1, "name":"Vim :-)"},

                            {"id":"24", "isNew": true, "group":2, "name":"Feature Toggles"},
                            {"id":"25", "isNew": true, "group":2, "name":"Ioslated components"},
                            {"id":"26", "isNew": true, "group":2, "name":"Inversion of control"},
                            {"id":"27", "isNew": true, "group":2, "name":"Poloygot programers"},

                            {"id":"28", "isNew": true,"group":3, "name":"C#"},
                            {"id":"29", "isNew": true,"group":3, "name":"Javascript"},
                            {"id":"30", "isNew": true,"group":3, "name":"Ruby"}
                        ]},
                    {"title":"Trial", "blips":[
                        {"id": "31","isNew":true,"group":0,"name":"Plasma"},
                        {"id": "32","isNew":true,"group":0,"name":"Web storage"},
                        {"id": "33","isNew":true,"group":0,"name":"JqueryUI"},
                        {"id": "34","isNew":true,"group":1,"name":"Node"},
                        {"id": "35","isNew":true,"group":1,"name":"Mongose"},
                        {"id": "36","isNew":true,"group":1,"name":"NPM"},
                        {"id": "37","isNew":true,"group":2,"name":"Big visible metrics"},
                        {"id": "38","isNew":true,"group":2,"name":"Naztag bunnies"},
                        {"id": "39","isNew":true,"group":2,"name":"Build monitors"},
                        {"id": "40","isNew":true,"group":2,"name":"Custom dashboards"},
                        {"id": "41","isNew":true,"group":2,"name":"Information radiators"}
                    ]},
                    {"title":"Candidate", "blips":[
                        {"id":"42","isNew":true,"group":0,"name":"Foundation"},
                        {"id":"43","isNew":true,"group":0,"name":"Font Awesome"},
                        {"id":"45","isNew":true,"group":0,"name":"CSS3"},
                        {"id":"46","isNew":true,"group":3,"name":"CoffeScript"},
                        {"id":"47","isNew":true,"group":3,"name":"F#"},
                        {"id":"48","isNew":true,"group":3,"name":"Lisp"},
                        {"id":"49","isNew":true,"group":3,"name":"Go"}
                        ]}
                ]
            };
        }
    };
}]);
