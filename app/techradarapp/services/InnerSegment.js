var app = angular.module('TechRadarApp');

app.service('InnerSegmentGenerator',function(TrigFunctions){
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

    self.generatePath = function(positions)
    {
        var svgPath = new PathBuilder()
                      .MoveTo(positions.startAt.x,positions.startAt.y)
                      .LineTo(positions.lineTo.x,positions.lineTo.y) 
                      .Arch(positions.endingRadius,true,positions.largeArchTo.x, positions.largeArchTo.y)
                      .LineTo(positions.secondLineTo.x, positions.secondLineTo.y)
                      .Arch(positions.startingRadius,false,positions.smallerArchTo.x,positions.smallerArchTo.y)
                      .Build();
        return svgPath;
    }

    function PathBuilder()
    {
        var self = this;
        commands = [];

        self.MoveTo = function(x,y)
        {
            commands.push("M "+x+" "+y);
            return this;
        }
        self.Arch = function(radius, isOuterArch, toX, toY)
        {
           var sweepFlag = (isOuterArch == true)? 1:0;
           commands.push("A "+ radius + " "+  radius+ " 0 0 "+sweepFlag+" "+toX+" "+toY);
           return this;
        }
        self.LineTo = function (x,y)
        {
            commands.push("L " +x+" " + y);
            return this;
        }
        self.Build = function()
        {
            var closePath = ' Z';
            return commands.join(' ')+closePath;
        }
        
    }
});
