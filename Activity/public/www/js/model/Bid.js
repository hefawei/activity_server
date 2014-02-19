function Bid(name, activity_name) {
    this.user_name = get_current_user_name();
    this.name = name;
    this.activity_name = activity_name;
    this.people = [];
    this.status = 'un_start'
}


Bid.get_all_bids = function () {
    var activity_name = Activity.get_click_activity().name || [];
    var bids = JSON.parse(localStorage.getItem('bid_lists')) || [];
    var all_bids = (bids).filter(function (bid) {
        return bid.activity_name == activity_name;
    });
    return all_bids;
}

Bid.get_every_bids = function () {
    return JSON.parse(localStorage.getItem('bid_lists')) || [];
}

Bid.set_bid_name = function (activity_name) {
    var bids = JSON.parse(localStorage.getItem('bid_lists')) || [];
    return _.filter(bids,function (bid) {
        return bid.activity_name == activity_name;
    }).length + 1;
}

Bid.get_bid_name = function () {
    var now_activity = null;
    Activity.judge_running_equal_click() ? now_activity = Activity.get_now_activity() :
        now_activity = Activity.get_click_activity();
    var activity_name = now_activity.name;
    var bid_array = Bid.get_every_bids();
    if (now_activity.status == "ended") {
        var bid = new Bid('第' + Bid.set_bid_name(activity_name)+'次竞价', activity_name);
        bid_array.unshift(bid);
        localStorage.setItem("bid_lists", JSON.stringify(bid_array));
        Bid.set_bid_running(bid);
        Bid.save_bid_click(bid);

    }
}

Bid.set_bid_running = function (bid) {
    localStorage.setItem("bid_running", JSON.stringify(bid));
}

Bid.save_bid_click = function (bid) {
    localStorage.setItem("bid_click", JSON.stringify(bid));
}


Bid.get_bid_click = function () {
    return  JSON.parse(localStorage.getItem("bid_click"));
}

Bid.get_bid_running = function () {
    return  JSON.parse(localStorage.getItem("bid_running")) || [];
}

Bid.get_bid_result_people = function () {
    return JSON.parse(localStorage.getItem("bid_result_people")) || [];
}

Bid.get_bid_success_people = function () {
    return JSON.parse(localStorage.getItem("people"));
}

Bid.get_result_order = function () {
    return JSON.parse(localStorage.getItem("result_order")) || [];
}


Bid.set_bid_click = function (name) {
    var bids = Bid.get_all_bids();
    _.map(bids, function (bid) {
        if (bid.name == name && bid.activity_name == Activity.get_click_activity().name) {
            localStorage.setItem('bid_click', JSON.stringify(bid));
            return;
        }
    })
}

Bid.set_bid_status = function () {
    var bid_run = Bid.get_bid_running();
    bid_run.status == "un_start" ? bid_run.status = "started" : bid_run.status = "ended";
    localStorage.setItem("bid_running", JSON.stringify(bid_run));
    Bid.update_bid_list();

}


Bid.set_bid_status_and_save_bid_yellow_blank = function () {
    Bid.set_bid_status();
    localStorage.bid_yellow = '';
    localStorage.activity_yellow = '';
}

Bid.set_bid_activity_name = function () {
    localStorage.activity_yellow = Activity.get_now_activity().name;
    localStorage.bid_yellow = Activity.get_now_activity().name;
}

Bid.have_bid_running = function () {
    var bids = Bid.get_every_bids();
    if (bids.length == 0) {
        return false;
    }
    return _.find(bids, function (bid) {
        return bid.status == 'started'
    });
}

Bid.update_bid_list = function () {
    var bids = Bid.get_every_bids();
    var run_bid = Bid.get_bid_running();
    bids = _.map(bids, function (bid) {
        if ((bid.name == run_bid.name) && (bid.activity_name == run_bid.activity_name)) {
            bid = run_bid;
            return bid;
        }
        return bid;
    })
    localStorage.setItem('bid_lists', JSON.stringify(bids));
}

Bid.get_bid_people_name = function (phone) {
    var now_activity_person = JSON.parse(localStorage.getItem('now_activity'))['activity_person'];
    for (var i = 0; i < now_activity_person.length; i++) {
        if (phone == now_activity_person[i].phone) {
            return now_activity_person[i].name
        }
    }
    console.log("对不起，您没有报名此活动！");
    return false;
}

Bid.get_bid_order_list = function () {
    var peoples = Bid.get_bid_click().people;
    var bid_people = _.sortBy(peoples, function (people) {
        return parseInt(people.price);
    })
    localStorage.setItem("bid_result_people", JSON.stringify(bid_people));
}

Bid.get_result_people = function () {
    return  JSON.parse(localStorage.getItem("bid_result_people"));
}


Bid.get_right_people = function () {
    var peoples = Bid.get_result_people();
    for (var i = 0, j = peoples.length; i < j; ++i) {
        var length = _.filter(peoples,function (people) {
            return parseInt(people.price)  == parseInt(peoples[i].price)
        }).length;
        if (length == 1) {
            return peoples[i];
        }
        i = i + length - 1;
    }
    return false;
}


Bid.statistic_result = function () {
    var peoples = Bid.get_bid_result_people();
    var results = [];
    var result = {};
    for (var i = 0, j = peoples.length; i < j; ++i) {
        var length = _.filter(peoples,function (people) {
            return people.price == peoples[i].price;
        }).length;
        result['number'] = length;
        result['price'] = peoples[i].price;
        results.push(result);
        result = {};
        i = i + length - 1;
    }
    localStorage.setItem("result_order", JSON.stringify(results));
}

Bid.save_bid_list_people = function () {
    var bid_running = Bid.get_bid_running();
    var bids = JSON.parse(localStorage.getItem("bid_lists")) || [];
    _.map(bids, function (bid) {
        if (bid_running.name == bid.name && bid_running.activity_name == bid.activity_name) {
            bid.people = bid_running.people;
            localStorage.setItem('bid_click', JSON.stringify(bid));
        }
    })

    localStorage.setItem("bid_lists", JSON.stringify(bids));
}

Bid.save_bid_running_people = function (price, phone) {
    var bid_running = Bid.get_bid_running();
    var bid_person = {};
    var bidder_name = Bid.get_bid_people_name(phone);
    bid_person['name'] = bidder_name;
    bid_person['price'] = price;
    bid_person['phone'] = phone;
    bid_running.people.unshift(bid_person);
    localStorage.setItem("bid_running", JSON.stringify(bid_running));
}

Bid.change_click_bid_list = function () {
    var click_bid = Bid.get_bid_click();
    localStorage.setItem('bid_running', JSON.stringify(click_bid));
}

Bid.judge_running_equal_click = function () {
    var bid_click = Bid.get_bid_click();
    var bid_running = Bid.get_bid_running();
    return bid_click.name == bid_running.name;
}

Bid.get_activity_equal_bid = function (name, activity_name) {
    var bid = _.find(Bid.get_all_bids(), function (bid) {
        return  (bid.name == name) && (bid.activity_name == activity_name)
    })
    localStorage.setItem('bid_click', JSON.stringify(bid));
    return bid;
}

Bid.get_bid_sign_ups = function(){
    return JSON.parse(localStorage.getItem('bid_running')).people
}

Bid.get_every_bid_information = function(){
    var all_bids = Bid.get_every_bids();
    var every_bid_information = [];
    _.each(all_bids,function(bid){
        every_bid_information.push({user_name:bid.user_name,activity_name:bid.activity_name,
        bid_people_number:bid.people.length,bid_name:bid.name,status:bid.status})
    })
    return every_bid_information;
}

Bid.get_bid_sign_ups_information = function(){
    var all_bids = Bid.get_every_bids();
    var bid_sign_ups_people = [];
    _.each(all_bids,function(bid){
        var winner = _.first(get_bid_people_info(bid.people))
        _.each(bid.people,function(sign_up){
            var isWinner = winner == sign_up ? true : false
            bid_sign_ups_people.push({user_name:bid.user_name,activity_name:bid.activity_name,
            bid_name:bid.name,sign_up_name:sign_up.name,sign_up_price:sign_up.price,
            sign_up_phone:sign_up.phone, IsWinner: isWinner})
        })
    })
    return bid_sign_ups_people;
}

function get_bid_people_info(bid_people){
    var price_group = get_price_group(bid_people)
    return _.find(price_group,function(value,key){
        return  value.length==1
    })  || []


}



function get_price_group(bid_people){
    return _.groupBy(bid_people,function(list){
        return  parseInt(list.price)
    })

}

Bid.get_statistic_bid_price_length = function(){
    var all_bids = Bid.get_every_bids();
    var bid_price_statistic = [];
    _.each(all_bids,function(bid){
        var bid_group = get_price_group(bid.people)
         _.each(bid.people,function(sign_up){
             bid_price_statistic.push({user_name:bid.user_name,activity_name:bid.activity_name,
            bid_name:bid.name,bid_price:sign_up.price,price_number:bid_group[parseInt(sign_up.price)].length})

        })
    })
    return bid_price_statistic
}




















