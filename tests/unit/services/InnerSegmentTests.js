describe('InnerSegmentTests',function(){
    var innerSegmentGenerator =[];
    beforeEach(module('TechRadarApp'));
    beforeEach(inject(function(InnerSegmentGenerator){
         innerSegmentGenerator= InnerSegmentGenerator;
    }));
    describe('Should compute the correct postions when',function(){
        var offset = 0;
        var numberOfDegres = 90;
        it('having a starting radius of 30 and an ending radius of 300',function(){
            var centeredAt= {x:0,y:0}
            var startingRadius = 30;
            var endingRadius = 300;

            var positions = innerSegmentGenerator.computePositions(centeredAt,startingRadius,endingRadius, offset ,numberOfDegres);
            expect(positions.startAt.x).toBe(0);
            expect(positions.startAt.y).toBe(-30);

            expect(positions.lineTo.x).toBe(0);
            expect(positions.lineTo.y).toBe(-300);

            expect(positions.largeArchTo.x).toBe(300);
            expect(positions.largeArchTo.y).toBe(0);

            expect(positions.secondLineTo.x).toBe(30);
            expect(positions.secondLineTo.y).toBe(0);

            expect(positions.smallerArchTo.x).toBe(0);
            expect(positions.smallerArchTo.y).toBe(-30);
        });
        it('having a starting radius of 50 and an ending radius of 290',function(){
            var centeredAt= {x:0,y:0}
            var startingRadius = 50;
            var endingRadius = 290;

            var positions= innerSegmentGenerator.computePositions(centeredAt,startingRadius,endingRadius, offset, numberOfDegres);
            expect(positions.startAt.x).toBe(0);
            expect(positions.startAt.y).toBe(-50);

            expect(positions.lineTo.x).toBe(0);
            expect(positions.lineTo.y).toBe(-290);

            expect(positions.largeArchTo.x).toBe(290);
            expect(positions.largeArchTo.y).toBe(0);

            expect(positions.secondLineTo.x).toBe(50);
            expect(positions.secondLineTo.y).toBe(0);

            expect(positions.smallerArchTo.x).toBe(0);
            expect(positions.smallerArchTo.y).toBe(-50);
        });
        it('having a radius of 50 an ending radius of 290 and orgin at {x:10,y:50}',function(){
            var centeredAt= {x:10,y:50}
            var startingRadius = 50;
            var endingRadius = 290;

            var positions= innerSegmentGenerator.computePositions(centeredAt,startingRadius,endingRadius, offset, numberOfDegres);
            expect(positions.startAt.x).toBe(10);
            expect(positions.startAt.y).toBe(0);

            expect(positions.lineTo.x).toBe(10);
            expect(positions.lineTo.y).toBe(-240);

            expect(positions.largeArchTo.x).toBe(300);
            expect(positions.largeArchTo.y).toBe(50);

            expect(positions.secondLineTo.x).toBe(60);
            expect(positions.secondLineTo.y).toBe(50);

            expect(positions.smallerArchTo.x).toBe(10);
            expect(positions.smallerArchTo.y).toBe(0);
        });
        it('having a radius of 50 an ending radius of 290 and offset by 10 degress ',function(){
            var centeredAt= {x:0,y:0}
            var startingRadius = 50;
            var endingRadius = 290;

            var positions= innerSegmentGenerator.computePositions(centeredAt,startingRadius,endingRadius,10, numberOfDegres);
            expect(positions.startAt.x).toBe(8.68);
            expect(positions.startAt.y).toBe(-49.24);

            expect(positions.lineTo.x).toBe(50.344);
            expect(positions.lineTo.y).toBe(-285.592);

            expect(positions.largeArchTo.x).toBe(285.592);
            expect(positions.largeArchTo.y).toBe(50.344);

            expect(positions.secondLineTo.x).toBe(49.24);
            expect(positions.secondLineTo.y).toBe(8.68);

            expect(positions.smallerArchTo.x).toBe(8.68);
            expect(positions.smallerArchTo.y).toBe(-49.24);
        });
        it('having a radius of 50 an ending radius of 290 and offset by 10 degress and span for 45 degres ',function(){
            var centeredAt= {x:0,y:0}
            var startingRadius = 50;
            var endingRadius = 290;

            var positions= innerSegmentGenerator.computePositions(centeredAt,startingRadius,endingRadius,10, 45);
            expect(positions.startAt.x).toBe(8.68);
            expect(positions.startAt.y).toBe(-49.24);

            expect(positions.lineTo.x).toBe(50.344);
            expect(positions.lineTo.y).toBe(-285.592);

            expect(positions.largeArchTo.x).toBe(237.539);
            expect(positions.largeArchTo.y).toBe(-166.344);

            expect(positions.secondLineTo.x).toBe(40.955);
            expect(positions.secondLineTo.y).toBe(-28.68);

            expect(positions.smallerArchTo.x).toBe(8.68);
            expect(positions.smallerArchTo.y).toBe(-49.24);
        });
        it('should also return the starting and ending radius',function(){
            var centeredAt= {x:0,y:0}
            var startingRadius = 50;
            var endingRadius = 290;

            var positions= innerSegmentGenerator.computePositions(centeredAt,startingRadius,endingRadius,10, 45);
            expect(positions.startingRadius).toBe(50);
            expect(positions.endingRadius).toBe(290);
        });

    });
    describe('Should create correct svg path',function(){
        it('with a stubed out segment',function(){
            var positions = {
                'startAt':{x:10,y:10},
                'lineTo':{x: 100, y:200},
                'secondLineTo':{x:300, y:200},
                'largeArchTo':{x:150, y:300},
                'smallerArchTo':{x:100, y:30},
                'endingRadius':290,
                'startingRadius':30
            }

            var expectedSvgPath = 'M 10 10 L 100 200 A 290 290 0 0 1 150 300 L 300 200 A 30 30 0 0 0 100 30 Z';
            var generatedSvgPath = innerSegmentGenerator.generatePath(positions); 
            expect(generatedSvgPath).toBe(expectedSvgPath);
        });
    });
});
