var app = angular.module('TechRadarApp');

app.factory('BlipModel',function(){
    return function BlipModel(id, name, isNew, group, product)
    {
        var self = this;
        self.id = id;
        self.name = name;
        self.isNew = isNew;
        self.group =group;
        self.x = undefined;
        self.y = undefined;
        self.path ='';
        self.product = product;
    }
});

app.factory('RingModel',['TrigFunctions','BlipFunctions','$rootScope','SvgPathFactory',function(trigFunctions, blipFunctions, rootScope,SvgPathFactory){
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
        self.segments = [];
        var numberOfGroups = 4;
        var degressInEachGroup = 90;
        var blipPadding = 10;

        initalizeSegments(numberOfGroups);
        function initalizeSegments(numberOfGroups)
        {
            self.segments = [];
            for(var i=0;i<numberOfGroups;i++)
            {
                var offset = degressInEachGroup * i;
                var segment = SvgPathFactory.CreateSegment(center,self.startingRadius,self.radius,offset, degressInEachGroup);
                self.segments.push(segment);
            }
        }
        self.addBlip = function(blipModel)
        {
            var group = blipModel.group;
            self.blips.push(blipModel);
            if(!self.groupedBlips[group])
            {
                self.groupedBlips[group] =[];
            }
            self.groupedBlips[group].push(blipModel);
            recalculateBlipPositions(self.groupedBlips[group] , center, group, blipPadding);
            setRadius();
        }
        self.removeBlip = function()
        {
            var removedBlip = self.blips.pop();
            var groupToCalculate = removedBlip.group;
            self.groupedBlips[groupToCalculate].pop();
            recalculateBlipPositions(self.groupedBlips[groupToCalculate],center,groupToCalculate,blipPadding);
            setRadius();
        }

        self.offsetRadius = function(offset){
            self.radius = self.radius + offset;
            self.startingRadius = self.startingRadius + offset;
            setTextPosition(self.radius);
            offsetSegments();
            offsetAllBlips();
        }

        function offsetAllBlips()
        {
            for(var group=0; group< numberOfGroups;group++)
            {
                recalculateBlipPositions(self.groupedBlips[group] , center,group,blipPadding);
            }
            setRadius();
        }

        function recalculateBlipPositions(blips, center, group,padding)
        {
            blipFunctions.calculateBlipPositions(blips, center,group,self.startingRadius + padding);
            blipFunctions.generateBlipsShapes(blips);
        }

        function offsetSegments(){
            initalizeSegments(numberOfGroups);
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
                   var currentRadius = blipFunctions.calculateLargestRadius(self.startingRadius + blipPadding,10,12.563,value.length,numberOfGroups) + 10;
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
                offsetSegments();
            }

            var biggestGroupRadius = getLargestRadius();

            var hasRadiusIncreased = biggestGroupRadius > self.radius;
            var hasRadiusDecreased = biggestGroupRadius < self.radius && ((self.radius - self.startingRadius) > (radius - startingRadius));
            if(hasRadiusChanged() && biggestGroupRadius > radius)
            {
                changeRadius();
            }
        }
    }
}]);

app.factory('TechRadarModel',['BlipModel','RingModel','$rootScope','TrigFunctions',function(BlipModel,RingModel,rootScope,trigFunctions){
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
            var addoptRing = new RingModel('Adopt', 0, 70, self.centerCords);
            var trialRing = new RingModel('Trial', 70,140, self.centerCords);
            var candiateRing = new RingModel('Candidate', 140, 210, self.centerCords);
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
        }
        self.removeRing = function()
        {
            var removedRing = self.rings.pop();
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
        });
    }
}]);

app.factory('FilterModel',[function(){
    return function FilterModel()
    {
        var self = this;
        self.searchTerm = undefined;
        self.products = [];
        self.allProductsSelected= true;
        self.addProduct = function(newProduct)
        {
            var productHasAname = newProduct.name != undefined && newProduct.name != '';
            var productDoesNotExist = true;
            angular.forEach(self.products,function(existingProduct, key){
                if(productHasAname && existingProduct.name.toLowerCase() == newProduct.name.toLowerCase())
                {
                    productDoesNotExist = false;
                }
            });
            if(productHasAname && productDoesNotExist)
            {
                self.products.push(newProduct);
            }
        }
    }
}]);

app.factory('FilterProductModel',[function(){
    return function FilterProductModel(name, isSelected)
    {
        var self = this;
        self.name= name;
        self.isSelected = isSelected;
    }
}]);

app.factory('SvgPathBuilder',[function(){
    return function PathBuilder()
    {
        var self = this;
        var commands = [];
        var isClosePath = true;

        self.MoveTo = function(x,y)
        {
            commands.push("M "+x+" "+y);
            return this;
        }
        self.Arch = function(radius, isSweepFlag, toX, toY, isLargeArc)
        {
           var sweepFlag = (isSweepFlag == true)? 1:0;
           var largeArcFlag = (isLargeArc == true)? 1: 0;
           commands.push("A "+ radius + " "+  radius+ " 0 " + largeArcFlag+" "+sweepFlag+" "+toX+" "+toY);
           return this;
        }
        self.WithClosePath = function(value)
        {
            isClosePath = value;
            return this;
        }
        self.LineTo = function (x,y)
        {
            commands.push("L " +x+" " + y);
            return this;
        }
        self.Build = function()
        {
            var closePath = '';
            if(isClosePath ==true)
            {
                closePath = ' Z';
            }
            return commands.join(' ')+closePath;
        }
    }
}]);

app.factory('SvgPathFactory',['SvgPathBuilder','InnerSegmentGenerator',function(pathBuilder,InnerSegmentGenerator){
    return {
        CreateTriangle: function(center, width, height)
        {
            var halfWidth = width / 2;
            var halfHeight = height / 2;

            var triangle = new pathBuilder().MoveTo(center.x - halfWidth, center.y + halfHeight)
                .LineTo(center.x,center.y - halfHeight)
                .LineTo(center.x + halfWidth, center.y + halfHeight)
                .Build();
            return triangle;
        },
        CreateCircle: function(center,radius)
        {
            var circle = new pathBuilder().MoveTo(center.x, center.y - radius)
                .Arch(radius,false,center.x, center.y, true)
                .Build();
            return circle;
        },
        CreateSegment: function(center, startingRadius, endingRadius,offset, numberOfDegress)
        {
            var positions = InnerSegmentGenerator.computePositions(center, startingRadius,endingRadius,offset,numberOfDegress);
            var segment = new pathBuilder()
                .MoveTo(positions.startAt.x,positions.startAt.y)
                .LineTo(positions.lineTo.x,positions.lineTo.y) 
                .Arch(positions.endingRadius,true,positions.largeArchTo.x, positions.largeArchTo.y)
                .LineTo(positions.secondLineTo.x, positions.secondLineTo.y)
                .Arch(positions.startingRadius,false,positions.smallerArchTo.x,positions.smallerArchTo.y)
                .Build();
            return segment;
        }
    }
}]);
