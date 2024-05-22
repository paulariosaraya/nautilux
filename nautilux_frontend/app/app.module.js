// Initialisation d'un objet env vide pour les configurations environnementales
var env = {};

// Si l'objet window existe, on assigne les propriétés de window.__env à env
if (window) {
  Object.assign(env, window.__env);
}

// Création du module principal 'interventionsApp' avec ses dépendances
var interventionsApp = angular.module('interventionsApp', [
    'ngMaterial', 
    'ngAnimate',
    'md.data.table',
    'interventionsTable',
]).constant('__env', env); // Définition de la constante '__env' avec les valeurs de l'objet env
