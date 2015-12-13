//Made with help from watching in-class code videos

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
  app.factory('cfResource', ['$http', function($http) {
    return function(resourceName, resourceData) {
      var resource = {};
      resource.getAll = function(callback) {
        $http.get(resourceName)
          .then(handleSuccess(callback), handleFail(callback));
        };
      resource.get = function(callback) {
        $http.get(resourceName)
        .then(handleSuccess(callback), handleFail(callback));
      };
      resource.post = function(callback) {
        $http.post(resourceName, resourceData)
        .then(handleSuccess(callback), handleFail(callback));
      };
      resource.put = function(callback) {
        $http.put(resourceName, resourceData)
        .then(handleSuccess(callback), handleFail(callback));
      }
      resource.delete = function(callback) {
        $http.delete(resourceName)
        .then(handleSuccess(callback), handleFail(callback));
      }
      return resource;
    };
  }]);
};
