function bid_price_statisticCtrl($scope, $navigate) {

    $scope.back_to_bid_list = function () {
        $navigate.go("/bid_list");
    }

    $scope.go_to_bid_result = function () {
         $navigate.go("/bid_result");
    }


    $scope.get_bid_result_of_bid_name = function () {
        $scope.running_item = Bid.get_bid_click().name;
    }

    $scope.result_list = Bid.get_result_order();
    $scope.bid_result_number = Bid.get_bid_result_people().length;


    $scope.get_bid_result_of_bid_name();
    Bid.statistic_result();


}

