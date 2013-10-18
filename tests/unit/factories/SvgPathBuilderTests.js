describe('SvgPathBuilder',function(){
    var svgPathBuilder={};
    beforeEach(module('TechRadarApp'));

    describe('should create individual path items not closed',function(){
        beforeEach(inject(function(SvgPathBuilder){
            svgPathBuilder = new SvgPathBuilder()
                             .WithClosePath(false);
        }));

        it('for a single line',function(){
            var expectedResult = 'L 100 100';
            var result = svgPathBuilder
                .LineTo(100, 100)
                .Build();
            expect(result).toBe(expectedResult);
        });
        it('for a move command',function(){
            var expectedResult = 'M 150 200';
            var result = svgPathBuilder
                .MoveTo(150, 200)
                .Build();
            expect(result).toBe(expectedResult);
        });
        it('for an arch',function(){
            var expectedResult = 'A 30 30 0 0 0 200 200';
            var result = svgPathBuilder
                .Arch(30, false, 200, 200, false)
                .Build();
            expect(result).toBe(expectedResult);
        });
    });

    describe('Should be able to issue a chain of commands without closing',function(){
        beforeEach(inject(function(SvgPathBuilder){
            svgPathBuilder = new SvgPathBuilder()
                             .WithClosePath(false);
        }));

        it('to create a two sided shape',function(){
            var expectedResult = 'L 100 100 L 300 300';
            var result = svgPathBuilder
                         .LineTo(100, 100)
                         .LineTo(300, 300)
                         .Build();
            expect(result).toBe(expectedResult);
        });
        it('to create a three sided shape',function(){
            var expectedResult = 'L 100 100 L 300 300 L 500 500';
            var result = svgPathBuilder
                         .LineTo(100, 100)
                         .LineTo(300, 300)
                         .LineTo(500, 500)
                         .Build();
            expect(result).toBe(expectedResult);
        });
        it('to create a two sided shape with an inital moveto',function(){
            var expectedResult = 'M 20 20 L 100 100 L 300 300';
            var result = svgPathBuilder
                         .MoveTo(20, 20)
                         .LineTo(100, 100)
                         .LineTo(300, 300)
                         .Build();
            expect(result).toBe(expectedResult);
        });
        it('a one sided shape with a moveto command and an arch',function(){
            var expectedResult = 'M 20 20 L 300 300 A 30 30 0 0 0 200 200';
            var result = svgPathBuilder
                         .MoveTo(20, 20)
                         .LineTo(300, 300)
                         .Arch(30, false, 200, 200, false)
                         .Build();
            expect(result).toBe(expectedResult);
        });

    })
    describe('by default ',function(){
        beforeEach(inject(function(SvgPathBuilder){
            svgPathBuilder = new SvgPathBuilder()
        }));
        it('should always close the path',function(){
            var expectedResult = ' Z';
            var result = svgPathBuilder.Build();
            expect(result,expectedResult);
        });
    });
})
