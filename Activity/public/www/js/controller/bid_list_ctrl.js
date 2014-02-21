function bid_listCtrl($scope, $navigate) {


    (function () {
        var now_activity = Activity.get_now_activity().status;
        if (now_activity == 'started') {
            $scope.activity_situation = true;
        }
    })();

    $scope.back_to_activity_list = function () {
        $navigate.go("/activity_list");
    }

    $scope.bid_sign_up_page = function () {

        if (!$scope.activity_situation) {
            Bid.get_bid_name();
            $navigate.go("/bid_sign_up");
            return;
        }
    }
    $scope.bid_sign_up_detail = function (name, activity_name) {
        var bid = Bid.get_activity_equal_bid(name, activity_name);
        var status = bid.status;
        status == 'ended' ? $navigate.go('/bid_result') : $navigate.go('/bid_sign_up');
    }



    function change_button_situation() {
        if (Bid.have_bid_running()) {
            $scope.activity_situation = true;
            return;
        }
        $scope.activity_situation = false;
    }



    $scope.bid_lists = Bid.get_current_user_activity_bids();



    $scope.sign_up_page = function () {
        $navigate.go('/activity_sign_up');
    }

    $scope.bid_list_state = true;
    change_button_situation();

}