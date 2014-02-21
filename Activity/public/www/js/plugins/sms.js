//
//var native_accessor = {
//
//    send_sms: function (phone, message) {
//        native_access.send_sms({"receivers":[{"name":'name', "phone":phone}]}, {"message_content":message});
//    },
//
//    receive_message: function (json_message) {
//        if (typeof this.process_received_message === 'function') {
//            this.process_received_message(json_message);
//        }
//    }
//
//};

function notify_message_received(message_json) {
    native_accessor.receive_message(message_json);
}



var native_accessor = {

    send_sms: function (phone, message) {
//        native_access.send_sms({"receivers":[{"name":'name', "phone":phone}]},
//            {"message_content":message},this);
        console.log('给'+phone+'发短信'+message)
    },

    receive_message: function (json_message) {
        if (typeof this.process_received_message === 'function') {
            this.process_received_message(json_message);
        }
    },
    process_received_message:function(json_message){
        var phone_number=json_message.phone;
        if(SMS.Check_Activity_BM_or_JJ(json_message)=="BM" )
        {
            var name=SMS.get_message_name(json_message);
            var phone=SMS.get_message_phone(json_message);
            if(Activity.get_now_activity().status=='started')
            {
                if(SMS.judge_repeat_message(json_message,name)){
                  console.log("恭喜！报名成功")
                }
                if(!SMS.get_sign_up_people()){
                    return;
                }

            }
            if(Activity.get_now_activity().status=='un_start')
            {
                 console.log("活动尚未开始，请稍候！")
            }
            if(Activity.get_now_activity().status=='ended')
            {
                 console.log("sorry，活动已结束！")
            }
        }
        if(SMS.Check_Activity_BM_or_JJ(json_message)=="JJ" )
        {

            var phone = SMS.get_message_phone(json_message);
            var price = SMS.get_message_price(json_message);
            if(Bid.get_bid_running().status=='started')
            {
                if(!Bid.get_bid_people_name(phone)){
                    return;
                }
                if (SMS.judge_bid_repeat_message(json_message,price)){
                    console.log("恭喜，竞价成功！");
                }
            }
            if(Bid.get_bid_running().status=='un_start')
            {
                console.log("竞价尚未开始，请稍候！");
            }
            if(Bid.get_bid_running().status=='ended')
            {
                console.log("sorry，活动已结束！");
            }
        }

    }

}















































function sendSMS(text, phone) {
    var SMSObj = {"messages": [
        {"create_date": "FriOct 25 08:56:49", "message": text, "phone": phone}
    ]};
    notify_message_received(SMSObj);
}












