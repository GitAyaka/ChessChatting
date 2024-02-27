// 这个是个人中心所对应的脚本文件

function selfInfo(ID) {
    // alert("进入个人中心");
    $(".tmp").remove();

    $("#leftFrame").append("<div></div>");
    $("#leftFrame div").prop("class","tmp tmpLeft");
    $(".tmpLeft").append("<div>修 改 昵 称</div><hr><div>修 改 密 码</div><hr>");
    $(".tmpLeft").append("<div>本 人 信 息 查 询</div><hr><div>历 史 对 局 记 录</div><hr>");
    $(".tmpLeft div").prop("class","selfLeft");

    $(".selfLeft:eq(0)").on("click", function() {
        // alert("修改昵称");
        changeName(ID);
    })

    $(".selfLeft:eq(1)").on("click", function() {
        // alert("修改密码");
        changePwd(ID);
    })

    $(".selfLeft:eq(2)").on("click", function() {
        selfBasicInfo(ID);
    })

    $(".selfLeft:eq(3)").on("click", function() {
        historyGame(ID);
    })


    $("#rightFrame").append("<div></div>");
    $("#rightFrame div").prop("class","tmp tmpRight").prop("id","exitsys");
    $("#rightFrame div").append("<div><p>退 出</p><p>账 号</p></div>");

    $("#exitsys div").on("click", function() {
        exit(ID);
    })
}


// 修改用户名的函数
function changeName(ID) {
    // 移除旧的内容
    $(".tmpMain").remove();
    $(".tmpRight").remove();

    // 在right区域渲染新的内容
    $("#rightFrame").append("<div></div>");
    $("#rightFrame div").prop("class","tmp tmpRight").prop("id","changeNameTips");
    $("#rightFrame div").append("<br><p>提 示</p><hr><p>您在这里修改的是您的用户名</p><p>您的ID不可以修改</p>")

    // 在main区域渲染新的内容
    $("#mainFrame").append("<div></div>");
    $("#mainFrame div").prop("class","tmp tmpMain").prop("id","selfChange");
    $("#selfChange").append("<p>请在下方输入您的新用户名</p>").append("<input/><br>").append("<input/>");
    $("#selfChange input:eq(0)").prop("type","text").prop("placeholder","输入新用户名(小于20位)");
    $("#selfChange input:eq(0)").prop("class","inChange");
    $("#selfChange input:eq(1)").prop("type","button").val("提 交").prop("class","buttonChange");

    // 设置提交修改的按钮，绑定点击事件
    $("#selfChange input:eq(1)").on("click",function(){
        // alert("submit");
        var newName = $("#selfChange input:eq(0)").val();
        var tmpData = {
            "uId":ID,
            "uName":newName
        }
        // alert(newName);
        // alert(tmpData.uName);

        $.ajax({
            url:"http://localhost:8080/reviseUName",    //接受post的位置
            type:"put",
            contentType:"application/json; charset=utf-8",
            data:JSON.stringify(tmpData),
            // data : {
            //     uName : newName,
            // },
            dataType : 'json',
            beforeSend:function(){
                if(newName.length == 0){
                    alert("不能为空!");
                    return false;
                }
                if(newName.length > 20){
                    alert("不能超过20位!");
                    return false;
                }
                //设置该按钮为不可点击，防止用户重复点击
                // $("#subm").attr("disabled",true);  
            },
            success:function(res){
                console.log(res);
                if(res){
                    alert("修改成功");
                }
                else{
                    alert("修改失败");
                }
            }
        })
    })

}


// 修改密码的函数
function changePwd(ID) {
    // 移除旧的内容
    $(".tmpMain").remove();
    $(".tmpRight").remove();

    // 在right区域渲染新的内容
    $("#rightFrame").append("<div></div>");
    $("#rightFrame div").prop("class","tmp tmpRight").prop("id","changeNameTips");
    $("#rightFrame div").append("<br><p>提 示</p><hr><p>两次输入的密码需要相同</p>")

    //渲染新的内容
    $("#mainFrame").append("<div></div>");
    $("#mainFrame div").prop("class","tmp tmpMain").prop("id","selfChange");
    $("#selfChange").append("<p>请在下方输入您的新密码并确认</p>").append("<input/><br><input/><br><input/>");
    $("#selfChange input:eq(0)").prop("type","password").prop("placeholder","输入新密码(小于20位)");
    $("#selfChange input:eq(0)").prop("class","inChange");
    $("#selfChange input:eq(1)").prop("type","password").prop("placeholder","确认新密码(小于20位)");
    $("#selfChange input:eq(1)").prop("class","inChange");
    $("#selfChange input:eq(2)").prop("type","button").val("提 交").prop("class","buttonChange");

    $("#selfChange input:eq(2)").on("click",function(){
        // alert("submit");
        var newPwd1 = $("#selfChange input:eq(0)").val();
        var newPwd2 = $("#selfChange input:eq(1)").val();
        var pwdValid = false;
        // console.log(newPwd1);
        // console.log(newPwd2);

        if(newPwd1.length == 0 || newPwd2.length == 0) {
            alert("不能为空!");
        }
        else if(newPwd1.length > 20 || newPwd2.length > 20) {
            alert("不能超过20个字符!");
        }
        else{
            if(newPwd1 == newPwd2){
                pwdValid = true;
            }
            else{
                alert("两次输入的新密码要一致！");
            }
        }

        var tmpData2 = {
            "uId":ID,
            "uPwd":newPwd1
        }
        // alert(tmpData2.uPwd);
        // alert(pwdValid);

        if(pwdValid){
            $.ajax({
                url:"http://localhost:8080/reviseUPwd",    //接受post的位置
                type:"put",
                contentType:"application/json; charset=utf-8",
                data:JSON.stringify(tmpData2),
                // data : {
                //     uName : newName,
                // },
                dataType : 'json',
                beforeSend:function(){
                    
                },
                success:function(res){
                    console.log(res);
                    if(res){
                        alert("修改成功");
                    }
                    else{
                        alert("修改失败");
                    }
                }
            })
        }
    })
}

// 查询自己的基本信息
function selfBasicInfo(ID) {

    // 移除旧的内容
    $(".tmpMain").remove();
    $(".tmpRight").remove();

    // 在right区域渲染新的内容
    $("#rightFrame").append("<div></div>");
    $("#rightFrame div").prop("class","tmp tmpRight").prop("id","changeNameTips");
    $("#rightFrame div").append("<br><p>提 示</p><hr><p>在这里将展示</p><p>昵称与象棋对局情况</p>");

    var info;
    $.ajax({
        url:"http://localhost:8080/searchUserByUId?uId=" + ID,
        type:"GET",
        async:false,
        contentType:"application/json; charset=utf-8",
        dataType : 'json',
        success:function(res){
            console.log(res);
            info = res;
        }
    })

    //渲染新的内容
    $("#mainFrame").append("<div></div>");
    $("#mainFrame div").prop("class","tmp tmpMain").prop("id","selfBasicInfo");
    $("#selfBasicInfo").append("<p>您的个人信息及基本对局情况如下:</p><br>");
    $("#selfBasicInfo p").prop("id","selfBasicInfoTitle");
    $("#selfBasicInfo").append("<p>用户名 -> "+ info.uname +"</p>");
    $("#selfBasicInfo").append("<p>用户ID -> "+ info.uid +"</p>");
    $("#selfBasicInfo").append("<p>胜场数 -> "+ info.wins +"场</p>");
    $("#selfBasicInfo").append("<p>负场数 -> "+ info.loses +"场</p>");
    $("#selfBasicInfo").append("<p>平场数 -> "+ info.draws +"场</p>");
    $("#selfBasicInfo").append("<p>总场数 -> "+ info.total +"场</p>");
    $("#selfBasicInfo").append("<p>胜率 -> "+ info.winRate*100 +"%</p>");
    
}

// 查询自身的历史对局记录
function historyGame(ID){
    // 移除旧的内容
    $(".tmpMain").remove();
    $(".tmpRight").remove();

    // 在right区域渲染新的内容
    $("#rightFrame").append("<div></div>");
    $("#rightFrame div").prop("class","tmp tmpRight").prop("id","changeNameTips");
    $("#rightFrame div").append("<br><p>提 示</p><hr><p>在这里将展示</p><p>详细历史对局情况</p>");

    var history;
    $.ajax({
        url:"http://localhost:8080/"+ ID +"/getHistory",
        type:"GET",
        async:false,
        contentType:"application/json; charset=utf-8",
        dataType : 'json',
        success:function(res){
            history = res;
        }
    })

    console.log(history);

    //渲染新的内容
    $("#mainFrame").append("<div></div>");
    $("#mainFrame div").prop("class","tmp tmpMain").prop("id","historyGameList");
    $("#historyGameList").append("<p>您的历史对局情况展示如下:</p><br>");
    $("#historyGameList p").prop("id","historyGameListTitle");

    $("#historyGameList").append("<div></div>");
    $("#historyGameList div").prop("id","historyGameListTitle2");
    $("#historyGameListTitle2").append("<span>对局结果</span><span>对局时间</span>");
    $("#historyGameListTitle2").append("<span>对手ID</span><span>对手昵称</span>");

    $("#historyGameList").append("<div></div>");
    $("#historyGameList div:eq(1)").prop("id","historyGameListBox");
    $("#historyGameListBox").append("<table></table>");


    // 表头
    // $("#historyGameList div table").append("<th></th>");
    // $("#historyGameList th").append("<td>对局结果</td>");
    // $("#historyGameList th").append("<td> 对局时间 </td>");
    // $("#historyGameList th").append("<td> 对手ID </td>");
    // $("#historyGameList th").append("<td> 对手昵称 </td>");

    // 表格内容
    for(var i in history) {
        $("#historyGameList div table").append("<tr></tr>");
        if(history[i].res == 1){
            $("#historyGameList tr:eq("+ i +")").append("<td> 胜 </td>");
        }else{
            $("#historyGameList tr:eq("+ i +")").append("<td> 败 </td>");
        }
        $("#historyGameList tr:eq("+ i +")").append("<td>"+history[i].endTime.substring(0,10)+"</td>");
        $("#historyGameList tr:eq("+ i +")").append("<td>"+history[i].fae+"</td>");

        $.ajax({
            url:"http://localhost:8080/searchUserByUId?uId=" + history[i].fae,
            type:"GET",
            async:false,
            contentType:"application/json; charset=utf-8",
            dataType : 'json',
            success:function(res){
                $("#historyGameList tr:eq("+ i +")").append("<td>"+res.uname+"</td>");
            }
        })
    }

}

// 退出登录
function exit(ID){

    var user;

    $.ajax({
        url:"http://localhost:8080/searchUserByUId?uId=" + ID,
        type:"GET",
        async:false,
        contentType:"application/json; charset=utf-8",
        dataType : 'json',
        success:function(res){
            user = res;
        }
    })

    $.ajax({
        url:"http://localhost:8080/exit",
        type:"PUT",
        async:false,
        contentType:"application/json; charset=utf-8",
        data:JSON.stringify(user),
        dataType : 'json',
        success:function(){
            // window.location.assign("./login.html");
            // console.log(res);
            // if(res) {
            //     window.location.assign("./login.html");
            // }
            // else {
            //     alert("退出登录失败!!! 😅")
            // }
        }
    })

    window.location.assign("./login.html");
}