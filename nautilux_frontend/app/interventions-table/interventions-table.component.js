angular.
module('interventionsTable').
filter('formatStatut', function() {
	return function(input) {
		switch(input) {
			case 1:
				return 'Bouillon';
			case 2:
				return 'Validé';
			case 3:
				return 'Terminé';
			default:
				return '';
		}
	};
}).
component('interventionsTable', { 
	templateUrl: 'interventions-table/interventions-table.template.html',
	controller: function interventionsTableController($scope, $http, $mdDialog, __env) {
		var self = this;
		$scope.query = {
			order: '-date_creation',
			limit: 10,
			page: 1,
		};

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

		$scope.$watch(function () {
			return $scope.query.order;
		}, onChangeQuery);

		$scope.$watch(function () {
			return $scope.query.limit;
		}, onChangeQuery);

		$scope.$watch(function () {
			return $scope.query.page;
		}, onChangeQuery);

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
				onRemoving: onChangeQuery,
			});
		};

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
				onRemoving: onChangeQuery,
			});
		};

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
				onRemoving: onChangeQuery,
			});
		};
	}
});

function InterventionFormController($mdDialog, $http, $scope, __env) {
	var self = this;

	$scope.intervention = {};

	$http.get(`${__env.apiUrl}/interventions/villes/`).then(function(response) {
			self.villes = response.data;
	});

	self.closeDialog = function() {
		$mdDialog.hide();
	};

	self.createIntervention = function createIntervention() {
		let formattedDate;
		if ($scope.intervention.date_intervention) {
			const date = new Date($scope.intervention.date_intervention);
			formattedDate = date.toISOString().split('T')[0];
		}

		$http.post(
			`${__env.apiUrl}/interventions/`, 
			{
				...$scope.intervention,
				date_intervention: formattedDate,
			}
		).then(function successCallback() {
			$mdDialog.hide();
		}, function errorCallback(response) {
			console.log(response);
		});
	}

	self.updateIntervention = function updateIntervention(intervention) {
		const date = new Date(intervention.date_intervention);
		const formattedDate = date.toISOString().split('T')[0];

		$http.put(
			`${__env.apiUrl}/interventions/${intervention.id}/`, 
			{
				...intervention,
				lieu: intervention.lieu.id,
				date_intervention: formattedDate,
			}
		).then(function successCallback() {
			$mdDialog.hide();
		}, function errorCallback(response) {
			console.log(response);
		});
	}

	self.deleteIntervention = function updateIntervention(intervention) {
		$http.delete(`${__env.apiUrl}/interventions/${intervention.id}/`).then(function successCallback() {
			$mdDialog.hide();
		}, function errorCallback(response) {
			console.log(response);
		});
	}
}
