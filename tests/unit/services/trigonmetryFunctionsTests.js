describe('Should be able to convert ', function(){
    var trigFunc={};
    beforeEach(module('TechRadarApp'));
    beforeEach(inject(function(TrigFunctions){
         trigFunc = TrigFunctions;
    }));

    it("degress to radians", function(){
        var radian = trigFunc.ConvertDegToRad(180);
        var radianToThreeDecimalPlaces = radian.toFixed(3);
        expect(radianToThreeDecimalPlaces).toBe('3.142');
    });
    it("radians to degress",function(){
        var degress = trigFunc.ConvertRadToDeg(2);
        var degressToThreeDecimalPlaces = degress.toFixed(3);
        expect(degressToThreeDecimalPlaces).toBe('114.592');
    });
    it('to three decimal places', function(){
        var threePlaces = trigFunc.RoundToThreeDecimalPlaces(3.5969);
        expect(threePlaces).toBe(3.597);
    });
    it('should work out the correct amount of degress to accomidate padding with radius 30', function(){
        var radius = 30;
        var padding = 10;
        var degress = trigFunc.padRadiusWith(radius,padding);
        expect(degress).toBe(19.471);

    });
    it('should work out the correct amount of degress to accomidate padding with radius 60', function(){
        var radius = 60;
        var padding = 10;
        var degress = trigFunc.padRadiusWith(radius,padding);
        expect(degress).toBe(9.594);

    });
})
