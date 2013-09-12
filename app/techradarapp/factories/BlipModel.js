function BlipModel(id, name, isNew)
{
    var self = this;
    self.id = id;
    self.name = name;
    self.isNew = isNew;
    self.x = undefined;
    self.y = undefined;
}

var app = angular.module('TechRadarApp');
app.factory('BlipModel',function(){
    return BlipModel;
});
