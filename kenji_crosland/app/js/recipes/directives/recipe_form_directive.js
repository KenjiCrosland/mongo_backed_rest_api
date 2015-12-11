module.exports = function(app) {
  app.directive('recipeFormDirective', function() {
    return {
      restrict: 'AC',
      replace: true,
      templateUrl: '/templates/recipe_form_template.html',
      scope: {
        buttonText: '@',
        formClass: '@',
        formName: '@',
        recipe: '=',
        addIngredientField: '&',
        removeIngredientField: '&',
        cancel: '&',
        save: '&'
      }
    }
  })
}
