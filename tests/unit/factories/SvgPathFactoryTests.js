describe('SvgPathFactory',function(){
    var svgPathFactory={};
    beforeEach(module('TechRadarApp'));

    describe('should call svg path builder',function(){
        var stubSvgPathBuilder= {};
        var stubInnerSegment ={};
        beforeEach(module(function($provide){
            stubBuilder =function(){
                var self = this;
                stubSvgPathBuilder= this;
                self.MoveTo = jasmine.createSpy().andReturn(self);
                self.LineTo = jasmine.createSpy().andReturn(self);
                self.Arch = jasmine.createSpy().andReturn(self);
                self.Build = jasmine.createSpy();
            }
            stubInnerSegementService = function()
            {
                var self = this;
                stubInnerSegment = this;
                self.computePositions = jasmine.createSpy().andReturn({startAt: {x:0, y:0},
                                                                      lineTo: {x:30, y:40},
                                                                      secondLineTo: {x:20, y:30},
                                                                      largeArchTo: {x:10, y:60},
                                                                      smallerArchTo: {x:15, y:50},
                                                                      startingRadius: 30,
                                                                      endingRadius: 90
                                                                      });
                return self;
            }
            $provide.factory('SvgPathBuilder',function(){ return stubBuilder;});
            $provide.factory('InnerSegmentGenerator',stubInnerSegementService);
        }));
        beforeEach(inject(function(SvgPathFactory){
            svgPathFactory =  SvgPathFactory;
        }));
        it('when creating a triangle',function(){
            svgPathFactory.CreateTriangle({x:4, y:4}, 4, 6);
            expect(stubSvgPathBuilder.LineTo.calls.length).toEqual(2);

            expect(stubSvgPathBuilder.MoveTo).toHaveBeenCalledWith(2,7);
            expect(stubSvgPathBuilder.LineTo).toHaveBeenCalledWith(4,1);
            expect(stubSvgPathBuilder.LineTo).toHaveBeenCalledWith(6,7);
            expect(stubSvgPathBuilder.Arch).not.toHaveBeenCalledWith(6,7);
            expect(stubSvgPathBuilder.Build).toHaveBeenCalled();
        });
        it('when creating a circle',function(){
            svgPathFactory.CreateCircle({x:4, y:4}, 4);
            expect(stubSvgPathBuilder.MoveTo).toHaveBeenCalledWith(4, 0);
            expect(stubSvgPathBuilder.Arch).toHaveBeenCalledWith(4, false, 4, 4, true);
            expect(stubSvgPathBuilder.Build).toHaveBeenCalled();

            expect(stubSvgPathBuilder.LineTo).not.toHaveBeenCalled();
        });
        it('when creating a segment should delegate calculating positions to inner segment',function(){
            svgPathFactory.CreateSegment({x:4, y:4}, 4, 10, 1, 90);
            expect(stubInnerSegment.computePositions).toHaveBeenCalledWith({x:4, y:4}, 4, 10, 1, 90);
        });
        it('when creating a segment should call the builder with the appropriate commands',function(){
            svgPathFactory.CreateSegment({x:4, y:4}, 4, 10, 1, 90);
            expect(stubSvgPathBuilder.MoveTo).toHaveBeenCalledWith(0, 0);
            expect(stubSvgPathBuilder.LineTo).toHaveBeenCalledWith(30, 40);
            expect(stubSvgPathBuilder.LineTo).toHaveBeenCalledWith(20, 30);
            expect(stubSvgPathBuilder.Arch).toHaveBeenCalledWith(90, true, 10, 60);
            expect(stubSvgPathBuilder.Arch).toHaveBeenCalledWith(30,false, 15, 50);
            expect(stubSvgPathBuilder.Build).toHaveBeenCalled();

            expect(stubSvgPathBuilder.MoveTo.calls.length).toEqual(1);
            expect(stubSvgPathBuilder.LineTo.calls.length).toEqual(2);
            expect(stubSvgPathBuilder.Arch.calls.length).toEqual(2);
        });
    });
});

