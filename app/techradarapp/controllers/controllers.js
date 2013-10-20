var app = angular.module('TechRadarApp');
app.controller('SelectedRingGroupController',function($scope,BlipModel,FilterProductModel){
    $scope.isVisible = function()
    {
        return $scope.model.selectedRingAndGroup.selected; 
    }
    $scope.ringName = function()
    {
        if($scope.isVisible())
        {
            return $scope.model.selectedRingAndGroup.ring.title;
        }
    }
    $scope.group = function()
    {
        if($scope.isVisible())
        {
            return $scope.model.selectedRingAndGroup.group;
        }
    }
    $scope.save = function()
    {
        save();
        close();
        clearModelValues();
    }
    $scope.saveAndAdd = function()
    {
        save();
        clearModelValues();
    }

    $scope.cancel = function()
    {
        clearModelValues();
        close();
    }

    function save()
    {
        var selectedRingAndGroup =$scope.model.selectedRingAndGroup;
        var newBlip = new BlipModel($scope.id,$scope.name,$scope.isNew,$scope.group(),$scope.product);
        selectedRingAndGroup.ring.addBlip(newBlip);
        if(angular.isString($scope.product)){
            var products = $scope.product.split(',');
            angular.forEach(products,function(product,key){
                product = product.trim();
            });
            angular.forEach(products,function(product,key){
                $scope.filterProperties.addProduct(new FilterProductModel(product, true));
            });
        }
    }

    function close()
    {
        var selectedRingAndGroup =$scope.model.selectedRingAndGroup;
        selectedRingAndGroup.ring = undefined;
        selectedRingAndGroup.group = undefined;
        selectedRingAndGroup.selected = false;
    }
    function clearModelValues()
    {
        $scope.id = undefined;
        $scope.name = undefined;
        $scope.isNew = undefined;
        $scope.product = undefined;
    }
});

app.controller('TechRadarController',['$scope','TechRadarModel','RingModel','FilterModel', function($scope,TechRadarModel,RingModel,FilterModel){
    var self = this;
    self.centerCords= {'x': 500, 'y': 250};
    $scope.model = new TechRadarModel(self.centerCords.x, self.centerCords.y );
    $scope.filterProperties = new FilterModel();
    $scope.model.init();
    $scope.addRing = function()
    {
        var numberOfRings = $scope.model.rings.length;
        var startingRadius =numberOfRings ?$scope.model.rings[numberOfRings-1].radius:  0;
        var endingRadius = numberOfRings ?$scope.model.rings[numberOfRings-1].radius + 80 : 80;
        $scope.model.addRing(new RingModel('trial', startingRadius, endingRadius ,self.centerCords));
    }

    $scope.removeRing = function()
    {
        $scope.model.removeRing();
    }

    $scope.removeBlip = function(){
        $scope.model.rings[0].removeBlip();
    }
    $scope.zoomIn = function(){
        $scope.model.zoomIn();
    }
    $scope.zoomOut = function(){
        $scope.model.zoomOut();
    }
    $scope.selectRingAndGroup= function(index, ring)
    {
        $scope.model.selectedRingAndGroup.group =index;
        $scope.model.selectedRingAndGroup.ring = ring;
        $scope.model.selectedRingAndGroup.selected = true;
    }
}]);
app.controller('FilterController',['$scope','FilterProductModel', function($scope,FilterProductModel){
    $scope.filterProperties.products = [new FilterProductModel('Uncategorised', true)];
    $scope.showProductChoices= function()
    {
        return !$scope.filterProperties.allProductsSelected;
    }
    $scope.selectAllProducts = function()
    {
        angular.forEach($scope.filterProperties.products, function(value,key){
            value.isSelected = true;
        });
    }
    $scope.unselectAllProducts = function()
    {
        angular.forEach($scope.filterProperties.products, function(value,key){
            value.isSelected =false;
        });
    }
}]);
