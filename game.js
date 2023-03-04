var gamePattern=[];
var userClickedPattern=[];
var buttonColors=["red","blue","green","yellow"];

var randomChosenColor;

var randomNumber;
var started=false; 
var level=0;

$(document).keydown(function(){
    if(!started)
    {
        $("#level-title").text("Level "+level)
    
    nextSequence();
    started=true;
    }
})

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor)
{
    $("#"+currentColor).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}

$(".btn").click(function(){
    var userChosencolor=$(this).attr("id");
     userClickedPattern.push(userChosencolor);
     console.log(userClickedPattern);
    playSound(userChosencolor);animatePress(userChosencolor); 
    checkAnswer(userClickedPattern.length-1);
    },);


function nextSequence(){
 userClickedPattern=[];
 level++;
 $("#level-title").text("Level "+level);
 randomNumber=Math.floor(Math.random()*4);
 randomChosenColor=buttonColors[randomNumber];
gamePattern.push(randomChosenColor);
$("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
console.log(gamePattern);
playSound(randomChosenColor);

}


function checkAnswer(currentLevel1)
{
if(gamePattern[currentLevel1]===userClickedPattern[currentLevel1])
{
    console.log("success");
    if(gamePattern.length===userClickedPattern.length)
    {
     setTimeout(function(){   //setInterval calls itself
        nextSequence();
     },1000)
    }
}
else
{
    console.log("wrong");
    var gameOver=new Audio("sounds/wrong.mp3");
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);
    gameOver.play();
    $("#level-title").text("Game Over. Press any key to restart");
    startOver();
}
}

function startOver()
{
    level=0;
    gamePattern=[];
    started=false;
}


