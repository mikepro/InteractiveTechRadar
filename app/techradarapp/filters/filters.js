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
           angular.forEach(getBlipProductNames(blip.product),function(blipProduct, key){
                angular.forEach(selectedProducts, function(product, key){
                    var blipProductMatchesSelectedProduct = blipProduct == product.name;
                    var uncatogrisedSelected = product.name == 'Uncategorised' && (blip.product == '' || blip.product == undefined);
                    var blipHasNotPreviouslyBeenAdded = blipsThatMatchSelectedProducts.indexOf(blip) ==-1;
                    if((blipProductMatchesSelectedProduct || uncatogrisedSelected) && blipHasNotPreviouslyBeenAdded)
                    {
                        blipsThatMatchSelectedProducts.push(blip);
                    }
                });
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
    function getBlipProductNames(productString)
    {
        if(productString == undefined)
            return [''];
        var products = productString.split(',');
        var productsToReturn = [];
        angular.forEach(products,function(product,key){
            productsToReturn.push(product.trim()); 
        });
        return productsToReturn;
    }
});
