(function() {
	"use strict";
	var k = {
		0: {
			o2: 0.709,
			n2: 0.81,
			air: 0.773,
			ar: 0.561,
			h2: 11.27,
			he: 5.6,
			xe: 0.172,
			kr: 0.27,
			ne: 1.125,
			gas:  1.394
		},
		20: {
			o2 : 0.752,
			n2 : 0.86,
			air : 0.83,
			ar : 0.602,
			h2 : 12.048,
			he : 6.01,
			xe : 0.185,
			kr : 0.29,
			ne : 1.21,
			gas : 1.497	
		}
	};

	var l = {
		0: {
			o2: 0.863,
			n2: 1.241,
			air: 1.145,
			ar: 0.717,
			h2: 14.059,
			he: 7.993,
			xe: 0.34,
			kr: 0.414,
			ne: 0.829,
			gas: 2.366
		},
		20: {
			o2: 0.863,
			n2: 1.241,
			air: 1.145,
			ar: 0.717,
			h2: 14.059,
			he: 7.993,
			xe: 0.34,
			kr: 0.414,
			ne: 0.829,
			gas: 2.366
		}
	};

	var app = angular.module('app', []);

    app.controller('MainCtrl', function($scope) {
		var base = this;

		base.tab = 1;

		base.selectTab = function(setTab) {
			base.tab = setTab;
		}

		base.isSelected = function(checkTab) {
			return base.tab === checkTab;
		}

		$scope.temp = 0;

        $scope.calculate = function() {
        	if($scope.getGasCalc) {
        		$scope.result = (parseInt($scope.mass) * k[$scope.temp][$scope.getGasCalc]).toFixed(4);
        		$scope.resultL = (parseInt($scope.mass) * l[$scope.temp][$scope.getGasCalc]).toFixed(4);
        	}
        }		
    });

})();