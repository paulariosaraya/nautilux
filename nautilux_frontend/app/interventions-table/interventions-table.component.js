angular.
module('interventionsTable').
filter('formatStatut', function() {
  // Définition du filtre 'formatStatut' qui mappe les statuts d'intervention numériques au texte
	return function(input) {
		switch(input) {
			case 1:
				return 'Bouillon'; // Statut 1 -> 'Bouillon'
			case 2:
				return 'Validé'; // Statut 2 -> 'Validé'
			case 3:
				return 'Terminé'; // Statut 3 -> 'Terminé'
			default:
				return '';
		}
	};
}).
component('interventionsTable', { 
	// Définition du 'interventionsTable' avec son template et son contrôleur
	templateUrl: 'interventions-table/interventions-table.template.html',
	controller: function interventionsTableController($scope, $http, $mdDialog, __env) {
		var self = this;

		// Initialisation des paramètres de pagination / tri du tableau d'intervention
		$scope.query = {
			order: '-date_creation',
			limit: 10,
			page: 1,
		};

		// Fonction pour gérer les changements de requête et mettre à jour les données
		function onChangeQuery() {
			$http.get(
				`${__env.apiUrl}/interventions/`,
				{
					params: {
						ordering: $scope.query.order,
						limit: $scope.query.limit,
						offset: ($scope.query.page - 1) * $scope.query.limit,
					}
				},
			).then(function(response) {
				self.interventions = response.data;
			});
		};
		
		// Surveillance des changements des paramètres de requête et appel de onChangeQuery
		$scope.$watch(function () {
			return $scope.query.order;
		}, onChangeQuery);

		$scope.$watch(function () {
			return $scope.query.limit;
		}, onChangeQuery);

		$scope.$watch(function () {
			return $scope.query.page;
		}, onChangeQuery);

		
		// Fonction pour afficher le formulaire de création d'intervention
		self.showCreateForm = function showCreateForm($event) {
			$mdDialog.show({
				controller: InterventionFormController,
        controllerAs: 'ctrl',
				templateUrl: 'interventions-table/intervention-create-form.template.html',
				parent: angular.element(document.body),
				targetEvent: $event,
				clickOutsideToClose: true,
				locals: {
					three: 3,
				},
				bindToController: true,
				onRemoving: onChangeQuery, // mettre à jour la liste des interventions
			});
		};

		// Fonction pour afficher le formulaire de modification d'intervention
		self.showUpdateForm = function showUpdateForm($event, intervention) {
			$mdDialog.show({
				controller: InterventionFormController,
        controllerAs: 'ctrl',
				templateUrl: 'interventions-table/intervention-update-form.template.html',
				parent: angular.element(document.body),
				targetEvent: $event,
				clickOutsideToClose: true,
				locals: {
					intervention: {...intervention},
				},
				bindToController: true,
				onRemoving: onChangeQuery, // mettre à jour la liste des interventions
			});
		};

		// Fonction pour afficher le dialogue de confirmation de suppression d'intervention
		self.showDeleteForm = function showDeleteForm($event, intervention) {
			$mdDialog.show({
				controller: InterventionFormController,
        controllerAs: 'ctrl',
				templateUrl: 'interventions-table/intervention-delete-form.template.html',
				parent: angular.element(document.body),
				targetEvent: $event,
				clickOutsideToClose: true,
				locals: {
					intervention: {...intervention},
				},
				bindToController: true,
				onRemoving: onChangeQuery, // mettre à jour la liste des interventions
			});
		};
	}
});

// Contrôleur pour les formulaires de création, modification et suppression d'intervention
function InterventionFormController($mdDialog, $http, $scope, __env) {
	var self = this;

	// Initialisation de la date minimale pour le sélecteur de date
	const today = new Date();
	self.minDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

	// Configuration locale pour le formatage des dates
	$scope.dateLocale = {
		formatDate: function(date) {
			const formatter = new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
			return date ? formatter.format(date) : '';
		}
	};

	// Initialisation de l'objet intervention pour la creation d' une nouvelle intervention
	$scope.intervention = {};

	// Récupération des villes pour le champ lieu du formulaire
	$http.get(`${__env.apiUrl}/interventions/villes/`).then(function(response) {
			self.villes = response.data;
	});

	// Fonction pour fermer la boîte de dialogue
	self.closeDialog = function() {
		$mdDialog.hide();
	};

	// Fonction pour créer une nouvelle intervention
	self.createIntervention = function createIntervention() {
		// Formater la date saisie dans le formulaire
		let formattedDate;
		if ($scope.intervention.date_intervention) {
			const date = new Date($scope.intervention.date_intervention);
			formattedDate = date.toISOString().split('T')[0];
		}
		// Faire la requête http
		$http.post(
			`${__env.apiUrl}/interventions/`, 
			{
				...$scope.intervention,
				date_intervention: formattedDate,
			}
		).then(function successCallback() {
			// Fermer la boîte de dialogue après la création réussie
			$mdDialog.hide();
		}, function errorCallback(response) {
			// TODO: Améliorer la gestion des erreurs
			console.log(response);
		});
	}

	// Fonction pour modifier une intervention existante
	self.updateIntervention = function updateIntervention(intervention) {
		// Formater la date saisie dans le formulaire
		let formattedDate;
		if (intervention.date_intervention) {
			const date = new Date(intervention.date_intervention);
			formattedDate = date.toISOString().split('T')[0];
		}
		// Faire la requête http
		$http.put(
			`${__env.apiUrl}/interventions/${intervention.id}/`, 
			{
				...intervention,
				lieu: intervention.lieu ? intervention.lieu.id : null,
				date_intervention: formattedDate,
			}
		).then(function successCallback() {
			// Fermer la boîte de dialogue après la mise à jour réussie
			$mdDialog.hide();
		}, function errorCallback(response) {
			// TODO: Améliorer la gestion des erreurs
			console.log(response);
		});
	}

	// Fonction pour supprimer une intervention existante
	self.deleteIntervention = function updateIntervention(intervention) {
		$http.delete(`${__env.apiUrl}/interventions/${intervention.id}/`).then(function successCallback() {
			// Fermer la boîte de dialogue après la suppression réussie
			$mdDialog.hide();
		}, function errorCallback(response) {
			// TODO: Améliorer la gestion des erreurs
			console.log(response);
		});
	}
}
