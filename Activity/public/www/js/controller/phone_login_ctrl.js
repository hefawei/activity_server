function phone_loginCtrl($scope,$http,$navigate){

    $scope.login_party_bid = function(name,password){
        var name = $scope.name
        var password = $scope.password
        post_date_to_server(name,password);
    }

    function post_date_to_server(name,password){
        $http.post('/users/authenticate_user',{name:name,password:password})
            .success(function(response){
                if(JSON.parse(response)==true){
                    localStorage.current_user_name = $scope.name;
                    $navigate.go('/activity_create');
                    return
                }
                alert("用户名或密码错误");
            }).error(function(){
                alert("提交失败");
            })

    }

}