var app = angular.module('TechRadarApp');
app.controller('SelectedRingGroupController',function($scope,BlipModel){
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
        var newBlip = new BlipModel($scope.id,$scope.name,$scope.isNew,$scope.group() );
        selectedRingAndGroup.ring.addBlip(newBlip);
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
    }
});
