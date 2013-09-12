module.exports = function(config) {
      config.set({
            basePath: '../../',
            frameworks: ['jasmine'],
            autoWatch : true,
            browsers: ["Chrome"],
            files: [
              'app/lib/angularJS/angular.js',
              'app/lib/angularJS/angular-*.js$',
              'app/lib/angularJS/angular-mocks.js',
              'app/techradarapp/*.js',
              'app/techradarapp/**/*.js',
              'tests/unit/**/*.js'
            ],
            junitReporter : {
              outputFile: 'test_out/unit.xml',
              suite: 'unit'
            }
    });
};
