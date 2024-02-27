var rId;
var roomObj1;
var winner1;
var preRoomObj1;
var victory = 0 ;
function roomChessBasic(ID, preRoomObj, roomObj) {
    var selfStr = localStorage.getItem("self"+ID);
    var selfObj = JSON.parse(selfStr);
    console.log(selfObj);
    console.log(roomObj);
    var resStr = JSON.stringify(roomObj1);
    preRoomObj1 = preRoomObj;
    var preResStr = JSON.stringify(preRoomObj1);
    rId = roomObj.rid;
    console.log(112223);
    console.log(preRoomObj);
    console.log(JSON.stringify(preRoomObj).length);
    roomObj1 = roomObj;
    if(ID == roomObj.owner)
    {
        

        if(ID == preRoomObj.owner)
        {
            if(chessboard.turn ==false){$("#chessButtonArea p:eq(0)").unbind("click").bind("click",function(){

                console.log("鸡你太美");
                var user =
                {
                    uId : ID
                }
                $.ajax({
                    url:"http://localhost:8080/" + rId +"/postRepentance",
                    type:"POST",
                    async:false,
                    contentType:"application/json; charset=utf-8",
                    data:JSON.stringify(user),
                    dataType : 'json',
                    success:function(res){
                        console.log("蔡徐坤");
                        $("#chessButtonArea p:eq(0)").css("disabled","true");
                    }
                })

            });}
            $("#chessButtonArea p:eq(1)").unbind("click").bind("click",function(){
                // $("#chessButtonArea p:eq(1)").prop("onclick",null);
                // $("#chessButtonArea p:eq(0)").css("visibility","hidden");
                // $("#chessButtonArea p:eq(1)").css("visibility","hidden");
                // $("#chessButtonArea p:eq(2)").css("visibility","hidden");
                var user =
                {
                    uId : ID
                }
                $.ajax({
                    url:"http://localhost:8080/" + rId +"/postSurrender",
                    type:"POST",
                    async:false,
                    contentType:"application/json; charset=utf-8",
                    data:JSON.stringify(user),
                    dataType : 'json',
                    success:function(res){
                        chessboard.gameOver(false);
                    }
                })

            });
            $("#chessButtonArea p:eq(2)").unbind("click").bind("click",function(){
                // $("#chessButtonArea p:eq(1)").prop("onclick",null);
                // $("#chessButtonArea p:eq(0)").css("visibility","hidden");
                // $("#chessButtonArea p:eq(1)").css("visibility","hidden");
                // $("#chessButtonArea p:eq(2)").css("visibility","hidden");
                var user =
                {
                    uId : ID
                }
                $.ajax({
                    url:"http://localhost:8080/" + rId +"/postDraw",
                    type:"POST",
                    async:false,
                    contentType:"application/json; charset=utf-8",
                    data:JSON.stringify(user),
                    dataType : 'json',
                    success:function(res){
                        $("#chessButtonArea p:eq(2)").css("disabled","true");
                    }
                })

            });
            // if(roomObj.drawApplicant==roomObj.player&&roomObj.roomState==1&&preRoomObj.drawApplicant!=roomObj.owner)
            if(roomObj.drawApplicant==roomObj.player&&roomObj.roomState==1&&roomObj.player!=0)
            {
                var msg = "对方请求平局";
                if(window.confirm(msg)==true)
                {
                    var user =
                {
                    uId : ID
                }
                $.ajax({
                    url:"http://localhost:8080/" + rId +"/acceptDraw",
                    type:"PUT",
                    async:false,
                    contentType:"application/json; charset=utf-8",
                    data:JSON.stringify(user),
                    dataType : 'json',
                    success:function(res){
                        chessboard.gameOver(-1);
                    }
                })
                }else{
                    var user =
                    {
                        uId : ID
                    }
                    $.ajax({
                        url:"http://localhost:8080/" + rId +"/rejectDraw",
                        type:"PUT",
                        async:false,
                        contentType:"application/json; charset=utf-8",
                        data:JSON.stringify(user),
                        dataType : 'json',
                        success:function(res){
                            
                        }
                    })
                
                }

            }
            if(roomObj.roomState==1&&roomObj.repentanceApplicant==roomObj.player&&roomObj.player!=0)
            {
                var msg = "对方请求悔棋";
                if(window.confirm(msg)==true)
                {
                    var user =
                {
                    uId : roomObj.rID
                }
                $.ajax({
                    url:"http://localhost:8080/" + rId +"/acceptRepentance",
                    type:"PUT",
                    async:false,
                    contentType:"application/json; charset=utf-8",
                    data:JSON.stringify(user),
                    dataType : 'json',
                    success:function(res){
                        $("#_tableinuse td div").remove();
                        chessboard.init1(roomObj.chessBoard);
                    }
                })
                }else 
                {
                    var user =
                    {
                        uId : roomObj.rID
                    }
                    console.log("jinitaimeimei");
                    $.ajax({
                        url:"http://localhost:8080/" + rId +"/rejectRepentance",
                        type:"PUT",
                        async:false,
                        contentType:"application/json; charset=utf-8",
                        data:JSON.stringify(user),
                        dataType : 'json',
                        success:function(res){
                            
                        }
                    })
                    console.log("jinitaimeimeimei");
                }
            }
            if(roomObj.roomState==1&&preRoomObj.drawApplicant==ID&&roomObj.drawApplicant==-1)
            {
                chessboard.gameOver(-1);
            }
            if(roomObj.roomState==1&&preRoomObj.drawApplicant==ID&&roomObj.drawApplicant==1&&roomObj.player!=0)
            {
                alert("对方拒绝了你的求和请求");
                $("#chessButtonArea p:eq(2)").css("disabled","false");
            }
            if(roomObj.surrenderApplicant==roomObj.player&&roomObj.roomState==1&&roomObj.player!=0)
            {
                chessboard.gameOver(true);
            }
            // if(roomObj.roomState==1&&preRoomObj.repentanceApplicant!=0&&roomObj.repentanceApplicant==0&&preRoomObj.roomState==1&&preRoomObj.player!=0&&roomObj.player!=0)
            if(preRoomObj.repentanceApplicant==ID&&roomObj.repentanceApplicant==1&&roomObj.player!=0)
            {
                $("#_tableinuse td div").remove();
                $("#chessButtonArea p:eq(0)").css("disabled","false");
                chessboard.init1(roomObj.chessBoard);
                console.log("18329840");
            }
            if(preRoomObj.repentanceApplicant==ID&&roomObj.repentanceApplicant==-1&&roomObj.player!=0)
            {
                alert("对方拒绝了你的悔棋请求");
                $("#chessButtonArea p:eq(0)").css("disabled","false");
            }
            // if(preRoomObj.drawApplicant==preRoomObj.owner&&roomObj.drawApplicant==0&&roomObj.roomState==1&&preRoomObj.roomState==1)
            // {
            //     alert("对方拒绝了你的求和请求");
            // }
            // if(preRoomObj.roomState==true&&roomObj.roomState==false&&chessboard.status==true)
            //     {
            //         chessboard.gameOver(true);
            //     }
            if(preRoomObj.chessBoard != roomObj.chessBoard)
            {
                
                $("#_tableinuse td div").remove();
                chessboard.init1(roomObj.chessBoard);
                $("#chessButtonArea p:eq(0)").css("visibility","visible");
                $("#chessButtonArea p:eq(1)").css("visibility","visible");
                $("#chessButtonArea p:eq(2)").css("visibility","visible");
                 // for(var i=0;i<32;i++)
                // {
                //     if(preRoomObj.chessBoard[i].xpos != roomObj.chessBoard[i].xpos || preRoomObj.chessBoard[i].ypos != roomObj.chessBoard[i].ypos)
                //     {
                //         chessboard.pieces[preRoomObj.chessBoard[i].xpos][preRoomObj.chessBoard[i].ypos].move(roomObj.chessBoard[i].xpos,roomObj.chessBoard[i].ypos);
                //     }
                // }
            }
        }
        if(ID != preRoomObj.owner && ID != preRoomObj.player)
        {
        
        }
        if(preRoomObj.player != roomObj.player&& (preRoomObj1.player== null||preRoomObj1.player == 0)&&JSON.stringify(preRoomObj).length != 2)
        // && (preRoomObj1.player== null||preRoomObj1.player == 0)
        // && JSON.stringify(preRoomObj).length != 2
        {
            chessboard.init();
            $("#chessButtonArea p:eq(0)").css("visibility","visible");
            $("#chessButtonArea p:eq(1)").css("visibility","visible");
            $("#chessButtonArea p:eq(2)").css("visibility","visible");
            // $("#chessButtonArea p:eq(0)").bind("click",);
            // $("#chessButtonArea").find('p[1]').on("click",function(){chessboard.gameOver(true)});
            // $("#chessButtonArea p:eq(2)").bind("click",gameOver(false));

        }
        if(roomObj.player==0)
        {
            $("#chessButtonArea p:eq(0)").css("visibility","hidden");
            $("#chessButtonArea p:eq(1)").css("visibility","hidden");
            $("#chessButtonArea p:eq(2)").css("visibility","hidden");
            chessboard.status=false;
        }

    }










    if(ID == roomObj.player)
    {
        $("#chessButtonArea div").css("visibility","hidden");
        $("#chessButtonArea p:eq(0)").css("visibility","visible");
        $("#chessButtonArea p:eq(1)").css("visibility","visible");
        $("#chessButtonArea p:eq(2)").css("visibility","visible");


        if(ID == preRoomObj.player)
        {
            if(chessboard.turn==true){$("#chessButtonArea p:eq(0)").unbind("click").bind("click",function(){

                console.log("鸡你太美");
                var user =
                {
                    uId : ID
                }
                $.ajax({
                    url:"http://localhost:8080/" + rId +"/postRepentance",
                    type:"POST",
                    async:false,
                    contentType:"application/json; charset=utf-8",
                    data:JSON.stringify(user),
                    dataType : 'json',
                    success:function(res){
                        console.log("蔡徐坤");
                        $("#chessButtonArea p:eq(0)").css("disabled","true");
                    }
                })

            });}
            $("#chessButtonArea p:eq(1)").unbind("click").bind("click",function(){
                // $("#chessButtonArea p:eq(1)").prop("onclick",null);
                // $("#chessButtonArea p:eq(0)").css("visibility","hidden");
                // $("#chessButtonArea p:eq(1)").css("visibility","hidden");
                // $("#chessButtonArea p:eq(2)").css("visibility","hidden");
                var user =
                {
                    uId : ID
                }
                $.ajax({
                    url:"http://localhost:8080/" + rId +"/postSurrender",
                    type:"POST",
                    async:false,
                    contentType:"application/json; charset=utf-8",
                    data:JSON.stringify(user),
                    dataType : 'json',
                    success:function(res){
                        chessboard.gameOver(true);
                    }
                })

            });
            $("#chessButtonArea p:eq(2)").unbind("click").bind("click",function(){
                // $("#chessButtonArea p:eq(1)").prop("onclick",null);
                // $("#chessButtonArea p:eq(0)").css("visibility","hidden");
                // $("#chessButtonArea p:eq(1)").css("visibility","hidden");
                // $("#chessButtonArea p:eq(2)").css("visibility","hidden");
                var user =
                {
                    uId : ID
                }
                $.ajax({
                    url:"http://localhost:8080/" + rId +"/postDraw",
                    type:"POST",
                    async:false,
                    contentType:"application/json; charset=utf-8",
                    data:JSON.stringify(user),
                    dataType : 'json',
                    success:function(res){
                        
                        $("#chessButtonArea p:eq(2)").css("disabled","true");
                    }
                })

            });
            // if(roomObj.drawApplicant==roomObj.owner&&roomObj.roomState==1&&preRoomObj.drawApplicant!=roomObj.player)
            if(roomObj.roomState==1&&roomObj.drawApplicant==roomObj.owner&&roomObj.player!=0)
            {
                var msg = "对方请求平局";
                if(window.confirm(msg)==true)
                {
                    var user =
                {
                    uId : roomObj.rID
                }
                $.ajax({
                    url:"http://localhost:8080/" + rId +"/acceptDraw",
                    type:"PUT",
                    async:false,
                    contentType:"application/json; charset=utf-8",
                    data:JSON.stringify(user),
                    dataType : 'json',
                    success:function(res){
                        chessboard.gameOver(-1);
                    }
                })
                }else 
                {
                    var user =
                    {
                        uId : roomObj.rID
                    }
                    console.log("jinitaimeimei");
                    $.ajax({
                        url:"http://localhost:8080/" + rId +"/rejectDraw",
                        type:"PUT",
                        async:false,
                        contentType:"application/json; charset=utf-8",
                        data:JSON.stringify(user),
                        dataType : 'json',
                        success:function(res){
                            
                        }
                    })
                    console.log("jinitaimeimeimei");
                }

            }

            if(roomObj.roomState==1&&roomObj.repentanceApplicant==roomObj.owner)
            {
                var msg = "对方请求悔棋";
                if(window.confirm(msg)==true)
                {
                    var user =
                {
                    uId : ID
                }
                $.ajax({
                    url:"http://localhost:8080/" + rId +"/acceptRepentance",
                    type:"PUT",
                    async:false,
                    contentType:"application/json; charset=utf-8",
                    data:JSON.stringify(user),
                    dataType : 'json',
                    success:function(res){
                        $("#_tableinuse td div").remove();
                        chessboard.init1(roomObj.chessBoard);
                    }
                })
                }else 
                {
                    var user =
                    {
                        uId : ID
                    }
                    console.log("jinitaimeimei");
                    $.ajax({
                        url:"http://localhost:8080/" + rId +"/rejectRepentance",
                        type:"PUT",
                        async:false,
                        contentType:"application/json; charset=utf-8",
                        data:JSON.stringify(user),
                        dataType : 'json',
                        success:function(res){
                            
                        }
                    })
                    console.log("jinitaimeimeimei");
                }
            }
            if(roomObj.roomState==1&&preRoomObj.drawApplicant==ID&&roomObj.drawApplicant==-1)
            {
                chessboard.gameOver(-1);
            }
            if(roomObj.roomState==1&&preRoomObj.drawApplicant==ID&&roomObj.drawApplicant==1)
            {
                alert("对方拒绝了你的求和请求");
                $("#chessButtonArea p:eq(2)").css("disabled","false");
            }
            if(preRoomObj.repentanceApplicant==ID&&roomObj.repentanceApplicant==-1)
            {
                alert("对方拒绝了你的悔棋请求");
                $("#chessButtonArea p:eq(0)").css("disabled","false");
            }
            // if(roomObj.roomState==1&&preRoomObj.repentanceApplicant!=roomObj.repentanceApplicant&&preRoomObj.repentanceApplicant!=0&&roomObj.repentanceApplicant==0&&preRoomObj.roomState==0)
            if(preRoomObj.repentanceApplicant==ID&&roomObj.repentanceApplicant==1)
            {
                $("#chessButtonArea p:eq(0)").css("disabled","false");
                $("#_tableinuse td div").remove();
                chessboard.init1(roomObj.chessBoard);
            }
            // if(preRoomObj.drawApplicant==preRoomObj.player&&roomObj.drawApplicant==0&&roomObj.roomState==1&&preRoomObj.roomState==1)
            // {
            //     alert("对方拒绝了你的求和请求");
            // }
            $("#chessButtonArea p:eq(2)").unbind("click").bind("click",function(){
                // $("#chessButtonArea p:eq(1)").prop("onclick",null);
                // $("#chessButtonArea p:eq(0)").css("visibility","hidden");
                // $("#chessButtonArea p:eq(1)").css("visibility","hidden");
                // $("#chessButtonArea p:eq(2)").css("visibility","hidden");
                var user =
                {
                    uId : ID
                }
                $.ajax({
                    url:"http://localhost:8080/" + rId +"/postDraw",
                    type:"POST",
                    async:false,
                    contentType:"application/json; charset=utf-8",
                    data:JSON.stringify(user),
                    dataType : 'json',
                    success:function(res){
                        
                    }
                })

            });
            // if(roomObj.surrenderApplicant==roomObj.player&&roomObj.roomState==1)
            // {
            //     chessboard.gameOver(false);
            // }
            if(preRoomObj.chessBoard != roomObj.chessBoard)

            {
                $("#_tableinuse td div").remove();
                chessboard.init1(roomObj.chessBoard);
                chessboard.changeTurn();
                // for(var i=0;i<32;i++)
                // {
                //     if(preRoomObj.chessBoard[i].xpos != roomObj.chessBoard[i].xpos || preRoomObj.chessBoard[i].ypos != roomObj.chessBoard[i].ypos)
                //     {
                //         chessboard.pieces[preRoomObj.chessBoard[i].xpos][preRoomObj.chessBoard[i].ypos].move(roomObj.chessBoard[i].xpos,roomObj.chessBoard[i].ypos);
                //     }
                // }
            }
            console.log(2032508406);
            // if(preRoomObj.roomState==1&&roomObj.roomState==0&&chessboard.status == true)
            //     {
            //         chessboard.gameOver(false);
            //         console(2032508405);
            //     }
        }
        if(ID != preRoomObj.owner && ID != preRoomObj.player)
        {
            initBoard(rId);
            chessboard.init();
            console.log(2020202020);
            // $("#chessButtonArea").find('p[1]').on("click",function(){chessboard.gameOver(false)});
        }

    }










    if(ID != roomObj.owner && ID != roomObj.player && preRoomObj.memberCount == roomObj.memberCount)
    {
        if(ID == preRoomObj.player)
        {
            $("#chessButtonArea p:eq(0)").css("visibility","hidden");
            $("#chessButtonArea p:eq(1)").css("visibility","hidden");
            $("#chessButtonArea p:eq(2)").css("visibility","hidden");
        }
        if(preRoomObj.player != roomObj.player && roomObj.player != 0){
            chessboard.init();
            $("#chessButtonArea div").css("visibility","visible");
            $("#chessButtonArea p:eq(0)").css("visibility","hidden");
            $("#chessButtonArea p:eq(1)").css("visibility","hidden");
            $("#chessButtonArea p:eq(2)").css("visibility","hidden");

        }
        // if(preRoomObj.roomState==true&&roomObj.roomState==false&&chessboard.status==true)
        // {
        //     chessboard.gameOver(true);

        // }
        // if(preRoomObj.roomState==true&& roomObj.roomState==false&&chessboard.status==true)
        // {
        //     chessboard.gameOver(false);

        // }
        if(preRoomObj.surrenderApplicant==preRoomObj.owner&&roomObj.roomState==0&&preRoomObj.roomState==1&&ID == preRoomObj.player)
        {
            chessboard.gameOver(false);
        }
        if(preRoomObj.surrenderApplicant==preRoomObj.owner&&roomObj.roomState==0&&preRoomObj.roomState==1&&ID != preRoomObj.player)
        {
            chessboard.gameOver(false);
        }
        if(preRoomObj.surrenderApplicant==preRoomObj.player&&roomObj.roomState==0&&preRoomObj.roomState==1&&ID != preRoomObj.player)
        {
            chessboard.gameOver(true);
        }
        if(roomObj.roomState==1&&(preRoomObj.drawApplicant==preRoomObj.owner||preRoomObj.drawApplicant==preRoomObj.player)&&roomObj.drawApplicant==-1)
        {
            chessboard.gameOver(-1);
        }
        if(preRoomObj.chessBoard != roomObj.chessBoard){

        $("#_tableinuse td div").remove();
        chessboard.init1(roomObj.chessBoard);}
        
        
    }

    if(ID != roomObj.owner && ID != roomObj.player && preRoomObj=='' &&roomObj.roomState==1)
    {
        // console.log("wdad");

        chessboard.init1(roomObj1.chessBoard);
        $("#chessButtonArea div").css("visibility","visible");
    }
    // if(ID != roomObj.owner && ID != roomObj.player && roomObj1.roomStatus == 0 )
    // {
    //     // console.log("wdad");
    //     chessboard.init1(roomObj1.chessBoard);
    // }
}










function initBoard(rId) {
    $.ajax({
        url:"http://localhost:8080/" + rId +"/initBoard",
        type:"POST",
        async:false,
        contentType:"application/json; charset=utf-8",
        dataType : 'json',
        success:function(res){
            if(res){
                console.log("init success");
            }else{
                console.log("init fail");
            }
        }
    })


}
function clickBoard(event){
    if(chessboard.status){
        if(chessboard.curPiece && ((chessboard.turn == true && ID == roomObj1.owner)||(chessboard.turn == false && ID == roomObj1.player))){
            var x = parseInt(this.getAttribute("data-x"));
            var y = parseInt(this.getAttribute("data-y"));
            // if(checkEnemy(x,y)&& chessboard.curPiece.check(x,y))
            // {
            //     var move = {
            //         cId : chessboard.pieces[x][y].ID-1,
            //         // xPos : x,
            //         // yPos : y,
            //         newXPos : x,
            //         newYPos : y,
            //         kill : true
            //     }
            //     $.ajax({
            //         url:"http://localhost:8080/" + rId + "/move",
            //         type:"PUT",
            //         async:false,
            //         contentType:"application/json; charset=utf-8",
            //         data:JSON.stringify(move),
            //         dataType : 'json',
            //         beforeSend:function(){
            //             console.log(move);
            //         },
            //         success:function(res){
                    
            //         }
            //     })

            // }

            //尝试移动棋子
            if(!checkTeamMate(x,y)&& chessboard.curPiece.check(x,y))
            {
                
                            var move ={
                cId : chessboard.curPiece.ID-1,
                xPos : chessboard.curPiece.positionX,
                yPos : chessboard.curPiece.positionY,
                newXPos : x,
                newYPos : y,
            }
                $.ajax({
                url:"http://localhost:8080/" + rId + "/move",
                type:"PUT",
                async:false,
                contentType:"application/json; charset=utf-8",
                data:JSON.stringify(move),
                dataType : 'json',
                beforeSend:function(){
                    console.log(move);
                },
                success:function(res){
                if(res)
                {
                    
                    $.ajax({
                        url:"http://localhost:8080/" + rId + "/getRoomInfo",
                        type:"GET",
                        async:false,
                        contentType:"application/json; charset=utf-8",
                        dataType : 'json',
                        success:function(res){
                            console.log(res.chessBoard[0].xpos);
                            console.log(1212, res);
                            // 
                        }
                    })
                    chessboard.curPiece.move(x,y);
                    chessboard.curPiece = chessboard.pieces[x][y];
                    chessboard.curPiece.piece.style.backgroundColor="white";
                    chessboard.curPiece=null;
                }
                }
            })}
           

        }
        event.stopPropagation();
    }else{
        //游戏结束，什么也不做
        event.stopPropagation();//阻止冒泡事件，因为冒泡也没有意义
    }
    
}

function choosePiece(event){
    if(chessboard.status){
        if(chessboard.turn == !!this.getAttribute("data-team") && !chessboard.curPiece&&((chessboard.turn == true && ID == roomObj1.owner)||(chessboard.turn == false && ID == roomObj1.player))){
            // &&((chessboard.turn == true && ID == roomObj.owner)||(chessboard.turn == false && ID == roomObj.player))
        
            var x = parseInt(this.parentNode.getAttribute("data-x"));
            var y = parseInt(this.parentNode.getAttribute("data-y"));
            //选中棋子
            chessboard.curPiece = chessboard.pieces[x][y];
            
            chessboard.curPiece.piece.style.backgroundColor="#B0E0E6";
            
            //阻止冒泡事件
            //因为点击键盘事件是移动棋子位置事件，当前没有选中棋子，自然就不需要冒泡了
            event.stopPropagation();
        }
    }else{
        //游戏结束，什么也不做
        event.stopPropagation();//阻止冒泡事件，因为冒泡也没有意义
    }
    
}

//取消选中棋子
window.addEventListener("click",function(event){
    if(chessboard.status){
        if(chessboard.curPiece){
            chessboard.curPiece.piece.style.backgroundColor="white";
            chessboard.curPiece=null;
            console.log(2020202020202020220202020);
        }
    }else{
        //游戏结束，什么也不做
    }
    
},false);

//棋盘
chessboard = {
    init:function(){
        for(i=0;i<9;i++){this.pieces[i]=[]; } 
        if(this.copyPieces){
        
            //直接拷贝this.copyPieces即可
            for(var i=0;i<9;i++){
                if(this.copyPieces[i]){
                    for(var j=0;j<10;j++){
                        this.pieces[i][j]=this.copyPieces[i][j];
                        this.pieces1[i][j]=this.copyPieces[i][j];//用于保存一步以后的棋子布局
                        if(table.rows[j].cells[i].childNodes.length){
                            
                            for(var l=0;l<table.rows[j].cells[i].childNodes.length;l++){
                                table.rows[j].cells[i].removeChild(table.rows[j].cells[i].childNodes[l]);
                            }
                        }
                        if(this.pieces[i][j]){
                            table.rows[j].cells[i].appendChild(this.pieces[i][j].piece);//棋盘放上棋子
                            this.pieces[i][j].positionX=i;//设置x轴
                            this.pieces[i][j].positionY=j;//设置y轴
                        }
                    }
                }
            }
        }else{
            //第一次运行，自己创建所有棋子
            {
                //红棋
                this.pieces[0][9] = new Car(24,0,9,true);
                this.pieces[1][9] = new Horse(25,1,9,true);
                this.pieces[1][7] = new Cannon(22,1,7,true);
                this.pieces[2][9] = new Elephant(26,2,9,true,"相");
                this.pieces[3][9] = new Bodyguards(27,3,9,true);
                this.pieces[4][9] = new Boss(28,4,9,true,"帅");
                this.redBoss=this.pieces[4][9];
                this.pieces[5][9] = new Bodyguards(29,5,9,true);
                this.pieces[6][9] = new Elephant(30,6,9,true,"相");
                this.pieces[7][7] = new Cannon(23,7,7,true);
                this.pieces[7][9] = new Horse(31,7,9,true);
                this.pieces[8][9] = new Car(32,8,9,true);
                
                this.pieces[0][6] = new Soldier(17,0,6,true,"兵");
                this.pieces[2][6] = new Soldier(18,2,6,true,"兵");
                this.pieces[4][6] = new Soldier(19,4,6,true,"兵");
                this.pieces[6][6] = new Soldier(20,6,6,true,"兵");
                this.pieces[8][6] = new Soldier(21,8,6,true,"兵");
                
                //黑棋
                this.pieces[0][0] = new Car(1,0,0,false);
                this.pieces[1][0] = new Horse(2,1,0,false);
                this.pieces[1][2] = new Cannon(10,1,2,false);
                this.pieces[2][0] = new Elephant(3,2,0,false,"象");
                this.pieces[3][0] = new Bodyguards(4,3,0,false);
                this.pieces[4][0] = new Boss(5,4,0,false,"将");
                this.greenBoss=this.pieces[4][0];
                this.pieces[5][0] = new Bodyguards(6,5,0,false);
                this.pieces[6][0] = new Elephant(7,6,0,false,"象");
                this.pieces[7][2] = new Cannon(11,7,2,false);
                this.pieces[7][0] = new Horse(8,7,0,false);
                this.pieces[8][0] = new Car(9,8,0,false);
                
                this.pieces[0][3] = new Soldier(12,0,3,false,"卒");
                this.pieces[2][3] = new Soldier(13,2,3,false,"卒");
                this.pieces[4][3] = new Soldier(14,4,3,false,"卒");
                this.pieces[6][3] = new Soldier(15,6,3,false,"卒");
                this.pieces[8][3] = new Soldier(16,8,3,false,"卒");
            }
            
            this.copyPieces=[];
            for(var i=0;i<9;i++){
                if(this.pieces[i]){
                    this.copyPieces[i]=[]; 
                    for(var j=0;j<10;j++){
                        this.copyPieces[i][j]=this.pieces[i][j];
                        this.pieces1[i][j]=this.pieces[i][j];
                    }
                }
            }
            
            //绑定事件单击
            var divs = document.getElementsByClassName("pieces");
            for(var i=0;i<divs.length;i++){divs[i].addEventListener("click",choosePiece,false);}
        }
        this.status = true;
        this.turn = true;
        
    },

    init1:function(chessBoard){
        for(i=0;i<9;i++){this.pieces[i]=[]; } 
        // if(this.copyPieces){
        
        //     //直接拷贝this.copyPieces即可
        //     for(var i=0;i<9;i++){
        //         if(this.copyPieces[i]){
        //             for(var j=0;j<10;j++){
        //                 this.pieces[i][j]=this.copyPieces[i][j];
        //                 this.pieces1[i][j]=this.copyPieces[i][j];//用于保存一步以后的棋子布局
        //                 if(table.rows[j].cells[i].childNodes.length){
                            
        //                     for(var l=0;l<table.rows[j].cells[i].childNodes.length;l++){
        //                         table.rows[j].cells[i].removeChild(table.rows[j].cells[i].childNodes[l]);
        //                     }
        //                 }
        //                 if(this.pieces[i][j]){
        //                     table.rows[j].cells[i].appendChild(this.pieces[i][j].piece);//棋盘放上棋子
        //                     this.pieces[i][j].positionX=i;//设置x轴
        //                     this.pieces[i][j].positionY=j;//设置y轴
        //                 }
        //             }
        //         }
        //     }
        // }else{
           { //第一次运行，自己创建所有棋子
            {
                if(chessBoard[23].alive)this.pieces[chessBoard[23].xpos][chessBoard[23].ypos] = new Car(24,chessBoard[23].xpos,chessBoard[23].ypos,true);
                if(chessBoard[24].alive)this.pieces[chessBoard[24].xpos][chessBoard[24].ypos] = new Horse(25,chessBoard[24].xpos,chessBoard[24].ypos,true);
                if(chessBoard[21].alive)this.pieces[chessBoard[21].xpos][chessBoard[21].ypos] = new Cannon(22,chessBoard[21].xpos,chessBoard[21].ypos,true);
                if(chessBoard[25].alive)this.pieces[chessBoard[25].xpos][chessBoard[25].ypos] = new Elephant(26,chessBoard[25].xpos,chessBoard[25].ypos,true,"相");
                if(chessBoard[26].alive)this.pieces[chessBoard[26].xpos][chessBoard[26].ypos] = new Bodyguards(27,chessBoard[26].xpos,chessBoard[26].ypos,true);
                if(chessBoard[27].alive)this.pieces[chessBoard[27].xpos][chessBoard[27].ypos] = new Boss(28,chessBoard[27].xpos,chessBoard[27].ypos,true,"帅");
                this.redBoss=this.pieces[chessBoard[27].xpos][chessBoard[27].ypos];
                if(chessBoard[28].alive)this.pieces[chessBoard[28].xpos][chessBoard[28].ypos] = new Bodyguards(29,chessBoard[28].xpos,chessBoard[28].ypos,true);
                if(chessBoard[29].alive)this.pieces[chessBoard[29].xpos][chessBoard[29].ypos] = new Elephant(30,chessBoard[29].xpos,chessBoard[29].ypos,true,"相");
                if(chessBoard[22].alive)this.pieces[chessBoard[22].xpos][chessBoard[22].ypos] = new Cannon(23,chessBoard[22].xpos,chessBoard[22].ypos,true);
                if(chessBoard[20].alive)this.pieces[chessBoard[30].xpos][chessBoard[30].ypos] = new Horse(31,chessBoard[30].xpos,chessBoard[30].ypos,true);
                if(chessBoard[31].alive)this.pieces[chessBoard[31].xpos][chessBoard[31].ypos] = new Car(32,chessBoard[31].xpos,chessBoard[31].ypos,true);
                
                if(chessBoard[16].alive)this.pieces[chessBoard[16].xpos][chessBoard[16].ypos] = new Soldier(17,chessBoard[16].xpos,chessBoard[16].ypos,true,"兵");
                if(chessBoard[17].alive)this.pieces[chessBoard[17].xpos][chessBoard[17].ypos] = new Soldier(18,chessBoard[17].xpos,chessBoard[17].ypos,true,"兵");
                if(chessBoard[18].alive)this.pieces[chessBoard[18].xpos][chessBoard[18].ypos] = new Soldier(19,chessBoard[18].xpos,chessBoard[18].ypos,true,"兵");
                if(chessBoard[19].alive)this.pieces[chessBoard[19].xpos][chessBoard[19].ypos] = new Soldier(20,chessBoard[19].xpos,chessBoard[19].ypos,true,"兵");
                if(chessBoard[20].alive)this.pieces[chessBoard[20].xpos][chessBoard[20].ypos] = new Soldier(21,chessBoard[20].xpos,chessBoard[20].ypos,true,"兵");
                // for(var i=16;i<=20;i++)
                // {
                //     if(chessBoard[i].alive)this.pieces[chessBoard[i].xpos][chessBoard[i].ypos] = new Soldier(i+1,chessBoard[i].xpos,chessBoard[i].ypos,true,"兵");
                // }
                //黑棋
                if(chessBoard[0].alive) this.pieces[chessBoard[0].xpos][chessBoard[0].ypos] = new Car(1,chessBoard[0].xpos,chessBoard[0].ypos,false);
                if(chessBoard[1].alive)this.pieces[chessBoard[1].xpos][chessBoard[1].ypos] = new Horse(2,chessBoard[1].xpos,chessBoard[1].ypos,false);
                if(chessBoard[9].alive)this.pieces[chessBoard[9].xpos][chessBoard[9].ypos] = new Cannon(10,chessBoard[9].xpos,chessBoard[9].ypos,false);
                if(chessBoard[2].alive)this.pieces[chessBoard[2].xpos][chessBoard[2].ypos] = new Elephant(3,chessBoard[2].xpos,chessBoard[2].ypos,false,"象");
                if(chessBoard[3].alive)this.pieces[chessBoard[3].xpos][chessBoard[3].ypos] = new Bodyguards(4,chessBoard[3].xpos,chessBoard[3].ypos,false);
                if(chessBoard[4].alive)this.pieces[chessBoard[4].xpos][chessBoard[4].ypos] = new Boss(5,chessBoard[4].xpos,chessBoard[4].ypos,false,"将");
                this.greenBoss=this.pieces[chessBoard[4].xpos][chessBoard[4].ypos];
                if(chessBoard[5].alive)this.pieces[chessBoard[5].xpos][chessBoard[5].ypos] = new Bodyguards(6,chessBoard[5].xpos,chessBoard[5].ypos,false);
                if(chessBoard[6].alive)this.pieces[chessBoard[6].xpos][chessBoard[6].ypos] = new Elephant(7,chessBoard[6].xpos,chessBoard[6].ypos,false,"象");
                if(chessBoard[10].alive)this.pieces[chessBoard[10].xpos][chessBoard[10].ypos] = new Cannon(11,chessBoard[10].xpos,chessBoard[10].ypos,false);
                if(chessBoard[7].alive)this.pieces[chessBoard[7].xpos][chessBoard[7].ypos] = new Horse(8,chessBoard[7].xpos,chessBoard[7].ypos,false);
                if(chessBoard[8].alive)this.pieces[chessBoard[8].xpos][chessBoard[8].ypos] = new Car(9,chessBoard[8].xpos,chessBoard[8].ypos,false);
                
                if(chessBoard[11].alive)this.pieces[chessBoard[11].xpos][chessBoard[11].ypos] = new Soldier(12,chessBoard[11].xpos,chessBoard[11].ypos,false,"卒");
                if(chessBoard[12].alive)this.pieces[chessBoard[12].xpos][chessBoard[12].ypos] = new Soldier(13,chessBoard[12].xpos,chessBoard[12].ypos,false,"卒");
                if(chessBoard[13].alive)this.pieces[chessBoard[13].xpos][chessBoard[13].ypos] = new Soldier(14,chessBoard[13].xpos,chessBoard[13].ypos,false,"卒");
                if(chessBoard[14].alive)this.pieces[chessBoard[14].xpos][chessBoard[14].ypos] = new Soldier(15,chessBoard[14].xpos,chessBoard[14].ypos,false,"卒");
                if(chessBoard[15].alive)this.pieces[chessBoard[15].xpos][chessBoard[15].ypos] = new Soldier(16,chessBoard[15].xpos,chessBoard[15].ypos,false,"卒");
                // if(chessBoard[14].alive)this.pieces[chessBoard[14].xpos][chessBoard[14].ypos] = new Soldier(15,chessBoard[14].xpos.chessBoard[14].ypos,false,"卒");
                // if(chessBoard[15].alive)this.pieces[chessBoard[15].xpos][chessBoard[15].ypos] = new Soldier(16,chessBoard[15].xpos,chessBoard[15].ypos,false,"卒");
                // for(var i =11;i<=15;i++)
                // {
                //     if(chessBoard[i].alive)this.pieces[chessBoard[i].xpos][chessBoard[i].ypos] = new Soldier(i+1,chessBoard[i].xpos,chessBoard[i].ypos,false,"卒");
                // }
            console.log("jinishizaishitaaimei");
            }
            
            this.copyPieces=[];
            for(var i=0;i<9;i++){
                if(this.pieces[i]){
                    this.copyPieces[i]=[]; 
                    for(var j=0;j<10;j++){
                        this.copyPieces[i][j]=this.pieces[i][j];
                        this.pieces1[i][j]=this.pieces[i][j];
                    }
                }
            }
            
            //绑定事件单击
            var divs = document.getElementsByClassName("pieces");
            for(var i=0;i<divs.length;i++){divs[i].addEventListener("click",choosePiece,false);}
        }
        this.status = true;
        this.turn = true;
        
    },
    // init:function(chessBoard){
    //     for(i=0;i<9;i++){this.pieces[i]=[]; } 
    //         //第一次运行，自己创建所有棋子
                
    //         // for( var i=0;i<32;i++)
    //         // {
    //         //     if(chessBoard[i].alive)
    //         //     this.pieces[chessBoard[i].xpos][chessBoard[i].ypos] = new 
    //         //             }
    //             if(chessBoard[23].alive)this.pieces[chessBoard[23].xpos][chessBoard[23].ypos] = new Car(24,chessBoard[23].xpos,chessBoard[23].ypos,true);
    //             if(chessBoard[24].alive)this.pieces[chessBoard[24].xpos][chessBoard[24].ypos] = new Horse(25,chessBoard[24].xpos,chessBoard[24].ypos,true);
    //             if(chessBoard[21].alive)this.pieces[chessBoard[21].xpos][chessBoard[21].ypos] = new Cannon(22,chessBoard[21].xpos,chessBoard[21].ypos,true);
    //             if(chessBoard[25].alive)this.pieces[chessBoard[25].xpos][chessBoard[25].ypos] = new Elephant(26,chessBoard[25].xpos,chessBoard[25].ypos,true,"相");
    //             if(chessBoard[26].alive)this.pieces[chessBoard[26].xpos][chessBoard[26].ypos] = new Bodyguards(27,chessBoard[26].xpos,chessBoard[26].ypos,true);
    //             if(chessBoard[27].alive)this.pieces[chessBoard[27].xpos][chessBoard[27].ypos] = new Boss(28,chessBoard[27].xpos,chessBoard[27].ypos,true,"帅");
    //             this.redBoss=this.pieces[chessBoard[27].xpos][chessBoard[27].ypos];
    //             if(chessBoard[28].alive)this.pieces[chessBoard[28].xpos][chessBoard[28].ypos] = new Bodyguards(29,chessBoard[28].xpos,chessBoard[28].ypos,true);
    //             if(chessBoard[29].alive)this.pieces[chessBoard[29].xpos][chessBoard[29].ypos] = new Elephant(30,chessBoard[29].xpos,chessBoard[29].ypos,true,"相");
    //             if(chessBoard[22].alive)this.pieces[chessBoard[22].xpos][chessBoard[22].ypos] = new Cannon(23,chessBoard[22].xpos,chessBoard[22].ypos,true);
    //             if(chessBoard[20].alive)this.pieces[chessBoard[20].xpos][chessBoard[20].ypos] = new Horse(31,chessBoard[20].xpos,chessBoard[20].ypos,true);
    //             if(chessBoard[31].alive)this.pieces[chessBoard[31].xpos][chessBoard[31].ypos] = new Car(32,chessBoard[31].xpos,chessBoard[31].ypos,true);
                
    //             // if(chessBoard[16].alive)this.pieces[chessBoard[16].xpos][chessBoard[16].ypos] = new Soldier(17,0,6,true,"兵");
    //             // if(chessBoard[17].alive)this.pieces[chessBoard[17].xpos][chessBoard[17].ypos] = new Soldier(18,2,6,true,"兵");
    //             // if(chessBoard[18].alive)this.pieces[chessBoard[18].xpos][chessBoard[18].ypos] = new Soldier(19,4,6,true,"兵");
    //             // if(chessBoard[19].alive)this.pieces[chessBoard[19].xpos][chessBoard[19].ypos] = new Soldier(20,6,6,true,"兵");
    //             // if(chessBoard[20].alive)this.pieces[chessBoard[20].xpos][chessBoard[20].ypos] = new Soldier(21,8,6,true,"兵");
    //             for(var i=16;i<=20;i++)
    //             {
    //                 if(chessBoard[i].alive)this.pieces[chessBoard[i].xpos][chessBoard[i].ypos] = new Soldier(i+1,chessBoard[i].xpos,chessBoard[i].ypos,false,"兵");
    //             }
    //             //黑棋
    //             if(chessBoard[0].alive) this.pieces[chessBoard[0].xpos][chessBoard[0].ypos] = new Car(1,chessBoard[0].xpos,chessBoard[0].ypos,false);
    //             if(chessBoard[1].alive)this.pieces[chessBoard[1].xpos][chessBoard[1].ypos] = new Horse(2,chessBoard[1].xpos,chessBoard[1].ypos,false);
    //             if(chessBoard[9].alive)this.pieces[chessBoard[9].xpos][chessBoard[9].ypos] = new Cannon(10,chessBoard[9].xpos,chessBoard[9].ypos,false);
    //             if(chessBoard[2].alive)this.pieces[chessBoard[2].xpos][chessBoard[2].ypos] = new Elephant(3,chessBoard[2].xpos,chessBoard[2].ypos,false,"象");
    //             if(chessBoard[3].alive)this.pieces[chessBoard[3].xpos][chessBoard[3].ypos] = new Bodyguards(4,chessBoard[3].xpos,chessBoard[3].ypos,false);
    //             if(chessBoard[4].alive)this.pieces[chessBoard[4].xpos][chessBoard[4].ypos] = new Boss(5,chessBoard[4].xpos,chessBoard[4].ypos,false,"将");
    //             this.greenBoss=this.pieces[chessBoard[4].xpos][chessBoard[4].ypos];
    //             if(chessBoard[5].alive)this.pieces[chessBoard[5].xpos][chessBoard[5].ypos] = new Bodyguards(6,chessBoard[5].xpos,chessBoard[5].ypos,false);
    //             if(chessBoard[6].alive)this.pieces[chessBoard[6].xpos][chessBoard[6].ypos] = new Elephant(7,chessBoard[6].xpos,chessBoard[6].ypos,false,"象");
    //             if(chessBoard[10].alive)this.pieces[chessBoard[10].xpos][chessBoard[10].ypos] = new Cannon(11,chessBoard[10].xpos,chessBoard[10].ypos,false);
    //             if(chessBoard[7].alive)this.pieces[chessBoard[7].xpos][chessBoard[7].ypos] = new Horse(8,chessBoard[7].xpos,chessBoard[7],false);
    //             if(chessBoard[8].alive)this.pieces[chessBoard[8].xpos][chessBoard[8].ypos] = new Car(9,chessBoard[8].xpos,chessBoard[8],false);
                
    //             // if(chessBoard[11].alive)this.pieces[chessBoard[11].xpos][chessBoard[11].ypos] = new Soldier(12,0,3,false,"卒");
    //             // if(chessBoard[12].alive)this.pieces[chessBoard[12].xpos][] = new Soldier(13,2,3,false,"卒");
    //             // if(chessBoard[13].alive)this.pieces[4][3] = new Soldier(14,4,3,false,"卒");
    //             // if(chessBoard[14].alive)this.pieces[6][3] = new Soldier(15,6,3,false,"卒");
    //             // if(chessBoard[15].alive)this.pieces[8][3] = new Soldier(16,8,3,false,"卒");
    //             for(var i =11;i<=15;i++)
    //             {
    //                 if(chessBoard[i].alive)this.pieces[chessBoard[i].xpos][chessBoard[i].ypos] = new Soldier(i+1,chessBoard[i].xpos,chessBoard[i].ypos,false,"卒");
    //             }
    // },
    gameOver:function (winner){
        if(winner==true){
            winner1 ={
                uId : roomObj1.owner
            }
            alert("红方胜利");
            
        }
        if(winner == false){
            winner1 ={
                uId : roomObj1.player

            }
            alert("黑方胜利")
        }
        if(winner == -1)
        {
            winner1 = {
                uId : 0
            }
            alert("平局")
        }
        if( ID == roomObj1.owner )
        {
            sendWinner(winner1);
        }

        this.status=false;
        $("#chessButtonArea p:eq(0)").css("visibility","hidden");
        $("#chessButtonArea p:eq(1)").css("visibility","hidden");
        $("#chessButtonArea p:eq(2)").css("visibility","hidden");
        $("#chessButtonArea div").css("visibility","hidden");
    },
    changeTurn:function(){
        this.turn = !this.turn;
        //当前选中棋子置换为null
        chessboard.curPiece=null;
        
        if(beKillAnyWay(this.turn)){
            alert("绝杀！");
            chessboard.gameOver(!this.turn);
        }
        
    },
    status:true,//游戏的状态,true:正在玩，false:结束了
    redBoss:null,
    greenBoss:null,
    curPiece:null,
    pieces:[],//存放棋子当前布局状态
    pieces1:[[],[],[],[],[],[],[],[],[]],//存放棋子走过一步后的布局状态
    copyPieces:null,//存放棋子布局的初始状态
    turn:true,//红先黑后,true:红
};



 

function sendWinner(winner)
{
    $.ajax({
        url:"http://localhost:8080/" + rId + "/endGame",
        type:"POST",
        async:false,
        contentType:"application/json; charset=utf-8",
        data:JSON.stringify(winner),
        dataType : 'json',
        success:function(res){

        }
    })
    var user =
    {
        uId : 0
    }
    $.ajax({
        url:"http://localhost:8080/" + rId +"/postSurrender",
        type:"POST",
        async:false,
        contentType:"application/json; charset=utf-8",
        data:JSON.stringify(user),
        dataType : 'json',
        success:function(res){
           
        }
    })
}





















































//检查跳的位置上是否有对手棋子
//有：返回true
//没有：返回false


function checkEnemy(x,y){
    if(chessboard.pieces[x][y] && chessboard.pieces[x][y].team != this.team){
        return true;
    }
    return false;
}
function checkTeamMate(x,y)
{
    if(chessboard.pieces[x][y] && chessboard.pieces[x][y].team == this.team){
        return true;
    }
    return false;
}
//击杀对手棋子
function killEnemy(x,y){
    chessboard.pieces[x][y].beKill();
}

//是否将军
function canKilBoss(x,y){
    
    if(this.team){
        for(var i=0;i<chessboard.pieces.length;i++){
            for(var j=0;j<chessboard.pieces[i].length;j++){
                if(chessboard.pieces[i][j] && chessboard.pieces[i][j].team == this.team){
                
                    if(chessboard.pieces[i][j].checkPath(chessboard.greenBoss.positionX,chessboard.greenBoss.positionY)){return true;}
                }
            }
        }
        return false;
    }else{
        for(var i=0;i<chessboard.pieces.length;i++){
            for(var j=0;j<chessboard.pieces[i].length;j++){
                if(chessboard.pieces[i][j] && chessboard.pieces[i][j].team == this.team){
                    if(chessboard.pieces[i][j].checkPath(chessboard.redBoss.positionX,chessboard.redBoss.positionY)){return true};
                }
            }
        }
        return false;
    }
}

//被击杀
function beKill(){
    chessboard.pieces[this.positionX][this.positionY]=null;
    chessboard.pieces1[this.positionX][this.positionY]=null;
    
    this.piece.parentNode.removeChild(this.piece);
    if(this.name=="将" || this.name=="帅"){
        chessboard.gameOver(!this.team);
    }
}

function check(x,y){
    if(this.checkPath(x,y) && this.checkBoss(x,y)){
        return true;
    }
    return false;
}

//检查是否被绝杀
//会：返回true，不会：返回false
function beKillAnyWay(turn){
    for(var i=0;i<9;i++){
        for(var j=0;j<10;j++){
            if(chessboard.pieces[i][j] && chessboard.pieces[i][j].team == turn){
                var paths = chessboard.pieces[i][j].pathCanGo();
                for(var l=0;l<paths.length;l++){
                    if(!chessboard.pieces[i][j].canBeKilBoss(paths[l]["x"],paths[l]["y"])){return false;}
                }
            }
        }
    }
    return true;
    
}

//走出这步后会不会送将
//会：返回true，不会：返回false
function canBeKilBoss(x,y){
    
    
    
    //pieces1置换为1步以后的状态
    var tempPiece = chessboard.pieces1[x][y];
    chessboard.pieces1[this.positionX][this.positionY]=null;
    chessboard.pieces1[x][y]=this;
    
    
    //this也置换为一步以后的状态
    var tempX = this.positionX;
    var tempY = this.positionY;
    
    this.positionX=x;
    this.positionY=y;
    
    if(this.team){
        for(var i=0;i<9;i++){
            for(var j=0;j<10;j++){
                if(chessboard.pieces1[i][j] && !chessboard.pieces1[i][j].team){
                    if(chessboard.pieces1[i][j].checkPath(chessboard.redBoss.positionX,chessboard.redBoss.positionY,chessboard.pieces1)){
                        //恢复之前的状态
                        this.positionX=tempX;
                        this.positionY=tempY;
                        chessboard.pieces1[this.positionX][this.positionY]=this;
                        chessboard.pieces1[x][y]=tempPiece;
                        
                        return true;
                    }
                }
            }
        }
    }else{
        
        for(var i=0;i<9;i++){
            for(var j=0;j<10;j++){
                if(chessboard.pieces1[i][j] && chessboard.pieces1[i][j].team){
                    if(chessboard.pieces1[i][j].checkPath(chessboard.greenBoss.positionX,chessboard.greenBoss.positionY,chessboard.pieces1)){
                        //恢复之前的状态
                        this.positionX=tempX;
                        this.positionY=tempY;
                        chessboard.pieces1[this.positionX][this.positionY]=this;
                        chessboard.pieces1[x][y]=tempPiece;
                        return true;
                    }
                }
            }
        }
    }
    
    //恢复之前的状态
    this.positionX=tempX;
    this.positionY=tempY;
    
    chessboard.pieces1[this.positionX][this.positionY]=this;
    chessboard.pieces1[x][y]=null;
    
    return false;
}

//移动棋子
function move(x,y){
    if(this.check(x,y)){
        //有对手的棋子，则吃掉对手棋子
        if(this.checkEnemy(x,y)){killEnemy(x,y);}
        this.doMove(x,y);
        //换手
        chessboard.changeTurn();
        
        // if(chessboard.status && this.canKilBoss(x,y)){alert("将军！")}
    }
}

//实际调整棋子的位置
function doMove(x,y){
    //棋子移动至这个位置
    this.piece.parentNode.removeChild(this.piece);
    table.rows[y].cells[x].appendChild(this.piece);
    
    //二维数组处放置当前棋子
    chessboard.pieces[x][y]=this;
    chessboard.pieces[this.positionX][this.positionY]=null;
    
    //一步后的二维数组同步更新
    chessboard.pieces1[x][y]=this;
    chessboard.pieces1[this.positionX][this.positionY]=null;
    
    this.positionX=x;
    this.positionY=y;
}

//棋子的父类，定义了一些方法，供继承使用（但是发现这个继承用处不大，甚至有些负作用）
function Pieces(){
    this.checkEnemy=checkEnemy;
    this.killEnemy=killEnemy;
    this.beKill=beKill;
    this.canKilBoss=canKilBoss;
    this.canBeKilBoss=canBeKilBoss;
    this.move=move;
    this.doMove=doMove;
    this.checkBoss=checkBoss;
    this.check=check;
}

//判断车的位置是否合法
function checkCarPath(x,y,chessArr){
    if(x<0 || x>8 || y<0 || y>9){return false;}
    if(chessArr){
        if(chessArr[x][y] && chessArr[x][y].team == this.team){return false;}
    }else{
        if(chessboard.pieces[x][y] && chessboard.pieces[x][y].team == this.team){return false;}
    }
    if((this.positionX==x && this.positionY!=y) || (this.positionX!=x && this.positionY==y)){
        //前进路线中不能有任何障碍
        if(this.positionX==x){
            for(var i= Math.min(this.positionY,y) + 1; i< Math.max(this.positionY,y);i++){
                if(chessArr){
                    if(chessArr[x][i]){return false;}
                }else{
                    if(chessboard.pieces[x][i]){return false;}
                }
            }
        }else{
            for(var i= Math.min(this.positionX,x) + 1; i< Math.max(this.positionX,x);i++){
                if(chessArr){
                    if(chessArr[i][y]){return false;}
                }else{
                    
                    if(chessboard.pieces[i][y]){return false;}
                }
            }
        }
        return true;
    }
    return false;
}

//车可以移动的位置
function pathCanGo_car(chessArr){
    var paths = [];
    
    //x不变，y轴上可以移动的位置
    for(var i=0;i<9;i++){
        if(i != this.positionY && this.check(this.positionX,i)){paths.push({"x":this.positionX,"y":i});}
        }
    //y不变，x轴上可以移动的位置
    for(var i=0;i<10;i++){
        if(i != this.positionX && this.check(i,this.positionY)){paths.push({"x":i,"y":this.positionY});}
    }
    return paths;
}

//车
function Car(nID,nX,nY,nTeam){
    this.name="車";
    this.ID=nID;
    this.positionX=nX;
    this.positionY=nY;
    this.team=!!nTeam;
    this.checkPath=checkCarPath;
    this.pathCanGo=pathCanGo_car;
    this.piece = createPieces(this.name,this.positionX,this.positionY,this.name,this.team);
}

//判断马的位置是否合法
function checkHorsePath(x,y,chessArr){
    if(x<0 || x>8 || y<0 || y>9){return false;}
    if(chessArr){
        if(chessArr[x][y] && chessArr[x][y].team == this.team){return false;}
    }else{
        if(chessboard.pieces[x][y] && chessboard.pieces[x][y].team == this.team){return false;}
    }
    //马走日字
    if(Math.abs(x-this.positionX)==2 && Math.abs(y-this.positionY)==1){
        //蹩马腿
        if(chessboard.pieces[(x+this.positionX)/2][this.positionY]){return false;}
        return true;
    }
    if(Math.abs(x-this.positionX)==1 && Math.abs(y-this.positionY)==2){
        //蹩马腿
        if(chessboard.pieces[this.positionX][(y+this.positionY)/2]){return false;}
        return true;
    }
    return false;
}

//马可以移动的位置
function pathCanGo_Horse(){
    var paths = [];
    //右二下一
    if(this.check(this.positionX+2,this.positionY+1)){paths.push({"x":this.positionX+2,"y":this.positionY+1});}
    //右二上一
    if(this.check(this.positionX+2,this.positionY-1)){paths.push({"x":this.positionX+2,"y":this.positionY-1});}
    //左二下一
    if(this.check(this.positionX-2,this.positionY+1)){paths.push({"x":this.positionX-2,"y":this.positionY+1});}
    //左二上一
    if(this.check(this.positionX-2,this.positionY-1)){paths.push({"x":this.positionX-2,"y":this.positionY-1});}
    //右一下二
    if(this.check(this.positionX+1,this.positionY+2)){paths.push({"x":this.positionX+1,"y":this.positionY+2});}
    //右一上二
    if(this.check(this.positionX+1,this.positionY-2)){paths.push({"x":this.positionX+1,"y":this.positionY-2});}
    //左一下二
    if(this.check(this.positionX-1,this.positionY+2)){paths.push({"x":this.positionX-1,"y":this.positionY+2});}
    //左一上二
    if(this.check(this.positionX-1,this.positionY-2)){paths.push({"x":this.positionX-1,"y":this.positionY-2});}
    return paths;
}

//马
function Horse(nID,nX,nY,nTeam){
    this.name="馬";
    this.ID=nID;
    this.positionX=nX;
    this.positionY=nY;
    this.team=!!nTeam;
    this.checkPath=checkHorsePath;
    this.pathCanGo=pathCanGo_Horse;
    this.piece = createPieces(this.name,this.positionX,this.positionY,this.name,this.team);
}

//判断象的位置是否合法
function checkElephantPath(x,y,chessArr){
    if(x<0 || x>8 || y<0 || y>9){return false;}
    if(chessArr){
        if(chessArr[x][y] && chessArr[x][y].team == this.team){return false;}
    }else{
        if(chessboard.pieces[x][y] && chessboard.pieces[x][y].team == this.team){return false;}
    }
    //不能过河
    if(this.team){if(y<5){return false;}}
    else{if(y>4){return false;}}
    
    //象走田字
    if(Math.abs(x-this.positionX)==2 && Math.abs(y-this.positionY)==2){
        //蹩象腿
        if(!chessboard.pieces[(x+this.positionX)/2][(y+this.positionY)/2]){
            return true;
        }
    }
    return false;	
}

//象可以移动的位置
function pathCanGo_Elephant(){
    var paths = [];
    //右二下二
    if(this.check(this.positionX+2,this.positionY+2)){paths.push({"x":this.positionX+2,"y":this.positionY+2});}
    //右二上二
    if(this.check(this.positionX+2,this.positionY-2)){paths.push({"x":this.positionX+2,"y":this.positionY-2});}
    //左二下二
    if(this.check(this.positionX-2,this.positionY+2)){paths.push({"x":this.positionX-2,"y":this.positionY+2});}
    //左二上二
    if(this.check(this.positionX-2,this.positionY-2)){paths.push({"x":this.positionX-2,"y":this.positionY-2});}
    return paths;
}

//象
function Elephant(nID,nX,nY,nTeam,name){
    this.name=name;
    this.ID=nID;
    this.positionX=nX;
    this.positionY=nY;
    this.team=!!nTeam;
    this.checkPath=checkElephantPath;
    this.pathCanGo=pathCanGo_Elephant;
    this.piece = createPieces(this.name,this.positionX,this.positionY,this.name,this.team);
}

//判断士的位置是否合法
function checkBodyguardsPath(x,y,chessArr){
    if(x<0 || x>8 || y<0 || y>9){return false;}
    if(chessArr){
        if(chessArr[x][y] && chessArr[x][y].team == this.team){return false;}
    }else{
        if(chessboard.pieces[x][y] && chessboard.pieces[x][y].team == this.team){return false;}
    }
    //x轴不能出九宫格
    if(x!=3 && x!=4 && x!=5){return false;}
    
    //y轴不能出九宫格
    if(this.team){if(y<7){return false;}}
    else{if(y>2){return false;}}
    
    //士斜着走一步
    if(Math.abs(x-this.positionX)==1 && Math.abs(y-this.positionY)==1){
        return true;
    }
    return false;
}

//士可以移动的位置
function pathCanGo_Bodyguards(){
    var paths = [];
    if(this.check(this.positionX+1,this.positionY+1)){
        paths.push({"x":this.positionX+1,"y":this.positionY+1});
    }
    if(this.check(this.positionX+1,this.positionY-1)){
        paths.push({"x":this.positionX+1,"y":this.positionY-1});
    }
    if(this.check(this.positionX-1,this.positionY+1)){
        paths.push({"x":this.positionX-1,"y":this.positionY+1});
    }
    if(this.check(this.positionX-1,this.positionY-1)){
        paths.push({"x":this.positionX-1,"y":this.positionY-1});
    }
    return paths;
}

//士，找不到合适的单词，构造器意为保镖
function Bodyguards(nID,nX,nY,nTeam){
    this.name="士";
    this.ID=nID;
    this.positionX=nX;
    this.positionY=nY;
    this.team=!!nTeam;
    this.checkPath=checkBodyguardsPath;
    this.pathCanGo=pathCanGo_Bodyguards;
    this.piece = createPieces(this.name,this.positionX,this.positionY,this.name,this.team);
}

//将/帅的位置是否合法
function checkBossPath(x,y,chessArr){
    if(x<0 || x>8 || y<0 || y>9){return false;}
    if(chessArr){
        if(chessArr[x][y] && chessArr[x][y].team == this.team){return false;}
    }else{
        if(chessboard.pieces[x][y] && chessboard.pieces[x][y].team == this.team){return false;}
    }
    if(x!=3 && x!=4 && x!=5){return false;}
    if(this.team){if(y<7){return false;}}
    else{if(y > 2){return false;}}
    if(Math.abs(x-this.positionX)==1 && Math.abs(y-this.positionY)==0){
        return true;
    }
    if(Math.abs(x-this.positionX)==0 && Math.abs(y-this.positionY)==1){
        return true;
    }
    return false;
}

//将可以移动的位置
function pathCanGo_Boss(){
    var paths=[];
    if(this.check(this.positionX+1,this.positionY)){paths.push({"x":this.positionX+1,"y":this.positionY})}
    if(this.check(this.positionX-1,this.positionY)){paths.push({"x":this.positionX-1,"y":this.positionY})}
    if(this.check(this.positionX,this.positionY+1)){paths.push({"x":this.positionX,"y":this.positionY+1})}
    if(this.check(this.positionX,this.positionY-1)){paths.push({"x":this.positionX,"y":this.positionY-1})}
    return paths;
}



//将，帅
function Boss(nID,nX,nY,nTeam,name){
    this.name=name;
    this.ID=nID;
    this.positionX=nX;
    this.positionY=nY;
    this.team=!!nTeam;
    
    this.checkPath=checkBossPath;
    this.pathCanGo=pathCanGo_Boss;
    this.piece = createPieces(this.name,this.positionX,this.positionY,this.name,this.team);
}

//兵/卒的位置是否合法
function checkSoldierPath(x,y,chessArr){
    if(x<0 || x>8 || y<0 || y>9){return false;}
    if(chessArr){
        if(chessArr[x][y] && chessArr[x][y].team == this.team){return false;}
    }else{
        if(chessboard.pieces[x][y] && chessboard.pieces[x][y].team == this.team){return false;}
    }
    if(this.team){
        //不能后退
        if(y>this.positionY){return false;}
        //前进，合法
        if(Math.abs(x-this.positionX)==0 && Math.abs(y-this.positionY)==1){
        
            return true;
        }
        //过河后可以横向移动，然而也只能走一步
        if(this.positionY<5){
            if(Math.abs(x-this.positionX)==1 && Math.abs(y-this.positionY)==0){
                return true;
            }
        }
    }else{
        //不能后退
        if(y<this.positionY){return false;}
        //前进，合法
        if(Math.abs(x-this.positionX)==0 && Math.abs(y-this.positionY)==1){
            return true;
        }
        //过河后可以横向移动，然而也只能走一步
        if(this.positionY>4){
            if(Math.abs(x-this.positionX)==1 && Math.abs(y-this.positionY)==0){
                return true;
            }
        }
    }
    
    return false;
}

//兵/卒可以移动的位置
function pathCanGo_Soldier(){
    var paths = [];
    if(this.team){
        if(this.check(this.positionX,this.positionY-1)){paths.push({"x":this.positionX,"y":this.positionY-1});}
        if(this.positionY<5){
            if(this.check(this.positionX+1,this.positionY)){paths.push({"x":this.positionX+1,"y":this.positionY});}
            if(this.check(this.positionX-1,this.positionY)){paths.push({"x":this.positionX-1,"y":this.positionY});}
        }
    }else{
        if(this.check(this.positionX,this.positionY+1)){paths.push({"x":this.positionX,"y":this.positionY+1});}
        if(this.positionY>4){
            if(this.check(this.positionX+1,this.positionY)){paths.push({"x":this.positionX+1,"y":this.positionY});}
            if(this.check(this.positionX-1,this.positionY)){paths.push({"x":this.positionX-1,"y":this.positionY});}
        }
    }
    return paths;
}

//兵
function Soldier(nID,nX,nY,nTeam,name){
    this.name=name;
    this.ID=nID;
    this.positionX=nX;
    this.positionY=nY;
    this.team=!!nTeam;
    this.checkPath=checkSoldierPath;
    this.pathCanGo=pathCanGo_Soldier;
    this.piece = createPieces(this.name,this.positionX,this.positionY,this.name,this.team);
}

//炮的位置是否合法
function checkCannonPath(x,y,chessArr){

    if(x<0 || x>8 || y<0 || y>9){return false;}
    if(chessArr){
        if(chessArr[x][y] && chessArr[x][y].team == this.team){return false;}
    }else{
        if(chessboard.pieces[x][y] && chessboard.pieces[x][y].team == this.team){return false;}
    }
    //炮走直线
    if(this.positionX==x || this.positionY==y){
        var count = 0;//计数路线上的障碍
        if(this.positionX==x){count = count2Piece("y",this.positionY,y,x,chessArr);}
        else{count = count2Piece("x",this.positionX,x,y,chessArr);}
        //没有障碍，切目标位置没有棋子，合法
        if(chessArr){
            
            if(count==0 && !chessArr[x][y]){
                return true;
            }
            //有一个障碍
            if(count==1){
                //且目标位置上有对手棋子，合法
                if(chessArr[x][y] && chessArr[x][y].team != this.team){
                    return true;
                }
            }
        }else{
            if(count==0 && !chessboard.pieces[x][y]){
                return true;
            }
            //有一个障碍
            if(count==1){
                //且目标位置上有对手棋子，合法
                if(chessboard.pieces[x][y] && chessboard.pieces[x][y].team != this.team){
                    return true;
                }
            }
        }
        
    }
    //其余情况均不合法
    return false;
}

//炮可以移动的位置
function pathCanGo_Cannon(){
    var paths = [];
    for(var i=0;i<10;i++){
        if(i!=this.positionY && this.check(this.positionX,i)){paths.push({"x":this.positionX,"y":i})}
    }
    for(var i=0;i<9;i++){
        if(i!=this.positionX && this.check(i,this.positionY)){paths.push({"x":i,"y":this.positionY})}
    }
    return paths;
}

//炮
function Cannon(nID,nX,nY,nTeam){
    this.name="炮";
    this.ID=nID;
    this.positionX=nX;
    this.positionY=nY;
    this.team=!!nTeam;
    this.checkPath=checkCannonPath;
    this.pathCanGo=pathCanGo_Cannon;
    this.piece = createPieces(this.name,this.positionX,this.positionY,this.name,this.team);
}

//检查老将问题
function checkBoss(x,y,chessArr){
    
    if(this.canBeKilBoss(x,y,chessArr)){
        return false;
    }
    if(this.name == "将" || this.name == "帅"){//将要移动的是将
        if(this.team){//帅
            if(x!=chessboard.greenBoss.positionX){return true;}
            var count = count2Piece("y",y,chessboard.greenBoss.positionY,x,chessArr);
            return count > 0;
        }else{//将
            if(x!=chessboard.redBoss.positionX){return true;}
            var count = count2Piece("y",y,chessboard.redBoss.positionY,x,chessArr);
            return count>0;
        }
    }else{//将要移动的不是将
    
        //两方的将不在同一条线，通过
        if(chessboard.redBoss.positionX != chessboard.greenBoss.positionX){
            return true;
        }
        
        var count=count2Piece("y",chessboard.redBoss.positionY,chessboard.greenBoss.positionY,chessboard.redBoss.positionX,chessArr);
        
        //新的位置在两个老将的x轴上，且y轴在两个老将之间
        if(x == chessboard.redBoss.positionX && y < chessboard.redBoss.positionY && y > chessboard.greenBoss.positionY){count++;}
        //旧的位置在两个老将的x轴上，且y轴在两个老将之间
        if(this.positionX == chessboard.redBoss.positionX && y < chessboard.redBoss.positionY && y > chessboard.greenBoss.positionY){count--;}
        return count>0;
        
    }
    
}
/**
    计算在一条线上的两个棋子“之间”的棋子数量
    @param XOrY 计算x轴还是y轴上的棋子数量
    @param a1 要计算的轴上的两点中的一点
    @param a2 要计算的轴上的两点中的一点
    @param a3 不需要计算的轴上的值
    @param chessArr 要在哪个棋子布局上计算
*/
function count2Piece(XOrY,a1,a2,a3,chessArr){

    var count=0;
    if(XOrY=='x' || XOrY=='X'){
        for(var i= Math.min(a1,a2) + 1;i< Math.max(a1,a2);i++){
            if(chessArr){
                if(chessArr[i][a3]){++count;}
            }else{
                if(chessboard.pieces[i][a3]){++count;}
            }
        }
    }else{
        for(var i= Math.min(a1,a2) + 1;i< Math.max(a1,a2);i++){
            if(chessArr){
                if(chessArr[a3][i]){++count;}
            }else{
                if(chessboard.pieces[a3][i]){++count;}
            }
            
        }
    }
    return count;
}

//在dom中创建棋子
function createPieces(ID,x,y,name,team){
    var div = document.createElement("div");
    div.setAttribute("data-team",team?"red":"");
    div.classList.add("pieces");
    div.classList.add(team?"red":"green");
    div.appendChild(document.createTextNode(name));
    tBody.rows[y].cells[x].appendChild(div);
    return div;
}

var p = new Pieces();
Car.prototype=p;
Horse.prototype=p;
Elephant.prototype=p;
Bodyguards.prototype=p;
Boss.prototype=p;
Soldier.prototype=p;
Cannon.prototype=p;







