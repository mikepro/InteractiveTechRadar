describe('Initial data',function(){
    var stubedRingModel = {};
    var stubedTechRadarModel = {addRing:jasmine.createSpy()};
    beforeEach(function(){
        module('TechRadarApp');
        module(function($provide){
            $provide.factory('RingModel',function(){
                return function(title, startingRadius, radius, center)
                {
                    var self = this;
                    self.title =title;
                    self.radius =radius;
                    self.startingRadius = startingRadius;
                    self.addBlip = jasmine.createSpy();
                    stubedRingModel = this;
                }
            });
        });
    });
    var initialDataService ={};
    var httpBackend ={};
    var scope ={};

    beforeEach(inject(function(InitialData,$httpBackend,$rootScope){
        initialDataService = InitialData;
        httpBackend = $httpBackend;
        scope = $rootScope;
    }));
    afterEach(function(){
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });
    it('Should make a http request call to sampleData.js when data is requested',function(){
        httpBackend.expectGET('./sampleData.js').respond(201,'some data');
            initialDataService.load({},{x:0,y:0});
        httpBackend.flush();
    });
    it('Should add two rings based on sample data',function(){
        var sampleData = {rings:[
            {"title":"Adopt"},
            {"title":"Trial"}
            ]};
        httpBackend.expectGET('./sampleData.js').respond(201,sampleData);;
        initialDataService.load(stubedTechRadarModel, {x:0,y:0});
        httpBackend.flush();
        expect(stubedTechRadarModel.addRing.calls.length).toBe(2);

        var firstRingAdded = stubedTechRadarModel.addRing.calls[0].args[0];
        expect(firstRingAdded.title).toBe("Adopt");
        expect(firstRingAdded.startingRadius).toBe(0);
        expect(firstRingAdded.radius).toBe(80);

        var secondRingAdded = stubedTechRadarModel.addRing.calls[1].args[0];
        expect(secondRingAdded.title).toBe("Trial");
        expect(secondRingAdded.startingRadius).toBe(80);
        expect(secondRingAdded.radius).toBe(160);
    });
    it('Should add supplied blips based on sample data',function(){
        var stubRingModel = {addBlip: jasmine.createSpy()};
        var sampleData ={rings:[
            {"title":"adopt", "blips":[
                {"id":"1", "isNew": true, "group": 0, "name": "AngularJS"},
                {"id":"2", "isNew": true, "group": 0, "name": "Knockout"}
            ]}]}; 
        httpBackend.expectGET('./sampleData.js').respond(201,sampleData);;
        initialDataService.load(stubedTechRadarModel, {x:0,y:0});
        httpBackend.flush();
        expect(stubedRingModel.addBlip.calls.length).toBe(2);

        var firstBlip = stubedRingModel.addBlip.calls[0].args[0];
        var secondBlip = stubedRingModel.addBlip.calls[1].args[0];
        expect(firstBlip.name).toBe("AngularJS");
        expect(firstBlip.id).toBe("1");
        expect(firstBlip.isNew).toBe(true);
        expect(firstBlip.group).toBe(0);
        expect(secondBlip.name).toBe("Knockout");
    });
});
