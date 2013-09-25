describe('Clickable ring construction',function(){
    var center = {x:0,y:0}
    var startingRadius =0;
    var endingRadius = 10;

    var clickableRingService={};
    beforeEach(module('TechRadarApp'));
    beforeEach(inject(function(ClickableRing){
        clickableRingService = ClickableRing;
    }));


    it('Should be able to create the correct curve',function(){
        var clickableRings = clickableRingService.construct(center,startingRadius,endingRadius,0);

        var curveRadius = clickableRings.curveRadius;

        expect(curveRadius.x).toBe(5);
        expect(curveRadius.y).toBe(5);
    });

    it('Should be able to create the correct curve when not the starting ring',function(){
        var clickableRings = clickableRingService.construct(center,6,12,0);

        var curveRadius = clickableRings.curveRadius;

        expect(curveRadius.x).toBe(9);
        expect(curveRadius.y).toBe(9);
    });

    it('Should be able to create the correct width of the string so as it fills the ring',function(){
        var clickableRings = clickableRingService.construct(center,6,12,0);
        var width = clickableRings.width;

        expect(width).toBe(6);
    });

    it('Should be possible to create all the clickable rings for each four quadrants',function(){
    
        var clickableRings = clickableRingService.constructAll(center,0,10);
        var firstGroup = clickableRings[0];
        expect(clickableRings.length).toBe(4);
        expect(firstGroup.startingAt.x).toBe(0);
        expect(firstGroup.startingAt.y).toBe(-5);
    });

    it('Should be able to create a svg path when a clickable ring is created',function(){
        var clickableRing = clickableRingService.construct(center,startingRadius,endingRadius,0);
        var expectedPath = "M0 -5 A5 5 0 0 0 5 0";
        expect(clickableRing.svgPath).toBe(expectedPath);
    });

    describe('for a given ring in the first group',function(){
        var firstGroup =0;

        it('Should be able to create the starting point for first group',function(){
            var clickableRings = clickableRingService.construct(center,startingRadius,endingRadius,firstGroup);
            var startCords = clickableRings.startingAt;

            expect(startCords.x).toBe(0);
            expect(startCords.y).toBe(-5);
        });

        it('Should be able to creating the ending point',function(){
            var clickableRings = clickableRingService.construct(center,startingRadius,endingRadius,firstGroup);
            var endCords = clickableRings.endingAt;

            expect(endCords.x).toBe(5);
            expect(endCords.y).toBe(0);
        });
    });

    describe('for a given ring in the second group',function(){
        var secondGroup =1;

        it('Should be able to create the starting point for second group',function(){
            var clickableRings = clickableRingService.construct(center,startingRadius,endingRadius,secondGroup);
            var startCords = clickableRings.startingAt;

            expect(startCords.x).toBe(5);
            expect(startCords.y).toBe(0);
        });

        it('Should be able to create the ending point for second group',function(){
            var clickableRings = clickableRingService.construct(center,startingRadius,endingRadius,secondGroup);
            var endingCords= clickableRings.endingAt;

            expect(endingCords.x).toBe(0);
            expect(endingCords.y).toBe(5);
        });
    });

    describe('for a given ring in the third group',function(){
        var thirdGroup=2;

        it('Should be able to create the starting point for third group',function(){
            var clickableRings = clickableRingService.construct(center,startingRadius,endingRadius,thirdGroup);
            var startCords = clickableRings.startingAt;


            expect(startCords.x).toBe(0);
            expect(startCords.y).toBe(5);
        });

        it('Should be able to create the ending point for third group',function(){
            var clickableRings = clickableRingService.construct(center,startingRadius,endingRadius,thirdGroup);
            var endingCords= clickableRings.endingAt;

            expect(endingCords.x).toBe(-5);
            expect(endingCords.y).toBe(0);
        });
    });

    describe('for a given ring in the forth group',function(){
        var fourthGroup=3;

        it('Should be able to create the starting point for forth group',function(){
            var clickableRings = clickableRingService.construct(center,startingRadius,endingRadius,fourthGroup);
            var startCords = clickableRings.startingAt;

            expect(startCords.x).toBe(-5);
            expect(startCords.y).toBe(0);
        });

        it('Should be able to create the ending point for foruth group',function(){
            var clickableRings = clickableRingService.construct(center,startingRadius,endingRadius,fourthGroup);
            var endingCords= clickableRings.endingAt;

            expect(endingCords.x).toBe(0);
            expect(endingCords.y).toBe(-5);
        });
    });
})
