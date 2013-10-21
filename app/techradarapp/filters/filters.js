var app = angular.module('TechRadarApp');

app.filter('categoryFilter',['_',function(_){
    return function(blips, filterModel)
    {
       if(filterModel.allCategoriesSelected == true)
       {
           return blips;
       }
       var selectedCategories = getSelectedCategoryNames(filterModel.categories);
        return _.filter(blips,function(blip){
            var blipCategories =getBlipCategoryNames(blip.category);
            var foundCategories = _.find(selectedCategories,function(selectedCategory){
                var foundCategory = _.find(blipCategories, function(blipCategory){return blipCategory == selectedCategory});
                var uncatogrisedSelected = selectedCategory == 'Uncategorised' && (blip.category == '' || blip.category == undefined);
                return foundCategory || uncatogrisedSelected;
            });
            return foundCategories;
        });
    }
    function getSelectedCategoryNames(categories)
    {
        return _.chain(categories)
         .filter(function(category){return category.isSelected == true})
         .pluck('name')
         .value();
    }
    function getBlipCategoryNames(categoryString)
    {
        if(categoryString == undefined)
            return [''];
        return _.map(categoryString.split(','),function(value){return value.trim()});
    }
}]);
