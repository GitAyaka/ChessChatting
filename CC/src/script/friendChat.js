function friendChat(ID, fObject) {
    
    $("#navigationBar span").addClass("pointEventNone");
    $(".tmpLeft").addClass("pointEventNone");
    console.log(ID);
    console.log(fObject);
    var fName = fObject.uname;
    var fId = fObject.uid;

    // 移除旧的内容
    $(".tmpMain").remove();
    $(".tmpRight").remove();
    clearInterval(fMPolling);

    // 在right区域渲染新的内容
    $("#rightFrame").append("<div></div>");
    $("#rightFrame div").prop("class","tmp tmpRight").prop("id","addFriendTips");
    $("#rightFrame div").append("<br><p>提 示</p><hr><p>请您在聊天过程中<br>遵守法律法规</p>");

    // 在main区域渲染新的内容
    $("#mainFrame").append("<div></div>");
    $("#mainFrame div").prop("class","tmp tmpMain").prop("id","friendChatFrame");
    // 姓名ID栏
    $("#friendChatFrame").append("<div>"+fName+" ("+fId+")"+"</div><div><input> <input> <input> <input></div>");
    $("#friendChatFrame div:eq(0)").prop("id","fCName").prop("class","fC");
    // 三个按钮
    $("#friendChatFrame div:eq(1)").prop("id","fCButton").prop("class","fC");
    $("#fCButton input").prop("type","button");
    $("#fCButton input:eq(0)").prop("id","exitChat").val("退 出 聊 天");
    $("#exitChat").on("click", function() {
        // alert("close");
        $("#navigationBar span").removeClass("pointEventNone");
        $(".tmpLeft").removeClass("pointEventNone");
        
        $(".tmpMain").remove();
        $(".tmpRight").remove();
        
        clearInterval(fMPolling);

        friendInfo(ID);
    })
    $("#fCButton input:eq(1)").prop("id","launchChallenge").val("发 起 挑 战");
    $("#launchChallenge").on("click", function() {
        // 发起象棋挑战功能，还没写
        // alert("challenge");
        var tmpData = {
            msg : ">>>>>------------------------- 系统消息： 对方希望与您进行象棋挑战 --------------------------<<<<<"
        }
        $.ajax({
            url:"http://localhost:8080/fChat/" + ID + "/" +fId,
            type:"POST",
            async:true,
            contentType:"application/json; charset=utf-8",
            data:JSON.stringify(tmpData),
            dataType : 'json',
            success:function(res){
                console.log(res);
                if(res) {
                    alert("挑战意愿已传达");
                }
                else {
                    alert("消息发送失败 请重新发送");
                }
            }
        })
    })
    $("#fCButton input:eq(2)").prop("id","deleteMessage").val("清 空 消 息");
    $("#deleteMessage").on("click", function() {
        localStorage.removeItem(key);
        friendChat(ID, fObject);
    })
    $("#fCButton input:eq(3)").prop("id","deleteFriend").val("删 除 好 友");
    $("#deleteFriend").on("click", function() {
        $.ajax({
            url:"http://localhost:8080/deleteFriendship?uIdA=" + ID + "&uIdB=" + fId,
            type:"delete",
            contentType:"application/json; charset=utf-8",
            // data:JSON.stringify(tmpData),
            dataType : 'json',
            beforeSend:function(){
                 
            },
            success:function(res){
                console.log(res);
                if(res){
                    alert("删除成功 请刷新页面");
                }
                else{
                    alert("删除失败");
                }
            }
        })
    })

    $("#friendChatFrame").append("<hr><div></div><div></div>");
    $("#friendChatFrame div:eq(2)").prop("id","contentBox");
    $("#friendChatFrame div:eq(3)").prop("id","inputBox");

    // 获取之前存储好的消息
    // 准备一个对象用来暂存消息，然后转成string存储到localstorage中
    var key = "f" + fId + "t" +ID;
    console.log(key);
    console.log(typeof(key))
    var localMe = localStorage.getItem(key);
    console.log(localMe);
    if(localMe != null) {
        // alert(1);
        var message = JSON.parse(localMe);
        for (var i=0;i<message.sign.length;i++) {
            if(message.sign[i] == 1) {
                // alert(1);
                $("#contentBox").append("<p>"+ message.content[i] +"</p><br>");
            }
            else {
                $("#contentBox").append("<span><p>"+ message.content[i] +"</p></span><br>");
            }
        }
    }

    $("#contentBox"); // 获取离线消息
    // 这是真的，还没写完
    var returnMessage = '';
    $.ajax({
        url:"http://localhost:8080/fChat/" + ID + "/" +fId,
        type:"GET",
        async:false,
        contentType:"application/json; charset=utf-8",
        dataType : 'json',
        beforeSend:function(){
            
        },
        success:function(res){
            console.log(res);
            returnMessage = res;
        }
    })
    // 展示离线消息
    for(var i in returnMessage) {
        $("#contentBox").append("<p>"+ returnMessage[i].msg +"</p><br>");
    }
    // 保存离线消息
    if(localMe == null) {
        var message = '';
        var sign = [];
        var content = [];
        message = {
            sign:sign,
            content:content
        }
        console.log(message);
    }
    for(var i in returnMessage) {
        message.sign.push(1);
        message.content.push(returnMessage[i].msg);
    }
    console.log(message);
    var tmpM = JSON.stringify(message);
    localStorage.setItem(key, tmpM);
    // var message = [];
    // var friendMessage = {
    //     fId:"",
    //     fMessage:message
    // }


    // WebSocket通信，做不出来，滚
    // 建立连接，不要了，好友聊天直接建立全局链接
    // var wSck= new WebSocket("ws://localhost:8080/");
    // wSck.onopen = function() {
    //     console.log("connection success");
    // };
    // 接收消息
    // wSck.onmessage = function(resm) {
    //     //Decode JSON data into an object 可能不需要，看后端返回什么再说
    //     var resmm = JSON.parse(resm);
    //     $("#contentBox").append("<p>"+ resmm.m +"</p><br>"); //展示收到的消息
    // };

    // 改用ajax轮询以实时通讯
    var fMPolling = setInterval(function() {
        $.ajax({
            url:"http://localhost:8080/fChat/" + ID + "/" +fId,
            type:"GET",
            async:true,
            contentType:"application/json; charset=utf-8",
            dataType : 'json',
            beforeSend:function(){
                
            },
            success:function(res){
                // console.log(res);
                // 展示
                if(res.length != 0){
                    for(var i in res) {
                        $("#contentBox").append("<p>"+ res[i].msg +"</p><br>");
                    }
                    // 存储
                    var tmpMe = localStorage.getItem(key);
                    var message = JSON.parse(tmpMe);
                    for(var i in res) {
                        message.sign.push(1);
                        message.content.push(res[i].msg); 
                    }
                    var tmpM = JSON.stringify(message);
                    localStorage.setItem(key, tmpM);
                    console.log(message);
                }
            }
        })
    },500);



    $("#inputBox").append("<textarea></textarea> <input>");
    $("#inputBox textarea").prop("id","inputTalk");
    $("#inputBox input").prop("id","buttonTalk").prop("type","button").val("发 送");
    $("#buttonTalk").on("click", function() {
        // alert("1");
        var talk = $("#inputTalk").val();
        console.log(talk);
        var tmpData = {
            msg:talk
        }
        $("#inputTalk").val("");
        if (talk != "") {
            // console.log("send");
            $.ajax({
                url:"http://localhost:8080/fChat/" + ID + "/" +fId,
                type:"POST",
                async:true,
                contentType:"application/json; charset=utf-8",
                data:JSON.stringify(tmpData),
                dataType : 'json',
                beforeSend:function(){
                    
                },
                success:function(res){
                    console.log(res);
                    if(res) {
                        $("#contentBox").append("<span><p>"+ talk +"</p></span>");
                        var tmpMe = localStorage.getItem(key);
                        var message = JSON.parse(tmpMe);
                        message.sign.push(0);
                        console.log(message);
                        message.content.push(talk);
                        console.log(message);
                        var tmpM = JSON.stringify(message);
                        localStorage.setItem(key, tmpM);
                        console.log(message);
                    }
                    else {
                        alert("消息发送失败 请重新发送");
                    }
                }
            })
        }
    })

    
}


// function sendMessage(ID, fId, talk, wSck) {
//     console.log(ID, fId, talk);
//     // ordinary for loop
//     var newTalk = '';
//     for (let i = 0; i < talk.length; i++) {
//         newTalk = newTalk + talk[i];
//         newTalk = newTalk +'\n';
//     }
//     $("#contentBox").append("<span><p>"+ newTalk +"</p></span>");
//     // 发送的内容，可能要改
//     var senM = {
//         uId:ID,
//         fId:fId,
//         message:talk
//     }
//     console.log(senM);
//     var senMjson = JSON.stringify(senM);//Encode object to JSON
// 	wSck.send(senMjson);
// }