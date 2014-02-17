function phone_loginCtrl($scope,$http,$navigate){


    $scope.login_party_bid = function(name,password){
        var name = $scope.name
        var password = $scope.password
        post_date_to_server(name,password);
    }

    function post_date_to_server(name,password){
        $http.post('/synchronous_dates/authenticate_user',{name:name,password:password})
            .success(function(response){
                if(JSON.parse(response)==true){
                    set_current_user_name(name);
                    get_current_user_activity_list();
                    return
                }
                alert("用户名或密码错误");
            }).error(function(){
                alert("提交失败");
            })
    }

    function get_current_user_activity_list(){
        if(Activity.get_activity_of_current_user()){
            $navigate.go('/activity_list');
        }
        else{
            alert("活动列表为空，请您先创建活动！");
            $navigate.go('/activity_create');
        }


    }




}