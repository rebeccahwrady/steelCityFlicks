angular.module('myFlicks.factories', [])
    //specifically the blogpost factory
    .factory('BlogpostFactory', ['$resource', function($resource) {
        return $resource('http://localhost:3000/api/posts/:id', { id: '@id' }, {
            'update': {method: 'PUT'}
        });
    }])

    .factory('Purchase', ['$resource', function($resource) {
        return $resource('api/purchases/:id')
    }])

    .factory('Contact', ['$resource', function($resource){
        return $resource('api/contact/:id')
    }]);