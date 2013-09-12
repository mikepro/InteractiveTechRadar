var app = angular.module('TechRadarApp');
app.factory('TrigFunctions', function(){
    return {
        ConvertDegToRad: function(deg){
            return (deg * Math.PI)/180;
        },
        ConvertRadToDeg: function(rad)
        {
            return (rad * 180) / 180;
        }
    };
}
);

