module.exports = function(app) {
  app.directive('recipeCardDirective', function() {
    return {
      restrict: 'AC',
      replace: true,
      templateUrl: '/templates/recipe_card_template.html',
      scope: {
        recipe: '=',
        makeCopy: '&',
        remove: '&',
        addIngredientField: '&',
        removeIngredientField: '&',
        cancelEditing: '&',
        update: '&'
      }
    }
  })
}
