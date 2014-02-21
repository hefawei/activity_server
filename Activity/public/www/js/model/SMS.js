/**
 * Created with JetBrains RubyMine.
 * User: linux
 * Date: 13-12-22
 * Time: 下午3:22
 * To change this template use File | Settings | File Templates.
 */
function SMS() {

}

SMS.Check_Activity_BM_or_JJ = function (json_message) {
    var message_start = json_message.messages[0].message.substring(0, 2).toUpperCase();
    var message_end = json_message.messages[0].message.substring(2).replace(/^\s+|\s+$/g, '');
    var message_middle = isNaN(json_message.messages[0].message.substring(2));
    if (message_start == "BM" && message_end) {
        return "BM";
    }
    if (message_start == "JJ" && message_end  && message_middle == false) {
        return "JJ";
    }
}

SMS.get_message_name = function (json_message) {
    return json_message.messages[0].message.substring(2).replace(/^\s+|\s+$/g, '')
}

SMS.get_message_phone = function (json_message) {
    return json_message.messages[0].phone;
}

SMS.get_message_price = function (json_message) {
    return json_message.messages[0].message.substring(2);
}

SMS.get_sign_up_people = function () {
    return JSON.parse(localStorage.getItem("now_activity")).activity_person || [];
}

SMS.message_refresh_list = function () {
    var create_page_id = document.getElementById("create_page_id");
    if (create_page_id) {
        var scope = angular.element(create_page_id).scope();
        scope.$apply(function () {
            scope.data_refresh();
        })

    }

}

SMS.save_message_process = function (name, phone) {
    var now_activity = Activity.get_now_activity();
    var activities = Activity.get_all_activities();
    var Activity_person = {};
    Activity_person["name"] = name;
    Activity_person["phone"] = phone;
    now_activity.activity_person.unshift(Activity_person);
    localStorage.setItem('now_activity', JSON.stringify(now_activity));
    _.map(activities, function (activity) {
        if ((activity.name == now_activity.name) && (activity.user_name == get_current_user_name())) {
            activity.activity_person.unshift(Activity_person);
        }
    })
    localStorage.setItem("input_values", JSON.stringify(activities));
    SMS.message_refresh_list();
}

SMS.judge_repeat_message = function (json_message, name) {
    var activity_people = Activity.get_now_activity().activity_person;
    var phone = SMS.get_message_phone(json_message);
    if (_.find(activity_people, function (num) {
        return num.phone == phone;

    })) {
        console.log("您已经报名成功，请勿重新报名！");
        return;
    }
    SMS.save_message_process(name, phone);
    return true;
}


SMS.save_bid_people_message = function (price, phone) {
    Bid.save_bid_running_people(price, phone);
    Bid.save_bid_click_people();
    SMS.message_refresh_bid_list();
}


SMS.message_refresh_bid_list = function () {
    var create_page_id_bid = document.getElementById("create_page_id_bid");
    if (create_page_id_bid) {
        var scope = angular.element(create_page_id_bid).scope();
        scope.$apply(function () {
            scope.bid_data_refresh();
        })

    }

}

SMS.judge_bid_repeat_message = function (json_message, price) {
    var bid_running = Bid.get_bid_running();
    var bid_people = bid_running.people;
    var phone = json_message.messages[0].phone;
    if (_.find(bid_people, function (num) {
        return phone == num.phone;
    })) {
        console.log("您已经出价成功，请勿重新出价！");
        return false;
    }
    SMS.save_bid_people_message(price, phone);
    return true;
}









