describe('Should be able to convert ', function(){
    var trigFunc={};
    beforeEach(module('TechRadarApp'));
    beforeEach(inject(function(TrigFunctions){
         trigFunc = TrigFunctions;
    }));

    it("180 degress to radians", function(){
        var radian = trigFunc.ConvertDegToRad(180);
        var radianToThreeDecimalPlaces = radian.toFixed(3);
        expect(radianToThreeDecimalPlaces).toBe('3.142');
    });
    it("2 radians to degress",function(){
        var degress = trigFunc.ConvertRadToDeg(2);
        var degressToThreeDecimalPlaces = degress.toFixed(3);
        expect(degressToThreeDecimalPlaces).toBe('114.592');
    });
})
