require(__dirname + '/../../app/js/entry');
require('angular-mocks');

describe('recipes controller', function() {
  var $httpBackend;
  var $ControllerConstructor;
  var $scope;

  beforeEach(angular.mock.module('recipeApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller){
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    var controller = $ControllerConstructor('RecipesController', {$scope: $scope});
    expect(typeof $scope).toBe('object');
    expect(typeof controller).toBe('object');
    expect(Array.isArray($scope.recipes)).toBe(true);
  });

  it('should be able to cancel editing', function(){
    var controller = $ControllerConstructor('RecipesController', {$scope: $scope});
    $scope.recipes.push({_id:1, title: 'test recipe'});
    var recipe = $scope.recipes[0];
    expect(recipe.title).toBe('test recipe');
    $scope.makeCopy(recipe);
    expect(recipe.editing).toBe(true);
    expect($scope.editing[recipe._id]).toEqual(recipe);
    $scope.cancelEditing(recipe);
    expect(recipe.editing).toBe(false);
    expect($scope.editing[recipe._id]).toBe(undefined);
  });

  describe('REST requests', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope){
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $ControllerConstructor('RecipesController', {$scope: $scope})
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a GET request when getAll() is called', function(){
      $httpBackend.expectGET('/allrecipes').respond(200, [{title: 'test recipe'}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.recipes[0].title).toBe('test recipe');
    });

    it('should be able to create a recipe', function() {
      $httpBackend.expectPOST('/recipes').respond(200, {title: 'Hipster Sriracha Tacos'});
      expect($scope.recipes.length).toBe(0);
      $scope.create({title: 'Hipster Sriracha Tacos'});
      $httpBackend.flush();
      expect($scope.recipes[0].title).toBe('Hipster Sriracha Tacos');
    });

    it('should be able to update a recipe', function(){
      $scope.recipes.push({title: 'hello'});
      expect($scope.recipes[0].title).toBe('hello');
      $scope.newRecipe = angular.copy($scope.recipes[0]);
      $scope.newRecipe.title = 'Spicy Hipster Sriracha Tacos';
      $scope.newRecipe._id = '123';
      $httpBackend.expectPUT('/recipes/' + $scope.newRecipe._id, {"_id":$scope.newRecipe._id,"title":"Spicy Hipster Sriracha Tacos","editing":false}).respond(200, {});
      $scope.update($scope.newRecipe);
      $httpBackend.flush();
      expect($scope.newRecipe.editing).toBe(false);
    });

    it('should be able to delete a recipe', function() {
      var recipe = $scope.recipes.push({_id:1, title: 'test recipe'});
      expect($scope.recipes[0].title).toBe('test recipe');
      expect($scope.recipes.length).toBe(1);
      $httpBackend.expectDELETE('/recipes/' + $scope.recipes._id).respond(200,{});
      $scope.remove(recipe);
      $httpBackend.flush();
      expect($scope.recipes.length).toBe(0);
    });

  });
});


