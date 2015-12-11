module.exports = function(app) {
  app.controller('RecipesController', ['$scope', '$http', 'cfResource', function($scope, $http, cfResource){
    $scope.recipes = [];
    $scope.editing = {};
    $scope.currentRecipe = null;

    $scope.seeRecipe = function(recipe){
      $scope.currentRecipe = recipe;
    }

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

    $scope.addIngredientField = function(recipe) {
      if (recipe.ingredients[recipe.ingredients.length - 1] !== "") {
        recipe.ingredients.push("");
      }
    }

    $scope.removeIngredientField = function(recipe, ingredient) {
      recipe.ingredients.splice(recipe.ingredients.indexOf(ingredient), 1);
    }

    $scope.getAll = function() {
     cfResource('/allrecipes').getAll(function(err, data){
      if (err) return err;
      $scope.recipes = data;
     });
    };

    $scope.create = function(recipe) {
      cfResource('/recipes', recipe).post(function(err, data){
        $scope.recipes.push(data);
      });
    };

    $scope.update = function(recipe) {
      recipe.editing = false;
      cfResource('/recipes/' + recipe._id, recipe).put(function(err, data) {
        console.log('Recipe updated!');
      });
    }

    $scope.remove = function(recipe) {
      $scope.recipes.splice($scope.recipes.indexOf(recipe), 1);
      cfResource('/recipes/' + recipe._id).delete(function(err, data){
        console.log('Totes cool. Recipe is gone.')
      })
    }
  }]);
}
