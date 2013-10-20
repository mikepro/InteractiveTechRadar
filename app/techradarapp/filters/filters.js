var app = angular.module('TechRadarApp');

app.filter('productFilter',function(){
    return function(blips, filterModel)
    {
       if(filterModel.allProductsSelected == true)
       {
           return blips;
       }
       var selectedProducts = getSelectedProducts(filterModel.products);

       var blipsThatMatchSelectedProducts =[];
       angular.forEach(blips, function(blip, key){
            angular.forEach(selectedProducts, function(product, key){
                var blipProductMatchesSelectedProduct =blip.product == product.name;
                var uncatogrisedSelected = product.name == 'Uncategorised' && (blip.product == '' || blip.product == undefined);
                if(blipProductMatchesSelectedProduct || uncatogrisedSelected)
                {
                    blipsThatMatchSelectedProducts.push(blip);
                }
            });
       });
       return blipsThatMatchSelectedProducts;
    }
    function getSelectedProducts(products)
    {
       var selected = [];
       angular.forEach(products,function(product, index){
           if(product.isSelected == true)
           {
               selected.push(product);
           }
       });
       return selected;
    }
});
