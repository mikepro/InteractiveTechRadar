var app= angular.module('TechRadarApp');
app.service('ClickableRing',function(){
    this.construct = function(startingCords, firstRadius, secondRadius, group){
        var model = new ClickableModel();

        var radiusDifference = secondRadius - firstRadius;
        var midpoint = radiusDifference / 2;
        var innerRadius = firstRadius +midpoint;

        model.curveRadius.x = innerRadius;
        model.curveRadius.y = innerRadius;
        model.width =radiusDifference;

        setupGroupOne(model,group, startingCords,innerRadius);
        setupGroupTwo(model,group, startingCords,innerRadius);
        setupGroupThree(model,group, startingCords,innerRadius);
        setupGroupFour(model,group, startingCords,innerRadius);

        model.svgPath = createSvgPath(model);

        return model;
    }
    this.constructAll = function(startingCords,firstRadius,secondRadius){
        var models=[];
        for(var i=0;i<4;i++)
        {
            models.push(this.construct(startingCords,firstRadius,secondRadius,i));
        }
        return models;
    }
    function createSvgPath(clickableModel)
    {
        var moveTocommand = "M"+clickableModel.startingAt.x + ' '+clickableModel.startingAt.y + ' ';
        var createArchRadius = "A"+clickableModel.curveRadius.x + ' '+clickableModel.curveRadius.y + ' ';
        var typeOfArch = '0 0 0 ';
        var endingCords = clickableModel.endingAt.x + ' ' + clickableModel.endingAt.y;
        return moveTocommand + createArchRadius + typeOfArch+endingCords;
    }

    function setupGroupOne(model,group,startingCords, innerRadius){
        if(group ===0)
        {
            model.startingAt.x = startingCords.x;
            model.startingAt.y = startingCords.y -innerRadius;

            model.endingAt.x = startingCords.x + innerRadius;
            model.endingAt.y = startingCords.y;
        }
    }
    function setupGroupTwo(model,group,startingCords, innerRadius){
        if(group === 1)
        {
            model.startingAt.x =startingCords.x + innerRadius;
            model.startingAt.y = startingCords.y;

            model.endingAt.x = startingCords.x;
            model.endingAt.y =startingCords.y + innerRadius;
        }
    }

    function setupGroupThree(model,group,startingCords, innerRadius){
        if(group === 2)
        {
            model.startingAt.x = startingCords.x;
            model.startingAt.y = startingCords.y + innerRadius;

            model.endingAt.x = startingCords.x - innerRadius;
            model.endingAt.y = startingCords.y;
        }
    }
    function setupGroupFour(model,group,startingCords, innerRadius){
        if(group === 3)
        {
            model.startingAt.x = startingCords.x- innerRadius;
            model.startingAt.y = startingCords.y;

            model.endingAt.x = startingCords.x;
            model.endingAt.y = startingCords.y - innerRadius;
        }
    }

    function ClickableModel()
    {
        this.startingAt = {x:undefined,y:undefined};
        this.endingAt = {x:undefined,y:undefined};
        this.curveRadius ={x:undefined,y:undefined};
        this.svgPath = undefined;
        this.width = undefined;
    }
});

