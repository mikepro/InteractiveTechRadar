describe('Blip functions',function(){
    var blipFunc={};
    var distancePerBlip = 12.566;
    beforeEach(module('TechRadarApp'));
    beforeEach(inject(function(BlipFunctions){
         blipFunc = BlipFunctions;
    }));

    describe('should be able to calculate max number of blips for a ring',function(){
        it('when the ring has a radius of 40',function(){
            var maxNumberOfBlips = blipFunc.calculateMaxNumberOfBlipsForRing(40,distancePerBlip,4);
            expect(maxNumberOfBlips).toBe(5);
        });    
        it('when the ring has a radius of 50',function(){
            var maxNumberOfBlips = blipFunc.calculateMaxNumberOfBlipsForRing(50,distancePerBlip,4);
            expect(maxNumberOfBlips).toBe(6);
        });    
        it('when the ring has a radius of 60',function(){
            var maxNumberOfBlips = blipFunc.calculateMaxNumberOfBlipsForRing(60,distancePerBlip,4);
            expect(maxNumberOfBlips).toBe(7);
        });    
        it('when the ring has a radius of 40 and only 3 groups',function(){
            var maxNumberOfBlips = blipFunc.calculateMaxNumberOfBlipsForRing(40,distancePerBlip,3);
            expect(maxNumberOfBlips).toBe(6);
        });    
        it('when the ring has a radius of 40 and only 5 groups',function(){
            var maxNumberOfBlips = blipFunc.calculateMaxNumberOfBlipsForRing(40,distancePerBlip,5);
            expect(maxNumberOfBlips).toBe(4);
        });    
    });

    describe('should be able to determine the number of blips on a given ring',function(){
        it('when on the first ring of a radius of 40, with just two items in total',function(){
            var numberOfBlips = blipFunc.calculateNumberOfBlipsForRing(40,10,1,distancePerBlip,2)
            expect(numberOfBlips).toBe(2);
        }); 

        it('when on the first ring of a radius of 40, with just three items in total',function(){
            var numberOfBlips = blipFunc.calculateNumberOfBlipsForRing(40,10,1,distancePerBlip,3)
            expect(numberOfBlips).toBe(3);
        }); 

        it('when on the first ring of a radius of 40, with five items in total',function(){
            var numberOfBlips = blipFunc.calculateNumberOfBlipsForRing(40,10,1,distancePerBlip,5)
            expect(numberOfBlips).toBe(5);
        }); 

        it('when on the first ring of a radius of 40, with six items in total',function(){
            var numberOfBlips = blipFunc.calculateNumberOfBlipsForRing(40,10,1,distancePerBlip,5)
            expect(numberOfBlips).toBe(5);
        }); 

        it('when on the second ring of a radius with first ring having a radius of 40, with 11 items in total',function(){
            var numberOfBlips = blipFunc.calculateNumberOfBlipsForRing(40,10,2,distancePerBlip,11)
            expect(numberOfBlips).toBe(6);
        }); 

        it('when on the third ring with the first ring having a radius of 40, with 12 items in total',function(){
            var numberOfBlips = blipFunc.calculateNumberOfBlipsForRing(40,10,3,distancePerBlip,12)
            expect(numberOfBlips).toBe(1);
        }); 
    });

    function CreateBlips(numOfBlips)
    {
        var fakeBlips = [];
        for(var i=0; i<numOfBlips; i++)
        {
            fakeBlips.push({x:0,y:0});
        }
        return fakeBlips;
    }

    describe('should be able to correctly calculate blip positions',function(){
        it('when there is a only 1 blip on a ring with a radius of 40', function(){
            var blips =CreateBlips(1);
            blipFunc.calculateBlipPositions(blips, {x:200, y:200});

            var firstBlipPosition = blips[0]; 
            expect(firstBlipPosition.x).toBe(230.642);
            expect(firstBlipPosition.y).toBe(174.288);
        });

        it('when there is a only 2 blip on a ring with a radius of 40', function(){
            var blips = CreateBlips(2);
            blipFunc.calculateBlipPositions(blips, {x:200, y:200});

            var firstBlipPosition = blips[0]; 
            expect(firstBlipPosition.x).toBe(230.642);
            expect(firstBlipPosition.y).toBe(174.288);

            var secondBlipPosition = blips[1];
            expect(secondBlipPosition.x).toBe(206.946);
            expect(secondBlipPosition.y).toBe(160.608);
        });

        it('when there is a only 3 blip on a ring with a radius of 40', function(){
            var blips =CreateBlips(3);
            blipFunc.calculateBlipPositions(blips, {x:200, y:200});

            var firstBlipPosition = blips[0]; 
            expect(firstBlipPosition.x).toBe(235.745);
            expect(firstBlipPosition.y).toBe(182.048);

            var secondBlipPosition = blips[1];
            expect(secondBlipPosition.x).toBe(223.886);
            expect(secondBlipPosition.y).toBe(167.915);

            var thirdPosition = blips[2];
            expect(thirdPosition.x).toBe(206.946);
            expect(thirdPosition.y).toBe(160.608);
        });

        it('when there are 4 blips on a ring with a radius of 40', function(){
            var blips =CreateBlips(4);
            blipFunc.calculateBlipPositions(blips, {x:200, y:200});

            var firstBlipPosition = blips[0]; 
            expect(firstBlipPosition.x).toBe(237.588);
            expect(firstBlipPosition.y).toBe(186.319);

            var secondBlipPosition = blips[1];
            expect(secondBlipPosition.x).toBe(230.642);
            expect(secondBlipPosition.y).toBe(174.288);

            var thirdPosition = blips[2];
            expect(thirdPosition.x).toBe(220);
            expect(thirdPosition.y).toBe(165.359);

            var fourthPosition = blips[3];
            expect(fourthPosition.x).toBe(206.946);
            expect(fourthPosition.y).toBe(160.608);
        });

        it('when there are 5 blips on a ring with a radius of 40', function(){
            var blips =CreateBlips(5);
            blipFunc.calculateBlipPositions(blips, {x:200, y:200});

            var firstBlipPosition = blips[0]; 
            expect(firstBlipPosition.x).toBe(238.45);
            expect(firstBlipPosition.y).toBe(188.975);

            var secondBlipPosition = blips[1];
            expect(secondBlipPosition.x).toBe(233.922);
            expect(secondBlipPosition.y).toBe(178.803);

            var thirdPosition = blips[2];
            expect(thirdPosition.x).toBe(226.765);
            expect(thirdPosition.y).toBe(170.274);

            var fourthPosition = blips[3];
            expect(fourthPosition.x).toBe(217.535);
            expect(fourthPosition.y).toBe(164.048);

            var fifthPosition = blips[4];
            expect(fifthPosition.x).toBe(206.946);
            expect(fifthPosition.y).toBe(160.608);
        });

        it('when there are 6 blips on a ring with a radius of 40 the first 5 blips should have the same positions as if there were only 5 blips', function(){
            var blips =CreateBlips(6);
            blipFunc.calculateBlipPositions(blips, {x:200, y:200});

            var firstBlipPosition = blips[0]; 
            expect(firstBlipPosition.x).toBe(238.45);
            expect(firstBlipPosition.y).toBe(188.975);

            var secondBlipPosition = blips[1];
            expect(secondBlipPosition.x).toBe(233.922);
            expect(secondBlipPosition.y).toBe(178.803);

            var thirdPosition = blips[2];
            expect(thirdPosition.x).toBe(226.765);
            expect(thirdPosition.y).toBe(170.274);

            var fourthPosition = blips[3];
            expect(fourthPosition.x).toBe(217.535);
            expect(fourthPosition.y).toBe(164.048);

            var fifthPosition = blips[4];
            expect(fifthPosition.x).toBe(206.946);
            expect(fifthPosition.y).toBe(160.608);

            var sixthPostion = blips[5];
            expect(sixthPostion.x).toBe(238.302);
            expect(sixthPostion.y).toBe(167.861);
        });

        it('when there are 7 blips on a ring with a radius of 40 blips 6 and 7 should be set accordingly',function(){
            var blips =CreateBlips(7);
            blipFunc.calculateBlipPositions(blips, {x:200, y:200});

            var sixthPostion = blips[5];
            expect(sixthPostion.x).toBe(238.302);
            expect(sixthPostion.y).toBe(167.861);

            var seventhPositon= blips[6];
            expect(seventhPositon.x).toBe(208.682);
            expect(seventhPositon.y).toBe(150.76);
        });

        it('when there are 8 blips on a ring with a radius of 40 blips 6, 7,8 should be set accordingly',function(){
            var blips =CreateBlips(8);
            blipFunc.calculateBlipPositions(blips, {x:200, y:200});

            var sixthPostion = blips[5];
            expect(sixthPostion.x).toBe(244.682);
            expect(sixthPostion.y).toBe(177.56);

            var seventhPositon= blips[6];
            expect(seventhPositon.x).toBe(229.858);
            expect(seventhPositon.y).toBe(159.894);

            var eightPosition= blips[7];
            expect(seventhPositon.x).toBe(229.858);
            expect(seventhPositon.y).toBe(159.894);
        });

        it('when there are 9 blips on a ring with a radius of 40 blips 6, 7,8 and 9 should be set accordingly',function(){
            var blips =CreateBlips(9);
            blipFunc.calculateBlipPositions(blips, {x:200, y:200});

            var sixthPostion = blips[5];
            expect(sixthPostion.x).toBe(246.985);
            expect(sixthPostion.y).toBe(182.899);

            var seventhPositon= blips[6];
            expect(seventhPositon.x).toBe(238.302);
            expect(seventhPositon.y).toBe(167.861);

            var eightPosition= blips[7];
            expect(seventhPositon.x).toBe(238.302);
            expect(seventhPositon.y).toBe(167.861);

            var nithPosition= blips[8];
            expect(nithPosition.x).toBe(208.682);
            expect(seventhPositon.y).toBe(167.861);
        });

        it('when there are 10 blips on a ring with a radius of 40 blips 6, 7,8 9 and 10 should be set accordingly',function(){
            var blips =CreateBlips(10);
            blipFunc.calculateBlipPositions(blips, {x:200, y:200});

            var sixthPostion = blips[5];
            expect(sixthPostion.x).toBe(248.063);
            expect(sixthPostion.y).toBe(186.218);

            var seventhPositon= blips[6];
            expect(seventhPositon.x).toBe(242.402);
            expect(seventhPositon.y).toBe(173.504);

            var eightPosition= blips[7];
            expect(seventhPositon.x).toBe(242.402);
            expect(seventhPositon.y).toBe(173.504);

            var nithPosition= blips[8];
            expect(nithPosition.x).toBe(221.919);
            expect(seventhPositon.y).toBe(173.504);

            var tenthPostion= blips[9];
            expect(tenthPostion.x).toBe(208.682);
            expect(tenthPostion.y).toBe(150.76);
        });

        it('when there are 11 blips on a ring with a radius of 40 blips 6, 7,8 9, 10 and 11 should be set accordingly',function(){
            var blips =CreateBlips(11);
            blipFunc.calculateBlipPositions(blips, {x:200, y:200});

            var sixthPostion = blips[5];
            expect(sixthPostion.x).toBe(248.652);
            expect(sixthPostion.y).toBe(188.469);

            var seventhPositon= blips[6];
            expect(seventhPositon.x).toBe(244.682);
            expect(seventhPositon.y).toBe(177.56);

            var eightPosition= blips[7];
            expect(seventhPositon.x).toBe(244.682);
            expect(seventhPositon.y).toBe(177.56);

            var nithPosition= blips[8];
            expect(nithPosition.x).toBe(229.858);
            expect(seventhPositon.y).toBe(177.56);

            var tenthPostion= blips[9];
            expect(tenthPostion.x).toBe(219.804);
            expect(tenthPostion.y).toBe(154.089);

            var eleventhPostion = blips[10];
            expect(eleventhPostion.x).toBe(208.682);
            expect(eleventhPostion.y).toBe(150.76);
        });

        it('when there are 12 blips on a ring with a radius of 40 blips 6, 7,8 9, 10 and 11 should not change',function(){
            var blips =CreateBlips(12);
            blipFunc.calculateBlipPositions(blips, {x:200, y:200});

            var sixthPostion = blips[5];
            expect(sixthPostion.x).toBe(248.652);
            expect(sixthPostion.y).toBe(188.469);

            var seventhPositon= blips[6];
            expect(seventhPositon.x).toBe(244.682);
            expect(seventhPositon.y).toBe(177.56);

            var eightPosition= blips[7];
            expect(seventhPositon.x).toBe(244.682);
            expect(seventhPositon.y).toBe(177.56);

            var nithPosition= blips[8];
            expect(nithPosition.x).toBe(229.858);
            expect(seventhPositon.y).toBe(177.56);

            var tenthPostion= blips[9];
            expect(tenthPostion.x).toBe(219.804);
            expect(tenthPostion.y).toBe(154.089);

            var eleventhPostion = blips[10];
            expect(eleventhPostion.x).toBe(208.682);
            expect(eleventhPostion.y).toBe(150.76);
        });

        it('when there are 13 blips on a ring with a radius of 40', function(){
            var blips =CreateBlips(12);
            blipFunc.calculateBlipPositions(blips, {x:200, y:200});

            var twelvePostion = blips[11];
            expect(twelvePostion.x).toBe(245.963);
            expect(twelvePostion.y).toBe(161.433);
        })
    });
});

