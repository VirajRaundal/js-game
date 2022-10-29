const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];

let userClickedPattern = [];

let started = false;

let level = 0;

$(document).keypress(function(){
    if(!started){
        $("level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

//Function used to play sound.
function playSound(name){
    const audio = new Audio("sounds/" + name +".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    },100);
}

$(".btn").click(function() {
    let userChosenColour = $(this).attr("id"); //Gets the id of the button pressed by the user.

    //animatePress(userChosenColour);

    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);

    playSound(userChosenColour);
});


function nextSequence(){
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level "+level);

    const randomNumber = Math.floor(Math.random()*4);
    const randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    //console.log(gamePattern);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(()=>{
                nextSequence();
            }, 1000);
        }
    }
    else {
        playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(()=>{
        $("body").removeClass("game-over");
      }, 200)
      $("#level-title").text("Game Over, Press Any Key to Restart");

      startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
