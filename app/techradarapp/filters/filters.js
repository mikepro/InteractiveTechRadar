var app = angular.module('TechRadarApp');

app.filter('productFilter',['_',function(_){
    return function(blips, filterModel)
    {
       if(filterModel.allProductsSelected == true)
       {
           return blips;
       }
       var selectedProducts = getSelectedProductNames(filterModel.products);
        return _.filter(blips,function(blip){
            var blipProducts = getBlipProductNames(blip.product);
            var foundProducts = _.find(selectedProducts,function(selectedProduct){
                var foundProduct = _.find(blipProducts, function(blipProject){return blipProject == selectedProduct});
                var uncatogrisedSelected = selectedProduct == 'Uncategorised' && (blip.product == '' || blip.product == undefined);
                if(foundProduct || uncatogrisedSelected)
                {
                    return true;
                }
            });
            return foundProducts;
        });
    }
    function getSelectedProductNames(products)
    {
        return _.chain(products)
         .filter(function(product){return product.isSelected == true})
         .pluck('name')
         .value();
    }
    function getBlipProductNames(productString)
    {
        if(productString == undefined)
            return [''];
        return _.map(productString.split(','),function(value){return value.trim()});
    }
}]);
