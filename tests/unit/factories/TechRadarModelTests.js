describe('Tech Radar Model',function(){
    var techRadarModel ={};
    beforeEach(module('TechRadarApp'));
    beforeEach(inject(function(TechRadarModel){
        techRadarModel = new TechRadarModel(200,200);
    }));
    describe('should be able to interact with a ring',function(){
        it('by adding a ring',function(){
           techRadarModel.addRing({someprop:'that we dont care about'}); 
           techRadarModel.addRing({someprop:'that we dont care about'}); 

           expect(techRadarModel.rings.length).toBe(2);
        });
        it('by removing a ring',function(){
           techRadarModel.addRing({someprop:'that we dont care about'}); 
           techRadarModel.addRing({someprop:'that we dont care about'}); 
           techRadarModel.removeRing();

           expect(techRadarModel.rings.length).toBe(1);
        });
    })
})
