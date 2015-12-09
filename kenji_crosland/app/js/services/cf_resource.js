var handleSuccess = function(callback) {
  return function(res) {
    callback(null, res.data)
  };
};

var handleFail = function(callback) {
  return function(res) {
    console.log(res);
    callback(res.data);
  }
}

module.exports = function(app) {
  app.factory('cfResource', ['$http', function() {
    return function(resourceName) {
      var resource = {};
      resource.getAll = function(callback) {
        $http.get(resourceName)
          .then(handleSuccess(callback), handleFail(callback));
        };
      return resource;
    };
  }]);
};
