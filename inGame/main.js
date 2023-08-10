function  Game(){
    var all={}
    all.generateBoard=generateBoard()
    all.player1=Player()
    all.player2=Player()
    
}
function Player(){
    var result={}
    result.name=takeName()
    result.score=0
    result.incrementScore=incrementScore()
    
}
var board=[
    ["","",[true,true,true,false],"",""],
    ["",[true,true,false,false],[false,false,false,false],[false,true,true,false],""],
    [[true,true,false,true],[false,false,false,false],[false,false,false,false],[false,false,false,false],[false,true,true,true]],
    ["",[true,false,false,true],[false,false,false,false],[false,false,true,true],""],
    ["","",[true,false,true,true],"",""],
]
function fillBoard(){
    for(var i=1;i<=13;i++){
        for(var j=1;j<=9;j++){
            $("#container").append("<div class='cell'><span class='line-vertical left'></span><span class='line-horizon top'></span><span class='line-vertical right'></span><span class='line-horizon bottom'></span></div>")
            
        }
    }
    $(".cell").last().remove()
}
fillBoard()
function injectSpans(){
    
}