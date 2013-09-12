var app = angular.module('TechRadarApp');
app.controller('TechRadarController',['$scope','TrigFunctions', function($scope, TrigFunctions){
    var self = this;
    self.centerCords= {'x': 500, 'y': 250};
    $scope.model = new TechRadarModel(self.centerCords.x, self.centerCords.y, TrigFunctions);
    $scope.model.init();
    $scope.addRing = function()
    {
            var numberOfRings = $scope.model.rings.length;
            $scope.model.addRing(new RingModel('frank', numberOfRings ?$scope.model.rings[numberOfRings-1].radius + 40 : 40,self.centerCords));
    }

    $scope.removeRing = function()
    {
        $scope.model.removeRing();
    }
    $scope.addBlip = function(){
        $scope.model.rings[0].addBlip(new BlipModel('3', 't', false));
    }
    $scope.removeBlip = function(){
        $scope.model.rings[0].removeBlip();
    }
}]);

function RingModel(title, radius, center, trigFunctions)
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
        calculateBlipPositions();
    }
    self.removeBlip = function()
    {
        self.blips.pop();
        calculateBlipPositions();
    }

    function calculateMaxNumberOfBlipsForRing(radius, distancePerBlib, numberOfGroups)
    {
        var diameter = radius * 2;
        var circumference = diameter * Math.PI;
        var groupArchCircumference = circumference / numberOfGroups;
        return Math.floor(groupArchCircumference / distancePerBlib);

    }

    function calculateNumberOfBlipsForRing(startingRadius, radiusInc, ringNumber, distancePerBlib, totalLength)
    {
        var numberOfBlipsProccessedSoFar = 0;
        var itter =1;
        while(itter <=ringNumber)
        {
            var maxNumberOfBlipsForCurrentRing = calculateMaxNumberOfBlipsForRing(startingRadius + (radiusInc * (itter-1)), distancePerBlib, 4);
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

    function calculateBlipPositions()
    {
        this.localRadius = 40;
        var blipPosition =0;
        var radiusNumber=1;
        angular.forEach(self.blips, function(value, key){
                blipPosition = blipPosition +1; 
                var itteration = key +1;
                var totalBlipsForIter = calculateNumberOfBlipsForRing(40, 10, radiusNumber, 12.563, self.blips.length);
                var totalMaxBlipsForIter = calculateMaxNumberOfBlipsForRing(this.localRadius, 12.563, 4);
                if(blipPosition %(totalMaxBlipsForIter+1) ==0)
                {
                    this.localRadius = this.localRadius + 10;
                    radiusNumber = radiusNumber +1;
                    totalBlipsForIter = calculateNumberOfBlipsForRing(40, 10,radiusNumber, 12.563, self.blips.length);
                    totalMaxBlipsForIter = calculateMaxNumberOfBlipsForRing(this.localRadius, 12.563, 4);
                    blipPosition=1; 
                }
                var numberOfDegressForEachBlip = 80 / ( totalBlipsForIter>1? totalBlipsForIter: 2);
                var angle = blipPosition * numberOfDegressForEachBlip;
                var newY = Math.sin(trigFunctions.ConvertDegToRad(angle)) * localRadius;
                var newX = Math.cos(trigFunctions.ConvertDegToRad(angle)) * localRadius;
                value.x = center.x + newX;
                value.y = center.y - newY;
        },this);
    }
}

function BlipModel(id, name, isNew)
{
    var self = this;
    self.id = id;
    self.name = name;
    self.isNew = isNew;
    self.x = undefined;
    self.y = undefined;
}

function TechRadarModel (centerX, centerY,trigFunctions){
    var self = this;
    self.rings = [];
    self.centerCords = {'x':centerX, 'y':centerY}
    self.init = function()
    {
        self.addRing(new RingModel('test', 40, self.centerCords, trigFunctions));
        self.addRing(new RingModel('bob', 60, self.centerCords, trigFunctions));

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
