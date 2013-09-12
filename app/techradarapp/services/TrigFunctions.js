var app = angular.module('TechRadarApp');
app.service('TrigFunctions', function()
    {
        this.ConvertDegToRad = function(deg){
            return (deg * Math.PI)/180;
        },
        this.ConvertRadToDeg= function(rad)
        {
            return (rad * 180) / 180;
        }
    }
);

