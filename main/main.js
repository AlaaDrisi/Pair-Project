function exporter() {
    // sending names to other file
    var player1Name = $("#input1").val()
    var player2Name = $("#input2").val()
    var players = {player1Name, player2Name}
    sessionStorage.setItem("players", JSON.stringify(players)) 
    // sending colors to other file
    var player1color = $("#color1").val()
    var player2color = $("#color2").val()
    var colors = {player1color, player2color}
    sessionStorage.setItem("colors", JSON.stringify(colors))
}
$("#startBtn").click(exporter)