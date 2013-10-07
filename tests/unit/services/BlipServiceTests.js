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
            fakeBlips.push({x:0,y:0,group:0});
        }
        return fakeBlips;
    }

    describe('should be able to correctly calculate blip positions',function(){
        function calculateBlipPositions(blips)
        {
            blipFunc.calculateBlipPositions(blips, {x:200, y:200},0,40);
        }
        it('when there is a only 1 blip on a ring with a radius of 40', function(){
            var blips =CreateBlips(1);
            calculateBlipPositions(blips);
            var firstBlipPosition = blips[0]; 
            expect(firstBlipPosition.x).toBe(231.623);
            expect(firstBlipPosition.y).toBe(175.505);
        });

        it('when there is a only 2 blip on a ring with a radius of 40', function(){
            var blips = CreateBlips(2);
            calculateBlipPositions(blips);

            var firstBlipPosition = blips[0]; 
            expect(firstBlipPosition.x).toBe(231.623);
            expect(firstBlipPosition.y).toBe(175.505);

            var secondBlipPosition = blips[1];
            expect(secondBlipPosition.x).toBe(210);
            expect(secondBlipPosition.y).toBe(161.27);
        });

        it('when there is a only 3 blip on a ring with a radius of 40', function(){
            var blips =CreateBlips(3);
            calculateBlipPositions(blips);

            var firstBlipPosition = blips[0]; 
            expect(firstBlipPosition.x).toBe(236.201);
            expect(firstBlipPosition.y).toBe(182.985);

            var secondBlipPosition = blips[1];
            expect(secondBlipPosition.x).toBe(225.525);
            expect(secondBlipPosition.y).toBe(169.202);

            var thirdPosition = blips[2];
            expect(thirdPosition.x).toBe(210);
            expect(thirdPosition.y).toBe(161.27);
        });

        it('when there are 4 blips on a ring with a radius of 40', function(){
            var blips =CreateBlips(4);
            calculateBlipPositions(blips);

            var firstBlipPosition = blips[0]; 
            expect(firstBlipPosition.x).toBe(237.848);
            expect(firstBlipPosition.y).toBe(187.056);

            var secondBlipPosition = blips[1];
            expect(secondBlipPosition.x).toBe(231.623);
            expect(secondBlipPosition.y).toBe(175.505);

            var thirdPosition = blips[2];
            expect(thirdPosition.x).toBe(221.995);
            expect(thirdPosition.y).toBe(166.59);

            var fourthPosition = blips[3];
            expect(fourthPosition.x).toBe(210);
            expect(fourthPosition.y).toBe(161.27);
        });

        it('when there are 5 blips on a ring with a radius of 40', function(){
            var blips =CreateBlips(5);
            calculateBlipPositions(blips);

            var firstBlipPosition = blips[0]; 
            expect(firstBlipPosition.x).toBe(238.618);
            expect(firstBlipPosition.y).toBe(189.577);

            var secondBlipPosition = blips[1];
            expect(secondBlipPosition.x).toBe(234.568);
            expect(secondBlipPosition.y).toBe(179.874);

            var thirdPosition = blips[2];
            expect(thirdPosition.x).toBe(228.129);
            expect(thirdPosition.y).toBe(171.561);

            var fourthPosition = blips[3];
            expect(fourthPosition.x).toBe(219.747);
            expect(fourthPosition.y).toBe(165.214);

            var fifthPosition = blips[4];
            expect(fifthPosition.x).toBe(210);
            expect(fifthPosition.y).toBe(161.27);
        });

        it('when there are 6 blips on a ring with a radius of 40 the first 5 blips should have the same positions as if there were only 5 blips', function(){
            var blips =CreateBlips(6);
            calculateBlipPositions(blips);

            var firstBlipPosition = blips[0]; 
            expect(firstBlipPosition.x).toBe(238.618);
            expect(firstBlipPosition.y).toBe(189.577);

            var secondBlipPosition = blips[1];
            expect(secondBlipPosition.x).toBe(234.568);
            expect(secondBlipPosition.y).toBe(179.874);

            var thirdPosition = blips[2];
            expect(thirdPosition.x).toBe(228.129);
            expect(thirdPosition.y).toBe(171.561);

            var fourthPosition = blips[3];
            expect(fourthPosition.x).toBe(219.747);
            expect(fourthPosition.y).toBe(165.214);

            var fifthPosition = blips[4];
            expect(fifthPosition.x).toBe(210);
            expect(fifthPosition.y).toBe(161.27);

            var sixthPostion = blips[5];
            expect(sixthPostion.x).toBe(238.73);
            expect(sixthPostion.y).toBe(168.377);
        });

        it('when there are 7 blips on a ring with a radius of 40 blips 6 and 7 should be set accordingly',function(){
            var blips =CreateBlips(7);
            calculateBlipPositions(blips);

            var sixthPostion = blips[5];
            expect(sixthPostion.x).toBe(238.73);
            expect(sixthPostion.y).toBe(168.377);

            var seventhPositon= blips[6];
            expect(seventhPositon.x).toBe(210);
            expect(seventhPositon.y).toBe(151.01);
        });

        it('when there are 8 blips on a ring with a radius of 40 blips 6, 7,8 should be set accordingly',function(){
            var blips =CreateBlips(8);
            calculateBlipPositions(blips);

            var sixthPostion = blips[5];
            expect(sixthPostion.x).toBe(244.88);
            expect(sixthPostion.y).toBe(177.96);

            var seventhPositon= blips[6];
            expect(seventhPositon.x).toBe(230.57);
            expect(seventhPositon.y).toBe(160.434);

            var eightPosition= blips[7];
            expect(seventhPositon.x).toBe(230.57);
            expect(seventhPositon.y).toBe(160.434);
        });

        it('when there are 9 blips on a ring with a radius of 40 blips 6, 7,8 and 9 should be set accordingly',function(){
            var blips =CreateBlips(9);
            calculateBlipPositions(blips);

            var sixthPostion = blips[5];
            expect(sixthPostion.x).toBe(247.098);
            expect(sixthPostion.y).toBe(183.214);

            var seventhPositon= blips[6];
            expect(seventhPositon.x).toBe(238.73);
            expect(seventhPositon.y).toBe(168.377);

            var eightPosition= blips[7];
            expect(seventhPositon.x).toBe(238.73);
            expect(seventhPositon.y).toBe(168.377);

            var nithPosition= blips[8];
            expect(nithPosition.x).toBe(210);
            expect(seventhPositon.y).toBe(168.377);
        });

        it('when there are 10 blips on a ring with a radius of 40 blips 6, 7,8 9 and 10 should be set accordingly',function(){
            var blips =CreateBlips(10);
            calculateBlipPositions(blips);

            var sixthPostion = blips[5];
            expect(sixthPostion.x).toBe(248.136);
            expect(sixthPostion.y).toBe(186.476);

            var seventhPositon= blips[6];
            expect(seventhPositon.x).toBe(242.684);
            expect(seventhPositon.y).toBe(173.961);

            var eightPosition= blips[7];
            expect(seventhPositon.x).toBe(242.684);
            expect(seventhPositon.y).toBe(173.961);

            var nithPosition= blips[8];
            expect(nithPosition.x).toBe(222.878);
            expect(seventhPositon.y).toBe(173.961);

            var tenthPostion= blips[9];
            expect(tenthPostion.x).toBe(210);
            expect(tenthPostion.y).toBe(151.01);
        });

        it('when there are 11 blips on a ring with a radius of 40 blips 6, 7,8 9, 10 and 11 should be set accordingly',function(){
            var blips =CreateBlips(11);
            calculateBlipPositions(blips);

            var sixthPostion = blips[5];
            expect(sixthPostion.x).toBe(248.703);
            expect(sixthPostion.y).toBe(188.687);

            var seventhPositon= blips[6];
            expect(seventhPositon.x).toBe(244.88);
            expect(seventhPositon.y).toBe(177.96);

            var eightPosition= blips[7];
            expect(seventhPositon.x).toBe(244.88);
            expect(seventhPositon.y).toBe(177.96);

            var nithPosition= blips[8];
            expect(nithPosition.x).toBe(230.57);
            expect(seventhPositon.y).toBe(177.96);

            var tenthPostion= blips[9];
            expect(tenthPostion.x).toBe(220.825);
            expect(tenthPostion.y).toBe(154.543);

            var eleventhPostion = blips[10];
            expect(eleventhPostion.x).toBe(210);
            expect(eleventhPostion.y).toBe(151.01);
        });

        it('when there are 12 blips on a ring with a radius of 40 blips 6, 7,8 9, 10 and 11 should not change',function(){
            var blips =CreateBlips(12);
            calculateBlipPositions(blips);

            var sixthPostion = blips[5];
            expect(sixthPostion.x).toBe(248.703);
            expect(sixthPostion.y).toBe(188.687);

            var seventhPositon= blips[6];
            expect(seventhPositon.x).toBe(244.88);
            expect(seventhPositon.y).toBe(177.96);

            var eightPosition= blips[7];
            expect(seventhPositon.x).toBe(244.88);
            expect(seventhPositon.y).toBe(177.96);

            var nithPosition= blips[8];
            expect(nithPosition.x).toBe(230.57);
            expect(seventhPositon.y).toBe(177.96);

            var tenthPostion= blips[9];
            expect(tenthPostion.x).toBe(220.825);
            expect(tenthPostion.y).toBe(154.543);

            var eleventhPostion = blips[10];
            expect(eleventhPostion.x).toBe(210);
            expect(eleventhPostion.y).toBe(151.01);
        });

        it('when there are 13 blips on a ring with a radius of 40', function(){
            var blips =CreateBlips(12);
            calculateBlipPositions(blips);

            var twelvePostion = blips[11];
            expect(twelvePostion.x).toBe(245.826);
            expect(twelvePostion.y).toBe(161.27);
        })
    });
});

