/**
 * Created with JetBrains RubyMine.
 * User: linux
 * Date: 13-12-22
 * Time: 下午3:21
 * To change this template use File | Settings | File Templates.
 */
function Activity(name) {
    this.name = name;
    this.status = 'un_start';
    this.activity_person = [];
}


Activity.save_activities = function (activity) {
    var activities = JSON.parse(localStorage.getItem('input_values')) || [];
    activities.unshift(activity);
    localStorage.setItem('input_values', JSON.stringify(activities));
}

Activity.save_click_activity = function (activity) {
    localStorage.setItem("click_activity", JSON.stringify(activity));
}


Activity.set_now_activity = function (name) {
    var activities = Activity.get_all_activities();
    _.map(activities, function (activity) {
        if (activity.name == name) {
            localStorage.setItem('now_activity', JSON.stringify(activity));
            return;
        }
    })
}

Activity.get_now_activity = function () {
    return JSON.parse(localStorage.getItem('now_activity')) || [];
}


Activity.get_all_activities = function () {
    return JSON.parse(localStorage.getItem('input_values')) || [];
}

Activity.judge_activity_name_repeat = function (name) {
    var activities = Activity.get_all_activities();
    if (_.find(activities, function (activity) {
        return activity.name == name;
    })) {
        return true;
    }

}


Activity.set_click_activity = function (name) {
    var activities = Activity.get_all_activities();
    _.map(activities, function (activity) {
        if (activity.name == name) {
            localStorage.setItem('click_activity', JSON.stringify(activity));
            return;
        }
    })
}

Activity.get_click_activity = function () {
    return JSON.parse(localStorage.getItem("click_activity"));
}

Activity.set_status_of_activity = function () {
    var status = Activity.get_now_activity().status
    status == 'un_start' ? status = 'started' : status = 'ended'
    Activity.set_now_activity_status(status);
    Activity.update_activity_list();
}


Activity.update_activity_list = function () {
    var activities = Activity.get_all_activities();
    var run_activity = Activity.get_now_activity();
    activities = _.map(activities, function (activity) {
        if (activity.name == run_activity.name) {
            activity = run_activity;
            return activity;
        }
        return activity;
    })
    localStorage.setItem('input_values', JSON.stringify(activities));
}

Activity.set_now_activity_status = function (status) {
    var activity = Activity.get_now_activity();
    activity.status = status;
    localStorage.setItem('now_activity', JSON.stringify(activity));
}


//Activity.check_activity_started = function () {
//    var activities = Activity.get_all_activities();
//    if (_.find(activities, function (activity) {
//        return activity['status'] == 'started'
//    })) {
//        return true;
//    }
//}


Activity.check_sign_up_finish = function () {
    if (Activity.get_now_activity().status == "ended") {
        return true;
    }
}

Activity.activity_yellow = function () {
    localStorage.activity_yellow = '';
}

Activity.yellow_activity_name = function () {
    localStorage.activity_yellow = Activity.get_now_activity().name;
}

Activity.change_click_list = function () {
    var click_activity = Activity.get_click_activity();
    localStorage.setItem('now_activity', JSON.stringify(click_activity));
}

Activity.judge_running_equal_click = function () {
    var click_activity = Activity.get_click_activity();
    var run_activity = Activity.get_now_activity();
    return click_activity.name == run_activity.name;
}

Activity.button_situation = function () {
    if (Activity.get_now_activity().status == 'started' || Bid.get_bid_running().status == "started") {
        return true;
    }
}














