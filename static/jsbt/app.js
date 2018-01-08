angular.module('storeApp', [])

	.controller('cartController', function($scope) {

	$scope.tax = 20;
	$scope.invoice = {
		items: [{
				qty: 1,
				title: 'Tuscan urns',
				cost: 14,
				url: 'product1'},
				{qty: 1,
				title: 'Bosphorus bowls',
				cost: 28,
				url: 'product2'},
				{qty: 2,
				title: 'Langdon vases ',
				cost: 24,
				url: 'product3'}
				]
	};

	$scope.removeItem = function(index) {
		$scope.invoice.items.splice(index, 1);
	},

	$scope.total = function() {
		var total = 0;
		angular.forEach($scope.invoice.items, function(item) {
				total += item.qty * item.cost;
		})
		return total;
	}		

	$scope.shiping = function() {
		var shiping = 0;

		if($scope.total() < 100) {
			shiping = 25;
		} else {
			shiping = 0;
		}
		return shiping;
	}

});