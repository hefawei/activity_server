function activity_listCtrl($scope, $navigate,$http) {

    $scope.Lists = Activity.get_current_user_activities();

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


    $scope.synchronous_dates = function(){

        var date = get_synchronous_date_post();
        $http.post('/synchronous_dates/synchronous_user_activity_and_bid_dates',date)
            .success(function(response){
                if(JSON.parse(response)==true){
                    alert('同步数据成功');
                }
            }).error(function(){
                alert('提交失败');
            })
    }

    function get_synchronous_date_post (){
        var user_name = get_current_user_name()
        var all_activity = Activity.get_every_activity().reverse();
        var activity_sign_ups = Activity.get_activity_sign_up_information().reverse();
        var all_bids = Bid.get_every_bid_information().reverse();
        var bid_sign_ups = Bid.get_bid_sign_ups_information().reverse();
        var bid_price_statistic = Bid.get_statistic_bid_price_length().reverse();
        var date = {user_name:user_name,all_activities:all_activity,activity_sign_ups_information:activity_sign_ups,
        all_bids:all_bids,bid_sign_ups_information:bid_sign_ups,bid_price_statistic:bid_price_statistic}
        return date;
    }




    $scope.change_button_status();


}






