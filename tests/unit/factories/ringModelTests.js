describe('Ring model',function(){
    describe('should be able to ',function(){
        var ringModel = {};
        beforeEach(module('TechRadarApp'));
        beforeEach(inject(function(RingModel){
            ringModel = new RingModel('test',40,{x:200,y:200});
        }));
        it('add two blips to the model',function(){
            ringModel.addBlip({x:1,y:1});
            ringModel.addBlip({x:2,y:2});

            expect(ringModel.blips.length).toBe(2);
        });

        it('calculate blip postion after adding a blip to the model',function(){
            ringModel.addBlip({x:1,y:1});
            var firstBlipPosition = ringModel.blips[0]
            expect(firstBlipPosition.x).toBe(230.642);
            expect(firstBlipPosition.y).toBe(174.288);
        });

        it('remove blips',function(){
            ringModel.addBlip({x:1, y:1});
            ringModel.addBlip({x:1, y:1});
            ringModel.removeBlip();

            expect(ringModel.blips.length).toBe(1);
        });
        it('should recalculate blip postions after removeing them',function(){
            ringModel.addBlip({x:1, y:1});
            ringModel.addBlip({x:1, y:1});
            ringModel.removeBlip();

            var firstBlipPosition = ringModel.blips[0]
            expect(firstBlipPosition.x).toBe(230.642);
            expect(firstBlipPosition.y).toBe(174.288);
        });
    });
});
