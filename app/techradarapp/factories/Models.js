var app = angular.module('TechRadarApp');

app.factory('BlipModel',function(){
    return function BlipModel(id, name, isNew, group)
    {
        var self = this;
        self.id = id;
        self.name = name;
        self.isNew = isNew;
        self.group =group;
        self.x = undefined;
        self.y = undefined;
    }
});

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
            setRadius();
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

app.factory('TechRadarModel',['BlipModel','RingModel','$rootScope','TrigFunctions','InnerSegmentGenerator',function(BlipModel,RingModel,rootScope,trigFunctions, innerSegmentGenerator){
    return function TechRadarModel (centerX, centerY){
        var self = this;
        self.rings = [];
        self.centerCords = {'x':centerX, 'y':centerY}
        self.groupLines = [];
        self.zoomLevel =1;
        self.selectedBlip ={};
        self.highlightedBlip ={};
        self.init = function()
        {
            var addoptRing = new RingModel('Adopt', 10, 80, self.centerCords);
            var trialRing = new RingModel('Trial', 90,160, self.centerCords);
            var candiateRing = new RingModel('Candidate', 170, 240, self.centerCords);
            self.addRing(addoptRing);
            self.addRing(trialRing);
            self.addRing(candiateRing);

            addoptRing.addBlip(new BlipModel('1', 'AngularJS', true,0));
            addoptRing.addBlip(new BlipModel('2', 'Knockout', true,0));
            addoptRing.addBlip(new BlipModel('3', 'SASS', true,0));
            addoptRing.addBlip(new BlipModel('4', 'Bootstrap', true,0));
            addoptRing.addBlip(new BlipModel('5', 'SPA', true,0));
            addoptRing.addBlip(new BlipModel('6', 'Jasmine', true,0));
            addoptRing.addBlip(new BlipModel('7', 'Selenium Web Driver', true,0));
            addoptRing.addBlip(new BlipModel('8', 'Jquery', true,0));
            addoptRing.addBlip(new BlipModel('9', 'HTML', true,0));
            addoptRing.addBlip(new BlipModel('10', 'CSS', true,0));

            addoptRing.addBlip(new BlipModel('11', 'Rabbit', true,1));
            addoptRing.addBlip(new BlipModel('12', 'Mongo', true,1));
            addoptRing.addBlip(new BlipModel('13', 'Continuous Integration', true,1));
            addoptRing.addBlip(new BlipModel('14', 'Git', true,1));
            addoptRing.addBlip(new BlipModel('15', 'NUnit', true,1));
            addoptRing.addBlip(new BlipModel('16', 'RhinoMocks', true,1));
            addoptRing.addBlip(new BlipModel('17', 'Vagrant', true,1));
            addoptRing.addBlip(new BlipModel('18', 'Virtual box', true,1));
            addoptRing.addBlip(new BlipModel('19', 'Jenkins', true,1));
            addoptRing.addBlip(new BlipModel('20', 'Continuous Delivery', true,1));
            addoptRing.addBlip(new BlipModel('21', 'Splunk', true,1));
            addoptRing.addBlip(new BlipModel('21', 'Configuration Managment', true,1));
            addoptRing.addBlip(new BlipModel('22', 'Resharper', true,1));
            addoptRing.addBlip(new BlipModel('23', 'Vim :-)', true,1));

            addoptRing.addBlip(new BlipModel('24', 'Feature Toggles', true,2));
            addoptRing.addBlip(new BlipModel('25', 'Ioslated components', true,2));
            addoptRing.addBlip(new BlipModel('26', 'Inversion of control', true,2));
            addoptRing.addBlip(new BlipModel('27', 'Poloygot programers', true,2));

            addoptRing.addBlip(new BlipModel('28', 'C#', true,3));
            addoptRing.addBlip(new BlipModel('29', 'Javascript', true,3));
            addoptRing.addBlip(new BlipModel('30', 'Ruby', true,3));

            trialRing.addBlip(new BlipModel('31', 'Plasma', true,0));
            trialRing.addBlip(new BlipModel('32', 'Web storage', true,0));
            trialRing.addBlip(new BlipModel('33', 'JqueryUI', true,0));

            trialRing.addBlip(new BlipModel('34', 'Node', true,1));
            trialRing.addBlip(new BlipModel('35', 'Mongose', true,1));
            trialRing.addBlip(new BlipModel('36', 'NPM', true,1));

            trialRing.addBlip(new BlipModel('37', 'Big visible metrics', true,2));
            trialRing.addBlip(new BlipModel('38', 'Naztag bunnies', true,2));
            trialRing.addBlip(new BlipModel('39', 'Build monitors', true,2));
            trialRing.addBlip(new BlipModel('40', 'Custom dashboards', true,2));
            trialRing.addBlip(new BlipModel('41', 'Information radiators', true,2));

            candiateRing.addBlip(new BlipModel('42', 'Foundation', true,0));
            candiateRing.addBlip(new BlipModel('43', 'Font Awesome', true,0));
            candiateRing.addBlip(new BlipModel('45', 'CSS3', true,0));
            candiateRing.addBlip(new BlipModel('46', 'CoffeScript', true,3));
            candiateRing.addBlip(new BlipModel('47', 'F#', true,3));
            candiateRing.addBlip(new BlipModel('48', 'Lisp', true,3));
            candiateRing.addBlip(new BlipModel('49', 'Go', true,3));
        }
        self.isSelectedBlip = function(blip)
        {
            return self.selectedBlip === blip;
        }
        self.isHighlightedBlip = function(blip)
        {
            return self.highlightedBlip === blip;
        }
        self.highlightGivenBlip = function(blip)
        {
            self.highlightedBlip = blip;
        }
        self.clearHighlightedBlip = function()
        {
            self.highlightedBlip = undefined;
        }

        self.selecteGivenBlip= function(blip)
        {
            if(self.selectedBlip ==blip)
            {
                self.selectedBlip = undefined;
                return;
            }
            self.selectedBlip = blip;
        }
        
        self.selectedRingAndGroup = {ring: undefined, group: undefined, selected: false};
        
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

        self.allBlipsForGroup = function(group)
        {
            var blipsInGroup = [];
            for(var r =0; r< self.rings.length; r++)
            {
                var currentRing = self.rings[r];
                var blipsForCurrentRingAndGroup = currentRing.groupedBlips[group];
                if(blipsForCurrentRingAndGroup)
                {
                    blipsInGroup = blipsInGroup.concat(blipsForCurrentRingAndGroup);
                }
            }
            return blipsInGroup;
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
