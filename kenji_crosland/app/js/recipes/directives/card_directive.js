module.exports = function(app) {
  app.directive('cardDirective', function() {
    return {
      restrict: 'AC',
      replace: true,
      transclude: true,
      templateUrl: '/templates/card_template.html',
      scope: {
        header: '=',
        headerText: '@',
        width: '@' //two columns, three columns, etc
      }
    }
  })
}
