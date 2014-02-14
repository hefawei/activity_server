function bid_sign_upCtrl($scope, $navigate) {

    $scope.bid_information = Bid.get_all_bids();

    $scope.back_to_bid_list = function () {
        Bid.update_bid_list();
        $navigate.go("/bid_list");
    }

    $scope.bid_start = function () {
        Bid.set_bid_running(Bid.get_bid_click());
        Bid.set_bid_activity_name();
        Bid.set_bid_status();
        $scope.button_status('started');
    }
    $scope.judge_running_equal_click = function () {
        Bid.judge_running_equal_click() ? $scope.run_bid() : $scope.click_bid();
    }


    $scope.run_bid = function () {
        $scope.peoples = Bid.get_bid_running().people || [];
        var run_bid = Bid.get_bid_running();
        $scope.button_status(run_bid.status);
    }

    $scope.click_bid = function () {
        $scope.peoples = Bid.get_bid_click().people || [];
        var click_bid = Bid.get_bid_click();
        var status = Bid.get_bid_running().status;
        if (status == 'started') {
            $scope.activity_situation = true;
            return;
        }
        if (status == 'un_start' && click_bid.status == 'un_start') {
            Bid.change_click_bid_list();
        }
        $scope.button_status(click_bid.status);
    }


    $scope.button_status = function (status) {
        $scope.button_state = status;
    }


    function judge_finish_status() {
        Bid.set_bid_status_and_save_bid_yellow_blank();
        var bid_status = Bid.get_bid_running().status;
        if (bid_status == "ended") {
            $scope.button_status('ended');
            $scope.activity_situation = true;
            $navigate.go("/bid_result");
            return;
        }
    }


    $scope.bid_end = function () {
        window.confirm("确认要结束本次竞价吗？") ? judge_finish_status() : console.log('否');

    }


    $scope.bid_data_refresh = function () {
        $scope.judge_running_equal_click();
        $scope.bid_information = $scope.peoples;
        $scope.bid_sign_up_number = $scope.bid_information.length;

    }

    $scope.bid_data_refresh();


}