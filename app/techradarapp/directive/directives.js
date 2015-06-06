angular.module('TechRadarApp')
.directive('legend',function(){
    return{
        restrict: 'E',
        scope:
        {
            model: '=',
            filterProperties:'=',
            title: '@',
            group: '@',
            legendName: '@',
        },
        templateUrl:'legend.html',
        replace: true
    }
})
.directive('groupMarker',function(){
    return{
        restrict: 'E',
        scope:
        {
            lines: '=',
        },
        templateUrl:'groupMarker.svg',
        replace: true,
    }
})
