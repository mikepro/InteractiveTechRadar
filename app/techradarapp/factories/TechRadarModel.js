
var app = angular.module('TechRadarApp');
app.factory('TechRadarModel',['BlipModel','RingModel','$rootScope','TrigFunctions',function(BlipModel,RingModel,rootScope,trigFunctions){
    return function TechRadarModel (centerX, centerY){
        var self = this;
        self.rings = [];
        self.centerCords = {'x':centerX, 'y':centerY}
        self.groupLines = [];
        self.zoomLevel =1;
        self.init = function()
        {
            self.addRing(new RingModel('Adopt', 0, 80, self.centerCords));
            self.addRing(new RingModel('Trial', 80,160, self.centerCords));
            self.addRing(new RingModel('Candidate', 160, 240, self.centerCords));

            self.rings[0].addBlip(new BlipModel('1', 'test', true,0));
            self.rings[0].addBlip(new BlipModel('2', 'test', true,0));
        }
        
        self.zoomIn = function()
        {
            self.zoomLevel = self.zoomLevel + 0.10;
        }

        self.zoomOut = function()
        {
            var roundedZoomLevel = trigFunctions.RoundToDecimalPlaces(self.zoomLevel, 1);
            if(roundedZoomLevel > 0.10)
            {
                self.zoomLevel = self.zoomLevel - 0.10;
            }
        }
    

        self.addRing = function(ringModel)
        {
            self.rings.push(ringModel);
            self.groupLines = computeGroupLines();
        }
        self.removeRing = function()
        {
            var removedRing = self.rings.pop();
            self.groupLines = computeGroupLines();
        }

        rootScope.$on('radiusChange',function(name, data){
            var indexRingChanged = self.rings.indexOf(data.ring);
            var radiusInc = data.inc;
            for(var count = indexRingChanged+1; count < self.rings.length; count++)
            {
                self.rings[count].offsetRadius(radiusInc);
            }
            self.groupLines = computeGroupLines();
        });

        function computeGroupLines()
        {
            var lastRingIndex = self.rings.length -1;
            var bigestRadius = self.rings[lastRingIndex].radius;

            var verticalx1 = self.centerCords.x;
            var verticaly1 = self.centerCords.y -bigestRadius;
            var verticalx2 = self.centerCords.x;
            var verticaly2 = self.centerCords.y + bigestRadius;

            var horzx1 = self.centerCords.x + bigestRadius
            var horzy1 = self.centerCords.y;
            var horzx2 = self.centerCords.x - bigestRadius;
            var horzy2 = self.centerCords.y;
            return [
                {x1: horzx1, y1: horzy1, x2: horzx2, y2: horzy2},
                {x1: verticalx1, y1: verticaly1, x2: verticalx2, y2: verticaly2}
            ];
        }
    }
}]);
