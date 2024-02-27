// 发送消息
function rcSendMsg(ID, rId, imsg){
    console.log(ID, rId, imsg);
    var selfStr = localStorage.getItem("self"+ID);
    var selfJSON = JSON.parse(selfStr);
    console.log(selfJSON);
    var usrName = selfJSON.uname;
    console.log(usrName);
    var msg = usrName + ": " + imsg;

    var tmpMsg = {
        "sender":ID,
        "msg":msg
    }
    console.log(tmpMsg);

    $.ajax({
        url:"http://localhost:8080/" + rId + "/sendMsg",
        type:"POST",
        contentType:"application/json; charset=utf-8",
        data:JSON.stringify(tmpMsg),
        dataType : 'json',
        success:function(res){
            console.log(res);
            if(res) {
                // alert("发送成功");
                $("#itext").val("");
            }
            else {
                alert("发送失败");
            }
        }
    })
}

// 接受消息写到room.js文件里面了