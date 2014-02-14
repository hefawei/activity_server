function bid_resultCtrl($scope, $navigate, $timeout) {

    $scope.back_to_bid_list = function () {
        $navigate.go('/bid_list');
    }

    $scope.go_to_bid_price_statistic = function () {
        $navigate.go("/bid_price_statistic");
    }

    $scope.get_bid_result_of_bid_name = function () {
        $scope.running_item = Bid.get_bid_click().name;
    }


    $scope.get_bid_result_message = function () {
        Bid.get_bid_order_list();
        var bid_result_people = Bid.get_bid_result_people();
        $scope.bid_result_list = bid_result_people;
        $scope.bid_sign_up_result_number = $scope.bid_result_list.length;
    }


    function get_right_result() {
        var success_people = Bid.get_right_people();
        if (success_people) {
            localStorage.setItem("people", JSON.stringify(success_people));
            $scope.select = "have";
            $scope.show = true;
            $scope.result = "succeed";
            return;
        }
        $scope.select = "not_have";
        $scope.show = false;
        $scope.result = "failed";
    }


    function bid_result_view() {
        get_right_result();
        $timeout(function () {
            $('#myModal').modal('show');
            $timeout(function () {
                $('#myModal').modal('hide');
            }, 3000);
        }, 1);
    }

    function bid_statistic_result() {
        Bid.statistic_result();
        var people = Bid.get_bid_success_people();
        if (people) {
            $scope.result = 'succeed';
            return;
        }
        $scope.result = 'succeed';

    }

    $scope.get_bid_result_message();
    $scope.success_people = Bid.get_right_people();
    $scope.get_bid_result_of_bid_name();
    bid_statistic_result();
    bid_result_view();


}