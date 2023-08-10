function exporter(){
    var player1Name= $("#input1").val()
   
var player2Name= $("#input2").val()

var players={player1Name,player2Name}
localStorage.setItem("players",JSON.stringify(players)) 
}
$("#startBtn").click(exporter)