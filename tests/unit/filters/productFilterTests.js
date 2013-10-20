describe('Product filter',function(){
    beforeEach(module('TechRadarApp'));
    var productFilter =undefined;
    beforeEach(inject(function($filter){
        productFilter = $filter('productFilter');
    }));
    describe('having blips that contain at most one product',function(){
        var sampleBlips =[{name:'blip1',product:'product1'},{name:'blip2',product:'product2'},{name:'blip3',product:'product3'},{name:'blip4'}]; 
        it('Should list all products if all products are selected on the filter',function($filter){
            var filterCriteria = {allProductsSelected: true};
            var filteredResults = productFilter(sampleBlips, filterCriteria);
            expect(filteredResults.length).toBe(4);
        });
        it('Should bring back only product 1 blips when filtered by product 1',function(){
            var filterCriteria = {allProductsSelected: false, products:[{name:'product1',isSelected:true}]};
            var filterResults = productFilter(sampleBlips,filterCriteria);
            expect(filterResults.length).toBe(1);
            expect(filterResults[0].name).toBe('blip1');
        });
        it('Should be able to select multiple products to filter by',function(){
            var filterCriteria = {allProductsSelected: false, products:[{name:'product1',isSelected:true},{name:'product2',isSelected:true}]};
            var filterResults = productFilter(sampleBlips, filterCriteria);
            expect(filterResults.length).toBe(2);
            expect(filterResults[0].name).toBe('blip1');
            expect(filterResults[1].name).toBe('blip2');
        });
        it('Should be able to bring uncatogrised blips',function(){
            var filterCriteria = {allProductsSelected: false, products:[{name:'Uncategorised',isSelected:true}]};
            var filterResults = productFilter(sampleBlips, filterCriteria);
            expect(filterResults.length).toBe(1);
            expect(filterResults[0].name).toBe('blip4');
        });
        it('Should be able to list all blips if all filters are selected',function(){
            var filterCriteria = {allProductsSelected: false, products:[{name:'Uncategorised',isSelected:true},
                                                                        {name:'product1',isSelected:true},
                                                                        {name:'product2',isSelected:true},
                                                                        {name:'product3',isSelected:true}
                                                                        ]};
            var filterResults = productFilter(sampleBlips, filterCriteria);
            expect(filterResults.length).toBe(4);
        });
        it('should bring back all blips if all blips is selected in filter criteria regards of individual product filter settings',function(){
            var filterCriteria = {allProductsSelected: true, products:[{name:'Uncategorised',isSelected:false},
                                                                        {name:'product1',isSelected:false},
                                                                        {name:'product2',isSelected:false},
                                                                        {name:'product3',isSelected:false}
                                                                        ]};
            var filterResults = productFilter(sampleBlips, filterCriteria);
            expect(filterResults.length).toBe(4);
        });
    });
    describe('having blips with more than one product',function(){
        var sampleBlip = [{name:'blip1',product:'product1,product2,product3'}]
        it('should be able to get blip back with a filter of product 1',function(){
            var filterCriteria = {allProductsSelected:false, products:[{name:'product1',isSelected:true}]};
            var result = productFilter(sampleBlip, filterCriteria);
            expect(result.length).toBe(1);
        });    
        it('should be able to get blip back with a filter of product 2',function(){
            var filterCriteria = {allProductsSelected:false, products:[{name:'product2',isSelected:true}]};
            var result = productFilter(sampleBlip, filterCriteria);
            expect(result.length).toBe(1);
        });    
        it('should be able to get blip back with a filter of product 3',function(){
            var filterCriteria = {allProductsSelected:false, products:[{name:'product3',isSelected:true}]};
            var result = productFilter(sampleBlip, filterCriteria);
            expect(result.length).toBe(1);
        });    
    });
    describe('having blips with products that have spaces',function(){
        var blipUnderTest = [{name:'blip1', product:'product1   ,   product2'}]
        it('should be able to get by product 1',function(){
            var filterCriteria = {allProductsSelected:false, products:[{name:'product1',isSelected:true}]};
            var result = productFilter(blipUnderTest, filterCriteria);
            expect(result.length).toBe(1);
        });
        it('should be able to get by product 2',function(){
            var blipUnderTest = [{name:'blip1', product:'product1   ,   product2'}]
            var filterCriteria = {allProductsSelected:false, products:[{name:'product2',isSelected:true}]};
            var result = productFilter(blipUnderTest, filterCriteria);
            expect(result.length).toBe(1);
        });
    
    });
});
