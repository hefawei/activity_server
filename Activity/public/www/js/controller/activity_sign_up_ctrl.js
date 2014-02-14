function activity_sign_upCtrl($scope, $navigate) {

    $scope.Back = function () {
        Activity.update_activity_list();
        $navigate.go("/activity_list");
    }

    $scope.Start = function () {
        Activity.set_now_activity(Activity.get_click_activity().name);
        Activity.yellow_activity_name();
        Activity.set_status_of_activity();
        $scope.button_status('started');
    }


    $scope.finish_sign_up = function () {
        window.confirm("确认要结束本次报名吗？") ? Activity.set_status_of_activity() : console.log('否');
        var status = Activity.get_now_activity().status;
        if (status == "ended") {
            $scope.button_status('ended');
            Activity.activity_yellow();
            $scope.activity_situation = true;
            $navigate.go("/bid_list");
            return;
        }
    }


//    $scope.judge_activity_status = function () {
//        if (Activity.check_activity_started()) {
//            $scope.activity_situation = false;
//        }
//    }


    $scope.judge_running_equal_click = function () {
        Activity.judge_running_equal_click() ? $scope.run_activity() : $scope.click_activity();
    }


    $scope.run_activity = function () {
        var run_activity = Activity.get_now_activity();
        $scope.activity_person =Activity.get_now_activity().activity_person || [];
        $scope.button_status(run_activity.status);
    }

    $scope.click_activity = function () {
        var click_activity = Activity.get_click_activity();
        $scope.activity_person = Activity.get_click_activity().activity_person || [];
        var status = Activity.get_now_activity().status;
        if (status == 'started' || Bid.get_bid_running().status == 'started') {
            $scope.activity_situation = true;
            return;
        }
        if (status == 'un_start' && click_activity.status == 'un_start') {
            Activity.change_click_list();
        }
        $scope.button_status(click_activity.status);
    }

    $scope.button_status = function (status) {
        $scope.button_state = status;
    }


    $scope.data_refresh = function () {
        $scope.judge_running_equal_click();
        $scope.message_information = $scope.activity_person;
        $scope.sign_up_number = $scope.message_information.length;
    }


    $scope.go_to_bid = function () {
        if (!Activity.check_sign_up_finish()) {
            alert("报名未结束，不能进入竞价页面！");
        }
        if (Activity.check_sign_up_finish()) {
            $navigate.go('/bid_list');
        }
    }


//    $scope.judge_activity_status();


    $scope.judge_running_equal_click();

    $scope.data_refresh();
}