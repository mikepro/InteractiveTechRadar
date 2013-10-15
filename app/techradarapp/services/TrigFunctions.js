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
            //return Math.round(number * 1000)/ 1000;
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

