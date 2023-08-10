
var players=JSON.parse(localStorage.getItem("players"));
var colors=JSON.parse(localStorage.getItem("colors"))

$('#player1Score').css({"background-color" : colors.player1color})
$('#player2Score').css({"background-color" : colors.player2color})
$('#player1Score').text(`${players.player1Name}: 0`)
$('#player2Score').text(`${players.player2Name}: 0`)

function  Game(){
    var all={}
    all.status=[]
    all.generateBoard=fillBoard()
    all.player1=Player(players.player1Name, colors.player1color)
    all.player2=Player(players.player2Name, colors.player2color)
    all.currentPlayer=all.player1

    function fillBoard(){
        var k=0
        var turn=0
        for(var j=0;j<9;j++){
        for(var i=0;i<13;i++){
            var position=`${i}-${j}`
                $("#container").append(`<div id="${k}" class='cell'><span id="${i}-${j}-left" class='line-vertical left'></span><span id="${i}-${j}-top" class='line-horizon top'></span><span id="${i}-${j}-right" class='line-vertical right'></span><span id="${i}-${j}-bottom" class='line-horizon bottom'></span></div>`)
                all.status.push({[`${position}-left`]:false,[`${position}-top`]:false,[`${position}-right`]:false,[`${position}-bottom`]:false})
                if((k+1)%13===0){
                    $(`#${i}-${j}-right`).css({"background-color": "black", "cursor" : "default"})
                    all.status[k][`${i}-${j}-right`] = true
                }
                if(k < 13){
                    $(`#${i}-${j}-top`).css({"background-color": "black", "cursor" : "default"})
                    all.status[k][`${i}-${j}-top`] = true
                }
                if(k > 103){
                    $(`#${i}-${j}-bottom`).css({"background-color": "black", "cursor" : "default"})
                    all.status[k][`${i}-${j}-bottom`] = true
                }
                if(i === 0){
                    $(`#${i}-${j}-left`).css({"background-color": "black", "cursor" : "default"})
                    $(`#${i}-${j}-left`).off()
                    all.status[k][`${i}-${j}-left`] = true
                }
                k++
            }
        }
        // console.log(all.status);
        $("span").on("click",function(e){
            turn++
            var currentSpan=e.target.id;
            var currentParent = $(`#${currentSpan}`).parent();
            var currentCellId = Object.values(currentParent)[0].id
            var currentSpanClass=$(`#${currentSpan}`).attr("class").split(" ")[0]
            // console.log(currentSpanClass);
            if(turn%2===0){
                all.currentPlayer=all.player1
            } else {
                all.currentPlayer=all.player2
            }
            if(currentSpanClass === "line-horizon"){
                // console.log("horzontal");
                var upperSpan=currentSpan.split("-")
            upperSpan[1]-=1
            upperSpan[2]="bottom"
            upperSpan=upperSpan.join("-")
            var upperParent = $(`#${upperSpan}`).parent();
            var upperCellId = Object.values(upperParent)[0].id
            $(`#${currentSpan}`).css({"background-color": "rgba(255, 0, 0, 1)", "cursor" : "default"})
            $(`#${currentSpan}`).off()
            all.status[currentCellId][currentSpan]=true
            all.status[upperCellId][upperSpan]=true
            }
            else if(currentSpanClass === "line-vertical"){
            // console.log("vertical")
            var rightSpan=currentSpan.split("-")
            // console.log(rightSpan);
            rightSpan[0]-=1
            rightSpan[2]="right"
            rightSpan=rightSpan.join("-")
            var rightParent = $(`#${rightSpan}`).parent();
            var rightCellId = Object.values(rightParent)[0].id
            $(`#${currentSpan}`).css({"background-color": "rgba(255, 0, 0, 1)", "cursor" : "default"})
            $(`#${currentSpan}`).off()
            all.status[currentCellId][currentSpan]=true
            all.status[rightCellId][rightSpan]=true
            }
            // console.log(all.status[currentCellId]);
            // console.log(all.status[rightCellId]);
            // console.log(all.status)
            console.log(all.status);
            check(all.status)
        })
    }
    function Player(name, color){
        var result={}
        result.name=name
        result.score=0
        result.incrementScore=incrementScore
        result.playerColor=color
        return result
    }

    function check(coll, current){
        coll.forEach((e, i) => {
            if(all.currentPlayer === all.player1){
                if(!(Object.values(e).includes(false))){
                    $(`#${i}`).css({"background-color": all.player1.playerColor})
                    all.status.splice(i,1)
                }
            } else {
                if(!(Object.values(e).includes(false))){
                    $(`#${i}`).css({"background-color": all.player2.playerColor})
                    all.status.splice(i,1)
                }
            }
        });
        if(all.status.length===0){
            console.log("we have a winner");
        }
    }

    var incrementScore=function(){
        this.score+=1
    }

    
    return all
}

var game1=Game()
$("#startBtn").on("click",game1)
























// var board=[
//     ["","",[true,true,true,false],"",""],
//     ["",[true,true,false,false],[false,false,false,false],[false,true,true,false],""],
//     [[true,true,false,true],[false,false,false,false],[false,false,false,false],[false,false,false,false],[false,true,true,true]],
//     ["",[true,false,false,true],[false,false,false,false],[false,false,true,true],""],
//     ["","",[true,false,true,true],"",""],
// ]