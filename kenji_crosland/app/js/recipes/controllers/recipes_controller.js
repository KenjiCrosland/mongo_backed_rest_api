module.exports = function(app) {
  app.controller('RecipesController', ['$scope', '$http', function($scope, $http){
    $scope.recipes = [];
    $scope.editing = {};
    $scope.newRecipe = null;

    $scope.makeCopy = function(recipe) {
      recipe.editing = true;
      $scope.editing[recipe._id] = angular.copy(recipe);
    }

    $scope.cancelEditing = function(recipe) {
      $scope.editing[recipe._id].editing = false;
      for(i = 0; i < $scope.recipes.length; i++){
        if($scope.recipes[i]._id === recipe._id){
          angular.copy($scope.editing[recipe._id], $scope.recipes[i]);
          delete $scope.editing[recipe._id];
          return;
        }
      }
    }

    $scope.getAll = function() {
      $http.get('/allrecipes')
      .then(function(res){
        $scope.recipes = res.data;
      }, function(err){
        console.log(err.data);
      });
    };

    $scope.create = function(recipe) {
      $http.post('/recipes', recipe)
        .then(function(res){
          $scope.recipes.push(res.data);
          $scope.newRecipe = null;
        }, function(err){
          console.log(err.data);
        });
    };

    $scope.update = function(recipe) {
      recipe.editing = false;
      $http.put('/recipes/' + recipe._id, recipe)
        .then(function(res){
          console.log('Recipe updated!')
        }, function(err){
          console.log(err.data)
        })
    }

    $scope.remove = function(recipe) {
      $scope.recipes.splice($scope.recipes.indexOf(recipe), 1);
      $http.delete('/recipes/' + recipe._id)
        .then(function(res){
          console.log('totes cool, recipe is gone gone gone');
        }, function(err){
          console.log(err.data);
        })
    }
  }]);
}
