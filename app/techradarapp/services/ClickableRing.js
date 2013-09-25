var app= angular.module('TechRadarApp');
app.service('ClickableRing',function(){
    this.construct = function(startingCords, firstRadius, secondRadius, group){
        var model = new ClickableModel();

        var midpoint = (secondRadius - firstRadius) / 2;
        var innerRadius = firstRadius +midpoint;

        model.curveRadius.x = innerRadius;
        model.curveRadius.y = innerRadius;

        setupGroupOne(model,group, startingCords,innerRadius);
        setupGroupTwo(model,group, startingCords,innerRadius);
        setupGroupThree(model,group, startingCords,innerRadius);
        setupGroupFour(model,group, startingCords,innerRadius);

        return model;
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
    }
});

