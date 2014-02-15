function activity_createCtrl($scope, $navigate) {

    $scope.go_to_sign_up_page = function () {
        if ($scope.disabled) {
            return;
        }
        var new_activity = $scope.input_activity;
        var activity = new Activity(new_activity);
        Activity.save_activities(activity);
        Activity.set_now_activity(new_activity);
        Activity.save_click_activity(activity);
        $navigate.go("/activity_sign_up");

    }

    $scope.button_show = function () {
        Activity.get_all_activities().length == 0 ? $scope.show_button = false : $scope.show_button = true;
    }


    $scope.judge_repeat = function () {
        if (Activity.judge_activity_name_repeat($scope.input_activity)) {
            $scope.repeat_prompt = true;
            $scope.disabled = true;
            return;
        }
        $scope.repeat_prompt = false;
        $scope.disabled = false;
    }


    $scope.Activity_list = function () {
        $navigate.go("activity_list");
    }


    $scope.button_show();
    $scope.judge_repeat();

}