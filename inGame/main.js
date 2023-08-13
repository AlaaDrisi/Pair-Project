
var players = JSON.parse(localStorage.getItem("players"));
var colors = JSON.parse(localStorage.getItem("colors"))

$('#player1Score').css({"background-color": colors.player1color, "opacity": 1})
$('#player2Score').css({"background-color": colors.player2color, "opacity": 0.4})
if(players.player1Name) {
    $('#player1Score').text(`${players.player1Name}: 0`)
} else {
    players.player1Name = 'P1'
    $('#player1Score').text(`${players.player1Name}: 0`)
}
if(players.player2Name) {
    $('#player2Score').text(`${players.player2Name}: 0`)
} else {
    players.player2Name = 'P2'
    $('#player2Score').text(`${players.player2Name}: 0`)
}

function  Game() {
    var all = {}
    all.status = []
    all.checkedBoxes = 0
    all.generateBoard = fillBoard()
    all.player1 = Player(players.player1Name, colors.player1color)
    all.player2 = Player(players.player2Name, colors.player2color)
    all.currentPlayer = all.player1

    function fillBoard() {
        var k = 0
        var forbidden = []
        for(var j = 0; j < 9; j++) {
        for(var i = 0; i < 13; i++) {
            var position = `${i}-${j}`
                $("#container").append(`<div id="${k}" class='cell'>
                                            <span id="${i}-${j}-left" class='line-vertical left'></span>
                                            <span id="${i}-${j}-top" class='line-horizon top'></span>
                                            <span id="${i}-${j}-right" class='line-vertical right'></span>
                                            <span id="${i}-${j}-bottom" class='line-horizon bottom'></span>
                                        </div>`)
                all.status.push({[`${position}-left`]: false, [`${position}-top`]: false, [`${position}-right`]: false, [`${position}-bottom`]: false})
                if((k + 1) % 13 === 0) {
                    forbidden.push(`${i}-${j}-right`)
                    $(`#${i}-${j}-right`).css({"background-color": "black", "cursor" : "default"})
                    all.status[k][`${i}-${j}-right`] = true
                }
                if(k < 13) {
                    forbidden.push(`${i}-${j}-top`)
                    $(`#${i}-${j}-top`).css({"background-color": "black", "cursor" : "default"})
                    all.status[k][`${i}-${j}-top`] = true
                }
                if(k > 103) {
                    forbidden.push(`${i}-${j}-bottom`)
                    $(`#${i}-${j}-bottom`).css({"background-color": "black", "cursor" : "default"})
                    all.status[k][`${i}-${j}-bottom`] = true
                }
                if(i === 0) {
                    forbidden.push(`${i}-${j}-left`)
                    $(`#${i}-${j}-left`).css({"background-color": "black", "cursor" : "default"})
                    all.status[k][`${i}-${j}-left`] = true
                }
                k++
            }
        }
        $("span").on("click", function(e) {
            if(forbidden.includes(`${e.target.id}`)) {
                $(`#${e.target.id}`).off()
                return
            }
            var currentSpan = e.target.id
            var currentSpanClass = $(`#${currentSpan}`).attr("class").split(" ")[0]
            if(currentSpanClass === "line-horizon") {
                var upperSpan=currentSpan.split("-")
                upperSpan[1] -= 1
                upperSpan[2] = "bottom"
                upperSpan = upperSpan.join("-")
                $(`#${currentSpan}`).css({"background-color": "rgba(0, 0, 0, 1)", "cursor": "default"})
                $(`#${currentSpan}`).off()
                for(object of all.status) {
                    for(key in object) {
                        if(Object.keys(object).includes(currentSpan)) {
                            object[currentSpan] = true
                            break
                        }
                        if(Object.keys(object).includes(upperSpan)) {
                            object[upperSpan] = true
                            break
                        }
                    }
                }
            }
            else if(currentSpanClass === "line-vertical") {
                var rightSpan=currentSpan.split("-")
                    rightSpan[0] -= 1
                    rightSpan[2] = "right"
                    rightSpan=rightSpan.join("-")
                $(`#${currentSpan}`).css({"background-color": "rgba(0, 0, 0, 1)", "cursor" : "default"})
                $(`#${currentSpan}`).off()
                for(object of all.status) {
                    for(key in object) {
                        if(Object.keys(object).includes(currentSpan) ) {
                            object[currentSpan] = true
                            break
                        }
                        if(Object.keys(object).includes(rightSpan)) {
                            object[rightSpan] = true
                            break
                        }
                    }
                }
            }
            var direction = currentSpan.split("-")[2]
            if(direction === "top") {
                var currentCellId1 = Object.values($(`#${currentSpan}`).parent())[0].id
                var currentCellId2 = Object.values($(`#${upperSpan}`).parent())[0].id
            }
            else if(direction === "left") {
                var currentCellId1 = Object.values($(`#${currentSpan}`).parent())[0].id
                var currentCellId2 = Object.values($(`#${rightSpan}`).parent())[0].id
            }
            if(all.currentPlayer === all.player1) {
                $('#player2Score').fadeTo(500, 1)
                $('#player1Score').fadeTo(500, 0.4)
                if(check(all.status[currentCellId1])) {
                    $(`#${currentCellId1}`).css({"background-color": all.player1.playerColor})
                    all.currentPlayer.incrementScore()
                    $('#player1Score').text(`${players.player1Name}: ${all.currentPlayer.score}`)
                    all.checkedBoxes += 1
                    endContinue(all.checkedBoxes)
                }
                if(check(all.status[currentCellId2])) {
                    $(`#${currentCellId2}`).css({"background-color": all.player1.playerColor})
                    all.currentPlayer.incrementScore()
                    $('#player1Score').text(`${players.player1Name}: ${all.currentPlayer.score}`)
                    all.checkedBoxes += 1
                    endContinue(all.checkedBoxes)
                }
            }
            else if(all.currentPlayer === all.player2) {
                $('#player1Score').fadeTo(500, 1)
                $('#player2Score').fadeTo(500, 0.4)
                if(check(all.status[currentCellId1])) {
                    $(`#${currentCellId1}`).css({"background-color": all.player2.playerColor})
                    all.currentPlayer.incrementScore()
                    $('#player2Score').text(`${players.player2Name}: ${all.currentPlayer.score}`)
                    all.checkedBoxes += 1
                    endContinue(all.checkedBoxes)
                }
                if(check(all.status[currentCellId2])) {
                    $(`#${currentCellId2}`).css({"background-color": all.player2.playerColor})
                    all.currentPlayer.incrementScore()
                    $('#player2Score').text(`${players.player2Name}: ${all.currentPlayer.score}`)
                    all.checkedBoxes += 1
                    endContinue(all.checkedBoxes)
                }
            }
            if(all.currentPlayer === all.player1) {
                all.currentPlayer = all.player2
            } else {
                all.currentPlayer = all.player1
            }
        })
    }
    function Player(name, color) {
        var incrementScore = function() {
            result.score += 1
        }
        var result = {}
        result.name = name
        result.score = 0
        result.incrementScore = incrementScore
        result.playerColor = color
        return result
    }

    function check(current) {
        if(Object.values(current).includes(false)) {
            return false
        }
        return true
    }
    function endContinue(nbBoxes) {
        var winner = ""
        if(all.player1.score > all.player2.score) {
            winner = all.player1.name + " is the winner!!!"
        }
        else if(all.player1.score < all.player2.score) {
            winner = all.player2.name + " is the winner!!!"
        } else {
            winner = "DRAW!"
        }
        if(nbBoxes === 117) {
            $("#container").fadeOut(500)
                $("#finalScreen").text(winner)
                $("#finalScreen").append("<button id='restartBtn'>RESTART</button>")
                $("#restartBtn").on("click", function() {
                    window.location.reload()
                })
        }
    }
    return all
}

$("#startBtn").on("click", Game())