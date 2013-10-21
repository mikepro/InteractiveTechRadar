describe('Category filter',function(){
    beforeEach(module('TechRadarApp'));
    var categoryFilter =undefined;
    beforeEach(inject(function($filter){
        categoryFilter = $filter('categoryFilter');
    }));
    describe('having blips that contain at most one category',function(){
        var sampleBlips =[{name:'blip1',category:'category1'},{name:'blip2',category:'category2'},{name:'blip3',category:'category3'},{name:'blip4'}]; 
        it('Should list all blips if all categories are selected on the filter',function($filter){
            var filterCriteria = {allCategoriesSelected: true};
            var filteredResults = categoryFilter(sampleBlips, filterCriteria);
            expect(filteredResults.length).toBe(4);
        });
        it('Should bring back only category 1 blips when filtered by category 1',function(){
            var filterCriteria = {allCategoriesSelected: false, categories:[{name:'category1',isSelected:true}]};
            var filterResults = categoryFilter(sampleBlips,filterCriteria);
            expect(filterResults.length).toBe(1);
            expect(filterResults[0].name).toBe('blip1');
        });
        it('Should be able to select multiple categories to filter by',function(){
            var filterCriteria = {allCategoriesSelected: false, categories:[{name:'category1',isSelected:true},{name:'category2',isSelected:true}]};
            var filterResults = categoryFilter(sampleBlips, filterCriteria);
            expect(filterResults.length).toBe(2);
            expect(filterResults[0].name).toBe('blip1');
            expect(filterResults[1].name).toBe('blip2');
        });
        it('Should be able to bring uncatogrised blips',function(){
            var filterCriteria = {allCategoriesSelected: false, categories:[{name:'Uncategorised',isSelected:true}]};
            var filterResults = categoryFilter(sampleBlips, filterCriteria);
            expect(filterResults.length).toBe(1);
            expect(filterResults[0].name).toBe('blip4');
        });
        it('Should be able to list all blips if all filters are selected',function(){
            var filterCriteria = {allCategoriesSelected: false, categories:[{name:'Uncategorised',isSelected:true},
                                                                        {name:'category1',isSelected:true},
                                                                        {name:'category2',isSelected:true},
                                                                        {name:'category3',isSelected:true}
                                                                        ]};
            var filterResults = categoryFilter(sampleBlips, filterCriteria);
            expect(filterResults.length).toBe(4);
        });
        it('should bring back all blips if all blips is selected in filter criteria regards of individual category filter settings',function(){
            var filterCriteria = {allCategoriesSelected: true, categories:[{name:'Uncategorised',isSelected:false},
                                                                        {name:'category1',isSelected:false},
                                                                        {name:'category2',isSelected:false},
                                                                        {name:'category3',isSelected:false}
                                                                        ]};
            var filterResults = categoryFilter(sampleBlips, filterCriteria);
            expect(filterResults.length).toBe(4);
        });
    });
    describe('having blips with more than one category',function(){
        var sampleBlip = [{name:'blip1',category:'category1,category2,category3'}]
        it('should be able to get blip back with a filter of product 1',function(){
            var filterCriteria = {allCategoriesSelected:false, categories:[{name:'category1',isSelected:true}]};
            var result = categoryFilter(sampleBlip, filterCriteria);
            expect(result.length).toBe(1);
        });    
        it('should be able to get blip back with a filter of category 2',function(){
            var filterCriteria = {allCategoriesSelected:false, categories:[{name:'category2',isSelected:true}]};
            var result = categoryFilter(sampleBlip, filterCriteria);
            expect(result.length).toBe(1);
        });    
        it('should be able to get blip back with a filter of category 3',function(){
            var filterCriteria = {allCategoriesSelected:false, categories:[{name:'category3',isSelected:true}]};
            var result = categoryFilter(sampleBlip, filterCriteria);
            expect(result.length).toBe(1);
        });    
    });
    describe('having blips with categorys that have spaces',function(){
        var blipUnderTest = [{name:'blip1', category:'category1   ,   category2'}]
        it('should be able to get by category 1',function(){
            var filterCriteria = {allCategoriesSelected:false, categories:[{name:'category1',isSelected:true}]};
            var result = categoryFilter(blipUnderTest, filterCriteria);
            expect(result.length).toBe(1);
        });
        it('should be able to get by category 2',function(){
            var blipUnderTest = [{name:'blip1', category:'category1   ,   category2'}]
            var filterCriteria = {allCategoriesSelected:false, categories:[{name:'category2',isSelected:true}]};
            var result = categoryFilter(blipUnderTest, filterCriteria);
            expect(result.length).toBe(1);
        });
    
    });
});
