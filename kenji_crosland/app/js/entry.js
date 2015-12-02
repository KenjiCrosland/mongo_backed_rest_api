require('angular/angular');
var angular = window.angular;

var recipeApp = angular.module('recipeApp', []);
require('./recipes/recipes')(recipeApp);
