function activity_listCtrl($scope, $navigate) {

    $scope.Lists = Activity.get_all_activities();

    $scope.detail_message = function (name) {
        Activity.set_click_activity(name);
        var click_status = Activity.get_click_activity().status;
        click_status == 'ended' ? $navigate.go('/bid_list') : $navigate.go("/activity_sign_up");
    }


    $scope.change_button_status = function () {
        if (Activity.button_situation()) {
            $scope.activity_situation = true;
        }
    }


    $scope.Create_Activities = function () {
        if (!$scope.activity_situation)
            $navigate.go("/activity_create");
    }


    $scope.change_button_status();


}






