var env = {};

if (window) {
  Object.assign(env, window.__env);
}

var interventionsApp = angular.module('interventionsApp', [
    'ngMaterial', 
    'ngAnimate',
    'md.data.table',
    'interventionsTable',
]).constant('__env', env);;
