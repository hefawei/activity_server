myModule.config(function($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "pages/phone_login.html ",
        controller: phone_loginCtrl
    }).when("/activity_create", {
        templateUrl: "pages/activity_create.html ",
        controller: activity_createCtrl
      }).when("/activity_list", {
            templateUrl: "pages/activity_list.html",
            controller:activity_listCtrl
      }).when("/activity_sign_up", {
            templateUrl: "pages/activity_sign_up.html",
            controller:activity_sign_upCtrl
      }).when("/bid_list", {
            templateUrl: "pages/bid_list.html",
            controller:bid_listCtrl
      }).when("/bid_sign_up", {
            templateUrl: "pages/bid_sign_up.html",
            controller:bid_sign_upCtrl
      }).when("/bid_result", {
            templateUrl: "pages/bid_result.html",
            controller:bid_resultCtrl
      }).when("/bid_price_statistic", {
            templateUrl: "pages/bid_price_statistic.html",
            controller:bid_price_statisticCtrl
      }).otherwise({
            redirectTo: "/"
      })

    });


    //routing generate
    //routing generated over

/** Here is example
myModule.config(function($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "pages/activity_list_page.html",
        controller: ActivityListController
    }).when("/activity/create", {
            templateUrl: "pages/activity_create_page.html",
            controller: ActivityCreateController
        }).when("/sign_ups/list/:activity_name", {
            templateUrl: "pages/apply_page.html",
            controller: SignUpListController
        }).otherwise({
            redirectTo: "/"
        });
});
**/
