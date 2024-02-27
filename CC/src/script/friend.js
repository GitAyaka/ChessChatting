// 这个是好友聊天所对应的脚本文件

function friendInfo(ID) {
    $(".tmp").remove();

    // 在左侧侧边栏的基础渲染
    $("#leftFrame").append("<div></div>");
    $("#leftFrame div").prop("class","tmp tmpLeft");
    $(".tmpLeft").append("<div>好 友 管 理</div><hr>");
    $(".tmpLeft div").prop("class","friendLeft").prop("id","newFriend");
    $(".tmpLeft").append("<div></div><hr>");
    $(".tmpLeft div:eq(1)").prop("id","friendLeftList");

    // 在左侧侧边栏的渲染好友列表
    // 还没写完
    // 需要先get一下
    var returnData = '';

    $.ajax({
        url:"http://localhost:8080/getFriendList?uId=" + ID,
        type:"GET",
        async:false,
        contentType:"application/json; charset=utf-8",
        // data:{
        //     uId:ID
        // },
        dataType : 'json',
        beforeSend:function(){
            
        },
        success:function(res){
            console.log(res);
            returnData = res;
        }
    })

    console.log(returnData);

    // for(var i in returnDataState0){
    //     console.log(returnDataState0[i].applicant);
    //     var applyId = returnDataState0[i].aplId;
    //     var applyUId = returnDataState0[i].applicant;
    //     $(".friendManageFrame div").append("<span>"+applyUId+"</span> <input> <input><br>");
    //     $(".friendManageFrame div input:eq("+ 2*i +")").prop("id","a"+i);
    //     $(".friendManageFrame div input:eq("+ (2*i+1) +")").prop("id","r"+i);
    // }
    for(var i in returnData) {
        var friendName = returnData[i].uname;
        var friendId = returnData[i].uid;
        $("#friendLeftList").append("<span>" + friendName + "</span><br><hr>");
        $("#friendLeftList span:eq("+i+")").prop("id","friend"+i);
        $("#friend"+i).on("click", function(e) {
            // alert("rnm");
            var button_id = $(this).attr("id");
            console.log(button_id);
            var fIndex = button_id.substr(6);
            console.log(returnData[fIndex]);
            friendChat(ID, returnData[fIndex]);
        })
    }

    // 假的begin
    // for(i)
    // for(i=0;i<30;i++){
    //     $("#friendLeftList").append("<span>abbbbbb</span><br><hr>");
    //     $("#friendLeftList span:eq("+i+")").prop("id","friend"+i);
    //     $("#friend"+i).on("click", function(e) {
    //         // alert("rnm");
    //         var v_id = $(this).attr("id");
    //         console.log(v_id);
    //         friendChat(ID, v_id);
    //     })
    // }
    
    // 假的end

    // 好友管理事件（接受、添加、删除）
    $("#newFriend").on("click", function() {
        // alert("111");
        manageFriend(ID);
    })

}

function manageFriend(ID) {
    console.log(ID);
    // alert(111);

    // 移除旧的内容
    $(".tmpMain").remove();
    $(".tmpRight").remove();

    // 在right区域渲染新的内容
    $("#rightFrame").append("<div></div>");
    $("#rightFrame div").prop("class","tmp tmpRight").prop("id","addFriendTips");
    $("#rightFrame div").append("<br><p>提 示</p><hr><p>您需要通过对方的ID<br>用以搜索并添加好友</p>")

    // 在main区域渲染新的内容
    $("#mainFrame").append("<div></div>");
    $("#mainFrame div").prop("class","tmp tmpMain").prop("id","addFriend");
    $("#addFriend").append("<div></div>");
    $("#addFriend div").prop("id","friendManageBar").append("<p>新的朋友</p><p>添加好友</p><p>删除好友</p>");
    
    $("#friendManageBar p:eq(0)").on("click", function(){
        // alert(111);
        acceptFriend(ID);
    })
    $("#friendManageBar p:eq(1)").on("click", function(){
        // alert(2);
        addFriend(ID);
    })
    $("#friendManageBar p:eq(2)").on("click", function(){
        // alert(3);
        deleteFriend(ID);
    })
}

// 获取好友请求列表
function acceptFriend(ID) {
    // alert("123");
    $(".friendManageFrame").remove();

    $("#addFriend").append("<div></div>");
    $("#addFriend div:eq(1)").prop("class","friendManageFrame");
    $(".friendManageFrame").append("<p>下方是新的好友请求</p>");
    $(".friendManageFrame").append("<div></div>");

    // 假的begin
    // for(i=0;i<30;i++){
    //     $(".friendManageFrame div").append("<span>abbbbbb</span> <input> <input><br>");
    //     // $(".friendManageFrame div input")
    //     $(".friendManageFrame div input:eq("+ 2*i +")").prop("id","a"+i);
    //     $(".friendManageFrame div input:eq("+ (2*i+1) +")").prop("id","r"+i);
    // }
    // $(".friendManageFrame div input").prop("type", "button");
    // $(".friendManageFrame div input:even").prop("value", "同意").prop("class","agreeButton");
    // $(".friendManageFrame div input:odd").prop("value", "拒绝").prop("class","refuseButton");
    // 假的end

    var returnData = '';

    $.ajax({
        url:"http://localhost:8080/getFriendApply",    //接受post的位置
        type:"GET",
        async:false,
        contentType:"application/json; charset=utf-8",
        data:{
            uId:ID
        },
        dataType : 'json',
        beforeSend:function(){
            
        },
        success:function(res){
            console.log(res);
            returnData = res;
        }
    })

    // console.log(returnData[0].applicant);
    var returnDataState0 = [];
    for(var i in returnData) {
        if(returnData[i].state == 0) {
            returnDataState0.push(returnData[i]);
        }
    }
    console.log(returnDataState0);

    for(var i in returnDataState0){
        console.log(returnDataState0[i].applicant);
        var applyId = returnDataState0[i].aplId;
        var applyUId = returnDataState0[i].applicant;
        $(".friendManageFrame div").append("<span>"+applyUId+"</span> <input> <input><br>");
        $(".friendManageFrame div input:eq("+ 2*i +")").prop("id","a"+i);
        $(".friendManageFrame div input:eq("+ (2*i+1) +")").prop("id","r"+i);
    }
    $(".friendManageFrame div input").prop("type", "button");
    $(".friendManageFrame div input:even").prop("value", "同意").prop("class","agreeButton");
    $(".friendManageFrame div input:even").on("click", function() {
        // alert(123);
        var buttonId = $(this).attr("id");
        // console.log(buttonId);
        // console.log(typeof(buttonId));
        var aplIndex = buttonId.substr(1);
        console.log(aplIndex);
        console.log(returnDataState0[aplIndex].applicant);

        var tmpData = {
            "aplId":returnDataState0[aplIndex].aplId,
            "applicant":returnDataState0[aplIndex].applicant,
            "aplReceiver":returnDataState0[aplIndex].aplReceiver
        }

        $.ajax({
            url:"http://localhost:8080/acceptFriendApply",    //接受post的位置
            type:"post",
            contentType:"application/json; charset=utf-8",
            data:JSON.stringify(tmpData),
            dataType : 'json',
            beforeSend:function(){
                 
            },
            success:function(res){
                console.log(res);
                if(res){
                    alert("成功");
                }
                else{
                    alert("失败");
                }
            }
        })

    })
    $(".friendManageFrame div input:odd").prop("value", "拒绝").prop("class","refuseButton");
    $(".friendManageFrame div input:odd").on("click", function() {
        var buttonId = $(this).attr("id");
        var aplIndex = buttonId.substr(1);
        console.log(aplIndex);
        console.log(returnDataState0[aplIndex].applicant);

        var tmpData = {
            "aplId":returnDataState0[aplIndex].aplId
        }

        $.ajax({
            url:"http://localhost:8080/rejectFriendApply",    //接受post的位置
            type:"post",
            contentType:"application/json; charset=utf-8",
            data:JSON.stringify(tmpData),
            dataType : 'json',
            beforeSend:function(){
                 
            },
            success:function(res){
                console.log(res);
                if(res){
                    alert("成功");
                }
                else{
                    alert("失败");
                }
            }
        })

    })

}

// 添加好友
function addFriend(ID) {
    $(".friendManageFrame").remove();

    $("#addFriend").append("<div></div>");
    $("#addFriend div:eq(1)").prop("class","friendManageFrame");
    $(".friendManageFrame").append("<p>请在下方输入您将要添加的好友的ID</p>").append("<input/> <input/>");
    $(".friendManageFrame input:eq(0)").prop("type","text").prop("placeholder","输入ID");
    $(".friendManageFrame input:eq(0)").prop("class","inAdd");
    $(".friendManageFrame input:eq(1)").prop("type","button").val("添 加").prop("class","buttonAdd");

    // 添加点击事件
    $(".friendManageFrame input:eq(1)").on("click", function() {
        // alert("tj");
        var friendId = $(".friendManageFrame input:eq(0)").val();
        console.log(ID);
        console.log(friendId);
        var valid = false;
        if(friendId.length != 0) {
            valid = true;
        }

        var tmpData = {
            "applicant":ID,
            "aplReceiver":friendId
        }

        if(valid) {
            $.ajax({
                url:"http://localhost:8080/postFriendApply",    //接受post的位置
                type:"post",
                contentType:"application/json; charset=utf-8",
                data:JSON.stringify(tmpData),
                dataType : 'json',
                beforeSend:function(){
                     
                },
                success:function(res){
                    console.log(res);
                    if(res){
                        alert("申请成功 等待对方确认");
                    }
                    else{
                        alert("申请失败");
                    }
                }
            })
        }


    })
}

// 删除好友
function deleteFriend(ID) {
    // alert("123");
    $(".friendManageFrame").remove();

    $("#addFriend").append("<div></div>");
    $("#addFriend div:eq(1)").prop("class","friendManageFrame");
    $(".friendManageFrame").append("<p>请在下方输入您将要删除的好友的ID</p>").append("<input/> <input/>");
    $(".friendManageFrame input:eq(0)").prop("type","text").prop("placeholder","输入ID");
    $(".friendManageFrame input:eq(0)").prop("class","inAdd");
    $(".friendManageFrame input:eq(1)").prop("type","button").val("删 除").prop("class","buttonAdd");

    // 添加点击事件
    $(".friendManageFrame input:eq(1)").on("click", function() {
        // alert("shanchu");
        var friendId = $(".friendManageFrame input:eq(0)").val();
        console.log(friendId);
        var valid = false;
        if(friendId.length != 0) {
            valid = true;
        }

        var tmpData = {
            "uIdA":ID,
            "uIdB":friendId
        }
        console.log(tmpData);

        if(valid) {
            $.ajax({
                url:"http://localhost:8080/deleteFriendship?uIdA=" + ID + "&uIdB=" + friendId,
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
        }
    })
}