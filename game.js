var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

var score = 0;

var mute = false;

var btn = document.getElementById("myBtn");
//declare unmute icon variable
var unmuteIcon = '<i class="fas fa-volume-up"> ON</i>'
//declare mute icon variable
var muteIcon = '<i class="fas fa-volume-mute"> OFF</i>'
function myFunction() {
    // toggle the muted property of the video element
    mute = !mute;
  
    // if the video is muted, set the btn.innerHTML to unmuteIcon
    // otherwise, set it to the muteIcon
    if (mute) {
      btn.innerHTML = muteIcon;
    } else {
      btn.innerHTML = unmuteIcon;
    }
  }

$(".playbtn").click(function() {
    if (started){
        startOver();
    }
    if (!started){
        $(".playbtn").text("Restart");
        $("#level-title").text("Level " + level);
        $("#score").text("High Score : " + score);
        nextSequence();
        started = true;
    } 
});

$(".btn").click(function(){
    if (started){
        var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer((userClickedPattern.length)-1);
    }
});


function nextSequence(){
    level++;

    userClickedPattern = [];

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

function playSound(name){
    if(!mute){
        var audio = new Audio("sounds/"+name+".mp3");
        audio.play(); 
    }
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100)
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                if (level>score){
                    $("#score").text("High Score : " + ++score);
                }
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)
        $("#level-title").text("Game Over");
        startOver();
    }
}

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}