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
            var multiplier = Math.pow(10,decimalPlaces);
            return Math.round(number * multiplier)/ multiplier;
        }
    }
);

