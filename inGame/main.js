
var players=JSON.parse(localStorage.getItem("players"));

function  Game(){
    var all={}
    all.status=[]
    all.generateBoard=fillBoard()
    all.player1=Player(players.player1Name)
    all.player2=Player(players.player2Name)
    all.currentPlayer=all.player1

    function fillBoard(){
        var k=0
        for(var j=0;j<9;j++){
        for(var i=0;i<13;i++){
            var position=`${i}-${j}`
                $("#container").append(`<div id="${k}" class='cell'><span id="${i}-${j}-left" class='line-vertical left'></span><span id="${i}-${j}-top" class='line-horizon top'></span><span id="${i}-${j}-right" class='line-vertical right'></span><span id="${i}-${j}-bottom" class='line-horizon bottom'></span></div>`)
                all.status.push({[`${position}-left`]:false,[`${position}-top`]:false,[`${position}-right`]:false,[`${position}-bottom`]:false})
                console.log(k);
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
            var currentSpan=e.target.id;
            var currentParent = $(`#${currentSpan}`).parent();
            var currentCellId = Object.values(currentParent)[0].id
            var currentSpanClass=$(`#${currentSpan}`).attr("class").split(" ")[0]
            // console.log(currentSpanClass);
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
    function Player(name){
        var result={}
        result.name=name
        result.score=0
        result.incrementScore=incrementScore
        return result
    }

    function check(coll){
        coll.forEach((e, i) => {
            if(!(Object.values(e).includes(false))){
                $(`#${i}`).css({"background-color": "blue"})
            }
        });
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