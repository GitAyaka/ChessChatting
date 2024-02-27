// 这个是象棋大厅所对应的脚本文件

function roomInfo(ID) {
    $(".tmp").remove();
    
    // 在左侧侧边栏的基础渲染
    $("#leftFrame").append("<div></div>");
    $("#leftFrame div").prop("class","tmp tmpLeft");
    $(".tmpLeft").append("<div>创 建 房 间</div><hr>");
    $(".tmpLeft").append("<div><input> <input></div><hr>");
    $(".tmpLeft div").prop("class","roomLeft");

    $(".roomLeft:eq(0)").on("click", function() {
        // alert(1);
        addRoom(ID);
    })

    $(".tmpLeft input:eq(0)").prop("type","text").prop("placeholder","搜索房间");
    $(".tmpLeft input:eq(1)").prop("type","button").val(" 搜索 ");

    // 获取对应的房间
    $(".tmpLeft input:eq(1)").on("click", function() {
        var tmpNameId = $(".tmpLeft input:eq(0)").val();
        console.log(tmpNameId);
        if(tmpNameId != "") {
            // searchRoom(tmpNameId);
            $.ajax({
                url:"http://localhost:8080/getRoomsByRNameAndRId?inputStr=" + tmpNameId,
                type:"GET",
                async:false,
                contentType:"application/json; charset=utf-8",
                dataType : 'json',
                success:function(res){
                    console.log(res);
                    returnRoomList = res;
                    $("#roomLeftList").remove();
                    $(".tmpLeft").append("<div></div><hr>");
                    $(".tmpLeft div:eq(2)").prop("id","roomLeftList");
                    var j = 0;
                    for(var i in returnRoomList) {
                        var roomName = returnRoomList[i].rname;  //这里两行需要根据返回的对象更改一下
                        // var roomId = returnRoomList[i].rId;
                        $("#roomLeftList").append("<span>" + roomName + "</span><br><hr>");
                        $("#roomLeftList span:eq("+j+")").prop("id","room"+i);
                        $("#room"+i).on("click", function() {
                            var button_id = $(this).attr("id");
                            console.log(button_id);
                            var rIndex = button_id.substr(4);
                            console.log(returnRoomList[rIndex]);
                            // 进入对应的房间
                            checkPwd(ID, returnRoomList[rIndex]);

                        })
                        j++;
                    }
                }
            })
        }
    })


    $(".tmpLeft").append("<div></div><hr>");
    $(".tmpLeft div:eq(2)").prop("id","roomLeftList");


    // 在左侧侧边栏的渲染房间列表
    // 还没写完
    var returnRoomList = '';

    $.ajax({
        url:"http://localhost:8080/getRooms",   //url没写全
        type:"GET",
        async:false,
        contentType:"application/json; charset=utf-8",
        dataType : 'json',
        success:function(res){
            console.log(res);
            returnRoomList = res;
        }
    })

    var j = 0;
    for(var i in returnRoomList) {
        console.log(i);
        var roomName = returnRoomList[i].rname;
        // var roomId = returnRoomList[i].rId;
        $("#roomLeftList").append("<span>" + roomName + "</span><br><hr>");
        $("#roomLeftList span:eq("+j+")").prop("id","room"+i);
        $("#room"+i).on("click", function() {
            var button_id = $(this).attr("id");
            console.log(button_id);
            var rIndex = button_id.substr(4);
            console.log(returnRoomList[rIndex]);
            // 进入对应的房间
            checkPwd(ID, returnRoomList[rIndex]);

        })
        j++;
    }
}

// 创建房间
function addRoom(ID) {
    console.log(ID);

    // 移除旧的内容
    $(".tmpMain").remove();
    $(".tmpRight").remove();

    // 在right区域渲染新的内容
    $("#rightFrame").append("<div></div>");
    $("#rightFrame div").prop("class","tmp tmpRight").prop("id","addFriendTips");
    $("#rightFrame div").append("<br><p>提 示</p><hr><p>您可以在此处<br>创建一个新的<br>象棋房间</p>")

    // 在main区域渲染新的内容
    $("#mainFrame").append("<div></div>");
    $("#mainFrame div").prop("class","tmp tmpMain").prop("id","selfChange");
    $("#selfChange").append("<p>请在下方创建新房间</p>").append("<input/><br><input/><br><input/>");
    $("#selfChange input:eq(0)").prop("type","text").prop("placeholder","输入要创建的房间名称");
    $("#selfChange input:eq(0)").prop("class","inChange");
    $("#selfChange input:eq(1)").prop("type","password").prop("placeholder","输入房间密码(此处为空默认无密码)");
    $("#selfChange input:eq(1)").prop("class","inChange");
    $("#selfChange input:eq(2)").prop("type","button").val("提 交").prop("class","buttonChange");

    $("#selfChange input:eq(2)").on("click", function() {
        // alert("ttt");
        var rName = $("#selfChange input:eq(0)").val();
        var rPwd = $("#selfChange input:eq(1)").val();
        console.log(rName, rPwd);

        var tmpData = {
            "owner":ID,
            "rName":rName,
            "rPwd":rPwd
        }

        $.ajax({
            url:"http://localhost:8080/createRoom",    //接受post的位置
            type:"POST",
            contentType:"application/json; charset=utf-8",
            data:JSON.stringify(tmpData),
            dataType : 'json',
            // async:true,
            beforeSend:function(){
                if(rName.length == 0){
                    alert("房间名称不能为空!")
                    return false;
                }
                if(rName.length > 20 || rPwd.length > 20){
                    alert("名称或密码不能超过20位!")
                    return false;
                } 
                console.log("before");
            },
            success:function(res){
                console.log(res);
                if(res != null) {
                    var rId = res.rid;
                    alert("创建成功！" + '\n' + "请牢记您的房间ID:" + rId);
                    console.log(rId);
                    enterRoom(ID, rId);
                }
                else {
                    alert("创建房间失败");
                }
            }
        })
    })
}

// 检查密码是否正确
function checkPwd(ID, rObj) {
    console.log(rObj);
    if (rObj.rpwd != ""){
        console.log(rObj.rpwd);
        var roomPwd = prompt("请输入房间密码", "");

        $.ajax({
            url:"http://localhost:8080/" + rObj.rid + "/checkRPwd?rPwd=" + roomPwd,
            type:"GET",
            async:false,
            contentType:"application/json; charset=utf-8",
            dataType : 'json',
            success:function(res){
                console.log(res);
                if(res) {
                    enterRoom(ID, rObj.rid);
                }
                else {
                    alert("密码错误");
                }
                
            }
        })
    }
    else{
        enterRoom(ID, rObj.rid);
    }
    
}

// 进入房间申请
function enterRoom(ID, rId) {

    // 移除旧的内容
    // $(".tmpMain").remove();
    // $(".tmpRight").remove();

    var selfStr = localStorage.getItem("self"+ID);
    var selfJSON = JSON.parse(selfStr);
    console.log(selfJSON);
    var usrName = selfJSON.uname;
    console.log(usrName);

    var tmpData ={
        uId:ID,
        uName:usrName
    }
    console.log(tmpData);
    console.log(rId);

    $.ajax({
        url:"http://localhost:8080/" + rId + "/enterRoom",    //接受post的位置
        type:"POST",
        contentType:"application/json; charset=utf-8",
        data:JSON.stringify(tmpData),
        dataType : 'json',
        // async:true,
        beforeSend:function(){
            
        },
        success:function(res){
            console.log(res);
            if(res) {
                innerRoom(ID, rId);
            }
            else {
                alert("进入房间失败 房间可能已经被删除");
            }
        }
    })

}

// 正式进入房间
function innerRoom(ID, rId) {
    // 移除旧的内容
    $("#navigationBar span").addClass("pointEventNone");

    $(".tmpLeft").remove();
    $(".tmpMain").remove();
    $(".tmpRight").remove();

    // 绘制房间内内容
    // 先画右侧
    var rightPolling = paintItemR(ID, rId);
    // 再来左侧
    // 房间基本信息与基础样式
    var leftPolling = paintItemL(ID, rId);
    console.log(leftPolling);
    // 退出房间事件
    $("#leaveRoom").on("click", function() {
        // 告诉后端我要退出房间
        leaveRoom(ID, rId);

        // 关闭轮询（有好几个轮询哈）
        clearInterval(roomInfoPolling);
        clearInterval(leftPolling);
        clearInterval(rightPolling);

        $("#navigationBar span").removeClass("pointEventNone");

        // 回调象棋大厅函数
        roomInfo(ID);
    })
    // 修改密码事件直接写后面了，所有这里没有
    
    // 绘制中间的基础内容
    paintItemC();
    // 中间的其他内容在另外一个地方绘制（轮询后）


    // 使用轮询获取房间信息
    var roomInfor = '';
    var roomInforStr = '';
    var roomInfoPolling = setInterval(function() {
        $.ajax({
            url:"http://localhost:8080/" + rId + "/getRoomInfo",
            type:"GET",
            async:true,
            contentType:"application/json; charset=utf-8",
            dataType : 'json',
            success:function(res){
                // console.log(res);
                // var resInfor = {
                //     "owner":res.owner,
                //     "player":res.player,
                //     "chessboard":res.chessBoard,
                //     "repentanceapplicant":res.repentanceapplicant
                // }
                var resStr = JSON.stringify(res);
                
                if (roomInforStr != resStr){
                // if (true){
                    console.log(1, res);
                    var preRoomObj = roomInfor;
                    roomInfor = res;
                    roomInforStr = resStr;
                    // 下棋和观棋的函数
                    roomChessBasic(ID, preRoomObj, res);
                    
                }
            }
        })
    },500);

}

// 绘制房间内右侧侧边栏
// 主要有房间群聊，房间成员列表和对局申请列表
// 为了方便，把房间群聊也写这里了
function paintItemR(ID, rId) {
    // 渲染右侧侧边栏
    $("#rightFrame").append("<div></div>");
    $("#rightFrame div").prop("class","tmp tmpRight").prop("id","roomRight");
    $("#rightFrame div").append("<div></div><hr><div></div><hr>");
    $("#roomRight div:eq(0)").prop("id","roomRightHead");
    $("#roomRight div:eq(1)").prop("id","roomRightBody");

    $("#roomRightHead").append("<p>聊天</p> <p>成员</p> <p>挑战</p>");

    // 聊天
    var chatting = false;
    var chattingRes = [];
    // var rcPolling = rcGetMsg();
    var rcPolling = setInterval(function() {
        $.ajax({
            url:"http://localhost:8080/" + rId + "/getMsg?uId=" + ID,
            type:"GET",
            async:true,
            contentType:"application/json; charset=utf-8",
            dataType : 'json',
            success:function(res){
                // console.log(res);
                
                if(chatting && (res.length != 0) && (res.length > chattingRes.length)){
                    
                    for(var i= chattingRes.length; i<res.length; i++) {
                        // console.log(res);
                        // console.log(ID);
                        // console.log(res.sender != ID);
                        if(res[i].sender != ID){
                            $("#messageShow").append("<p>"+ res[i].msg +"</p><br>");
                        }
                    }

                    chattingRes = res;
                    
                }

            }
        })
    },500);

    // 房间内聊天的样式设置
    $("#roomRightHead p:eq(0)").on("click", function() {
        chatting = true;
        $(".tmpBody").remove();
        $("#roomRightBody").append("<div></div>");
        $("#roomRightBody div").prop("class","tmpBody");
        
        $(".tmpBody").append("<div></div><hr><div><input/> <input/></div>");
        $(".tmpBody div:eq(0)").prop("id", "messageShow");
        $(".tmpBody div:eq(1)").prop("id", "messageInput");
        $("#messageInput input:eq(0)").prop("id","itext").prop("type","text");
        $("#messageInput input:eq(1)").prop("id","btext").prop("type","button").val(" 发送 ");

        $("#btext").on("click", function() {
            var imsg = $("#itext").val();
            $("#messageShow").append("<span><p>"+ imsg +"</p></span><br>");
            // 发送消息
            rcSendMsg(ID, rId, imsg);
            
        })

    })

    // 房间内成员列表
    $("#roomRightHead p:eq(1)").on("click", function() {
        chatting = false;
        $(".tmpBody").remove();
        $("#roomRightBody").append("<div></div>");
        $("#roomRightBody div").prop("class","tmpBody").prop("id","memberList");
        
        // 假的begin
        // for(var i=0;i<15;i++){
        //     $(".tmpBody").append("<div>suneo <input/></div>");
        // }
        // $("#memberList div input").prop("type","button");
        // 假的end

        $.ajax({
            url:"http://localhost:8080/" + rId + "/getRoomInfo",
            type:"GET",
            async:true,
            contentType:"application/json; charset=utf-8",
            dataType : 'json',
            success:function(res){
                console.log(res);
                console.log(res.owner);
                console.log(res.owner == ID);
                console.log(res.members);
                var memberMap = res.members;
                if (res.owner == ID) {
                    var j = 0;
                    for (var i in memberMap) {
                        $(".tmpBody").append("<div>" + memberMap[i].uname + " <input/> <input/></div>");
                        // $(".tmpBody div").prop("","");
                        $("#memberList div input").prop("type","button");
                        $("#memberList div input:eq("+ 2*j +")").prop("id","add"+i).val("+");
                        $("#memberList div input:eq("+ (2*j+1) +")").prop("id","trn"+i).val(">");
                        j++;
                    }
                    // 房主应该有转让房主和添加好友两个功能，先做好按钮接口，以后再实现
                    // 先是好友申请
                    $("#memberList div input:even").on("click", function() {
                        var buttonId = $(this).attr("id");
                        var memIndex = buttonId.substr(3);
                        console.log(memIndex);
                        addFriendHere(ID, memIndex);
                    })
                    // 再来转让房主
                    $("#memberList div input:odd").on("click", function() {
                        var buttonId = $(this).attr("id");
                        var memIndex = buttonId.substr(3);
                        console.log(memIndex);
                        transferOwner(ID, rId, memIndex);
                    })

                }
                else {
                    var j = 0;
                    for (var i in memberMap) {
                        $(".tmpBody").append("<div>" + memberMap[i].uname + " <input/></div>");
                        // $(".tmpBody div").prop("","");
                        $("#memberList div input:eq("+j+")").prop("id","add"+i);
                        $("#memberList div input").prop("type","button").val("+");
                        j++;
                    }
                    // 非房主成员应该在成员列表里面拥有一个添加好友的功能
                    // 依然是留下了按钮接口还没实现哈
                    $("#memberList div input").on("click", function() {
                        var buttonId = $(this).attr("id");
                        var memIndex = buttonId.substr(3);
                        console.log(memIndex);
                        addFriendHere(ID, memIndex);
                    })

                }
                
            }
        })
    })

    // 挑战列表或申请挑战
    $("#roomRightHead p:eq(2)").on("click", function() {
        chatting = false;
        $(".tmpBody").remove();
        $("#roomRightBody").append("<div></div>");
        $("#roomRightBody div").prop("class","tmpBody");
        $(".tmpBody").append("<div></div><div></div>");
        $(".tmpBody div:eq(0)").prop("id","chanllengeList");
        $(".tmpBody div:eq(1)").prop("id","chanllengeButtonDiv");
        $(".tmpBody div:eq(1)").append("<input/>");
        $(".tmpBody div:eq(1) input").prop("type","button").prop("id","challengeBtn").val("我也发起挑战");
        
        // 假的begin
        // for(var i=0;i<15;i++){
        //     $("#chanllengeList").append("<div>suneo <input/></div>");
        // }
        // $("#chanllengeList div input").prop("type","button");
        // 假的end

        var roomOwner;
        $.ajax({
            url:"http://localhost:8080/" + rId + "/getRoomInfo",
            type:"GET",
            async:true,
            contentType:"application/json; charset=utf-8",
            dataType : 'json',
            success:function(res){
                roomOwner = res.owner;
                console.log(res);
                var appliesMap = res.applies;
                var memberMap = res.members;
                if (res.owner == ID) {
                    var j = 0;
                    for (var i in appliesMap) {
                        $("#chanllengeList").append("<div>" + memberMap[appliesMap[i].applicant].uname + " <input/></div>");
                        $("#chanllengeList div input:eq("+ j +")").prop("id","pick" + i);
                        // $(".tmpBody").append("<div>" + memberMap[i].uname + " <input/> <input/></div>");
                        j++;
                    }
                    $("#chanllengeList div input").prop("type","button").val(" √ ");
                    $("#chanllengeList div input").on("click", function() {
                        var button_id = $(this).attr("id");
                        // console.log(button_id);
                        var aplIndex = button_id.substr(4);
                        // console.log(aplIndex);
                        // console.log(appliesMap[aplIndex]);
                        pickUpChallenge(rId, aplIndex);
                    })
                }
                else {
                    var j = 0;
                    for (var i in appliesMap) {
                        $("#chanllengeList").append("<div>" + memberMap[appliesMap[i].applicant].uname + "</div>");
                        j++;
                    }
                }
                
            }
        })

        $("#challengeBtn").on("click", function(){
            if (ID == roomOwner) {
                alert("您是房主 无需发起挑战");
            }
            else {
                // alert("挑战");
                var tmpData = {
                    "applicant":ID
                }

                $.ajax({
                    url:"http://localhost:8080/" + rId + "/postMatchApply",
                    type:"POST",
                    async:true,
                    contentType:"application/json; charset=utf-8",
                    data:JSON.stringify(tmpData),
                    dataType : 'json',
                    success:function(res){
                        if (res) {
                            alert("对局挑战发送成功 请刷新挑战申请列表");
                        }
                        else {
                            alert("对局挑战发送失败");
                        }
                    }
                })
            }
        })
    })

    return rcPolling;
}


// 房主接受某个挑战
function pickUpChallenge(rId, aplIndex) {
    console.log(rId, aplIndex);

    var tmpData = {
        "aplId":aplIndex
    }

    $.ajax({
        url:"http://localhost:8080/" + rId + "/acceptMatchApply",
        type:"PUT",
        async:true,
        contentType:"application/json; charset=utf-8",
        data:JSON.stringify(tmpData),
        dataType : 'json',
        success:function(res){
            if (res) {
                alert("您已经接受挑战");
            }
            else {
                alert("报错了...您可能正在对局中或申请人已经离开");
            }
        }
    })
}

// 这是转让房主哈
function transferOwner(ID, rId, memIndex) {
    console.log(ID, rId, memIndex);
    if(ID == memIndex) {
        alert("您已经是房主了 没必要再转让给自己");
    }
    else {
        var tmpData = {
            "uId":memIndex
        }

        $.ajax({
            url:"http://localhost:8080/" + rId + "/transferOwner",
            type:"PUT",
            async:true,
            contentType:"application/json; charset=utf-8",
            data:JSON.stringify(tmpData),
            dataType : 'json',
            success:function(res){
                if (res) {
                    alert("转让成功");
                }
                else {
                    alert("报错了...这个人可能已经离开了");
                }
            }
        })
    }
}

// 在成员列表处添加好友
function addFriendHere(ID, memIndex){
    console.log(ID, memIndex);
    if (ID == memIndex) {
        alert("不能添加自己为好友哦");
    }
    else{
        var tmpData = {
            "applicant":ID,
            "aplReceiver":memIndex
        }
        $.ajax({
            url:"http://localhost:8080/postFriendApply",    //接受post的位置
            type:"post",
            contentType:"application/json; charset=utf-8",
            data:JSON.stringify(tmpData),
            dataType : 'json',
            success:function(res){
                console.log(res);
                if(res){
                    alert("申请成功 等待对方确认");
                }
                else{
                    alert("申请失败 你们可能已经是好友了");
                }
            }
        })
    }
}

// 绘制左侧固定信息
function paintItemL(ID, rId) {
    $("#leftFrame").append("<div></div>");
    $("#leftFrame div").prop("class","tmp tmpLeft").prop("id","roomInfo");
    $("#leftFrame div").append("<p>房间基本信息</p><hr>");

    var roomOwner;
    var roomPlayer;
    var roomPassword;
    var tmpRes;
    $.ajax({
        url:"http://localhost:8080/" + rId + "/getRoomInfo",
        type:"GET",
        async:false,
        contentType:"application/json; charset=utf-8",
        dataType : 'json',
        success:function(res){
            console.log(res);
            tmpRes = res;
            var roomName = res.rname;
            var roomId = res.rid;
            roomOwner = res.owner;
            roomPlayer = res.player;
            roomPassword = res.rpwd;
            $("#leftFrame div").append("<p>房间名: " +roomName+ "</p><p>房间ID: " +roomId+"</p><br>");
        }
    })

    $("#leftFrame div").append("<p><input/><br><br>");
    $("#leftFrame input").prop("id","leaveRoom").prop("type","button").val("离 开 房 间");

    
    $("#leftFrame div").append("<span>房主: " +tmpRes.members[roomOwner].uname+ "</span>");
    if(roomPlayer != 0){
        $("#leftFrame div").append("<span>挑战者: " +tmpRes.members[roomPlayer].uname+"</span>");
    }
    else{
        $("#leftFrame div").append("<span>挑战者: 暂无</span>");
    }
    
    $("#leftFrame div").append("<span>密码: " +roomPassword+ "</span>");

    var leftPolling = setInterval(function() {
        $.ajax({
            url:"http://localhost:8080/" + rId + "/getRoomInfo",
            type:"GET",
            async:true,
            contentType:"application/json; charset=utf-8",
            dataType : 'json',
            success:function(res){
                if (res.owner != roomOwner || res.player != roomPlayer || res.rpwd != roomPassword) {
                    roomOwner = res.owner;
                    roomPlayer = res.player;
                    roomPassword = res.rpwd;
                    $("#leftFrame div span").remove();
                    // $("#leftFrame div").append("<span>房主: " +roomOwner+ "</span><span>挑战者: " +roomPlayer+"</span>");
                    $("#leftFrame div").append("<span>房主: " +res.members[roomOwner].uname+ "</span>");
                    if(roomPlayer != 0){
                        $("#leftFrame div").append("<span>挑战者: " +res.members[roomPlayer].uname+"</span>");
                    }
                    else{
                        $("#leftFrame div").append("<span>挑战者: 暂无</span>");
                    }
                    
                    $("#leftFrame div").append("<span>密码: " +roomPassword+ "</span>");
                    $("#leftFrame div span:eq(2)").prop("id","roomPwdChange");
                    $("#roomPwdChange").on("click", function() {
                        if (ID == roomOwner) {
                            // alert(2);
                            reviseRoomPwd(rId);
                        }
                        // alert(1);
                    })
                }
            }
        })
    },500);
    $("#leftFrame div span:eq(2)").prop("id","roomPwdChange");
    $("#roomPwdChange").on("click", function() {
        if (ID == roomOwner) {
            // alert(2);
            reviseRoomPwd(rId);
        }
        // alert(1);
    })

    return leftPolling;
}

// 离开房间时候告诉后端
function leaveRoom(ID, rId) {
    $.ajax({
        url:"http://localhost:8080/" + rId + "/leaveRoom?uId=" + ID,
        type:"delete",
        contentType:"application/json; charset=utf-8",
        dataType : 'json',
        success:function(res){
            console.log(res);
            if(res){
                // alert("成功");
            }
            else{
                alert("失败");
            }
        }
    })
}

// 房主修改房间密码
function reviseRoomPwd(rId) {
    // console.log("123");
    var roomNewPwd = prompt("请输入新的房间密码", "");
    if (roomNewPwd.length <= 20){
        $.ajax({
            url:"http://localhost:8080/" + rId + "/reviseRPwd?newRPwd=" + roomNewPwd,
            type:"PUT",
            async:false,
            contentType:"application/json; charset=utf-8",
            dataType : 'json',
            success:function(res){
                console.log(res);
                if(res) {
                    alert("修改成功");
                }
                else {
                    alert("修改失败");
                }
                
            }
        })
    }
    else {
        alert("密码太长了！！！");
    }
        
}

function paintItemC() {
    $("#mainFrame").append("<div></div>");
    $("#mainFrame div").prop("class","tmp tmpMain").prop("id","chessArea");
    $("#chessArea").append("<div></div><div></div>");
    $("#chessArea div:eq(0)").prop("id","chessButtonArea");
    $("#chessArea div:eq(1)").prop("id","chessBoxArea");

    // 棋盘的样子
    {
		table = document.createElement("table");
		table.classList.add("board");
		tBody = document.createElement("tBody");
        tBody.id = "_tBodyinuse";
		for(var i=0;i<9;i++){
			row = tBody.insertRow(i);
			for(var j=0;j<8;j++){
				cell = row.insertCell(j);
				if(i!=4){cell.classList.add("board")}
			}
		}
		table.style.position="absolute";
		table.style.top="30px";
		table.style.left="175px";
		table.appendChild(tBody);
        $("#chessBoxArea").append(table);
		// box.appendChild(table);
        
	}


    chessButtonPaint();
    //--------------------->生成实际在使用的表格
	(function(){
		table = document.createElement("table");
		tBody = document.createElement("tBody");
		for(var i=0;i<10;i++){
			row = tBody.insertRow(i);
			for(var j=0;j<9;j++){
				cell = row.insertCell(j);
				cell.setAttribute("data-x",j);
				cell.setAttribute("data-y",i);
				cell.addEventListener("click",clickBoard,false);
			}
		}
		table.appendChild(tBody);
        table.id = "_tableinuse";
		table.style.position="absolute";
		table.style.top="3px";
		table.style.left="147px";
        $("#chessBoxArea").append(table);
		// box.appendChild(table);
	})();
    
}


function chessButtonPaint() {
    $("#chessButtonArea").append("<p>● 悔 棋 ●</p><p>● 认 输 ●</p><p>● 求 和 ●</p><div>观 战 中 ...</div>");
    $("#chessButtonArea p:eq(0)").prop("id", "buttonRetract");
    $("#chessButtonArea p:eq(1)").prop("id", "buttonGiveUp");
    $("#chessButtonArea p:eq(2)").prop("id", "buttonDraw");
    $("#chessButtonArea div").prop("id", "chessWatchingTip");
}

