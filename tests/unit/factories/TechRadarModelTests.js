describe('Tech Radar Model',function(){
    var techRadarModel ={};
    var ringModel={};
    var blipModel={};
    beforeEach(module('TechRadarApp'));
    beforeEach(inject(function(TechRadarModel, RingModel,BlipModel){
        techRadarModel = new TechRadarModel(200,200);
        ringModel = RingModel;
        blipModel = BlipModel;
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
    });

    function RingModelBuilder()
    {
        var self = this;
        self.blips =[];
        self.name = 'ring';
        self.startingRadius =0;
        self.radius =10;
        self.center = {x:0,y:0};
        self.techModel= techRadarModel;
        self.forTechRadarModel = function(techRadarModel)
        {
            self.techModel = techRadarModel;
            return self;
        }
        self.addBlip = function(blip)
        {
            self.blips.push(blip);
            return this;
        }
        self.build = function()
        {
            var newRing = new ringModel(self.name,self.startingRadius,self.radius,self.center);
            self.techModel.addRing(newRing);
            for(var i =0; i< self.blips.length;i++)
            {
                newRing.addBlip(self.blips[i]);
            }
            return newRing;
        }
    }
    
    describe('with groups',function(){
        it('should be able to retrive all group 0 regardles of ring',function(){
            var ring1 = new RingModelBuilder()
                            .addBlip(new blipModel('some id','some name',false,0))
                            .addBlip(new blipModel('some id','some name',false,1))
                            .addBlip(new blipModel('some id','some name',false,2))
                            .build();
            var ring2 = new RingModelBuilder()
                            .addBlip(new blipModel('some id','some name',false,0))
                            .addBlip(new blipModel('some id','some name',false,3))
                            .build();

            var allBlipsForGroup0 = techRadarModel.allBlipsForGroup(0);

            expect(allBlipsForGroup0.length).toBe(2);
        });
        it('should be able to retrive all group 1 regardles of ring',function(){
            var ring1 = new RingModelBuilder()
                            .addBlip(new blipModel('some id','some name',false,0))
                            .addBlip(new blipModel('some id','some name',false,1))
                            .addBlip(new blipModel('some id','some name',false,2))
                            .build();
            var ring2 = new RingModelBuilder()
                            .addBlip(new blipModel('some id','some name',false,1))
                            .addBlip(new blipModel('some id','some name',false,1))
                            .build();

            var allBlipsForGroup1 = techRadarModel.allBlipsForGroup(1);

            expect(allBlipsForGroup1.length).toBe(3);
        });
        it('should be able to retrive all group 3 regardles of ring',function(){
            var ring1 = new RingModelBuilder()
                            .addBlip(new blipModel('some id','some name',false,3))
                            .addBlip(new blipModel('some id','some name',false,1))
                            .addBlip(new blipModel('some id','some name',false,2))
                            .build();
            var ring2 = new RingModelBuilder()
                            .addBlip(new blipModel('some id','some name',false,1))
                            .addBlip(new blipModel('some id','some name',false,1))
                            .build();

            var ring3 = new RingModelBuilder()
                            .addBlip(new blipModel('some id','some name',false,3))
                            .addBlip(new blipModel('some id','some name',false,1))
                            .build();
            var ring4 = new RingModelBuilder()
                            .addBlip(new blipModel('some id','some name',false,3))
                            .addBlip(new blipModel('some id','some name',false,3))
                            .build();
            var allBlipsForGroup3 = techRadarModel.allBlipsForGroup(3);
            
            expect(allBlipsForGroup3.length).toBe(4);
        });
        it('should return blip object',function(){
            var blip=new blipModel('some id','some name',false,3);
            var ring1 = new RingModelBuilder()
                            .addBlip(blip)
                            .build();
            var allBlipsForGroup3 = techRadarModel.allBlipsForGroup(3);
            expect(allBlipsForGroup3[0]).toBe(blip);
        });
    });
});
