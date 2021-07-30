var gamePattern = [];

var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;

var started = false;

var temp = 0;

$(document).keypress(function(){
  if(started === false){
    started = true;
    nextSequence();
  }
});

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  if(temp < level && userClickedPattern[temp] === gamePattern[temp]){
    temp++;
  }else if(userClickedPattern[temp] !== gamePattern[temp]){
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    playSound("wrong");
    startOver();
  }

  if(level != 0 && temp === level){
    setTimeout(function(){
      nextSequence();
    }, 1000);
    temp = 0;
    userClickedPattern = [];
  }
});

function startOver(){
  gamePattern = [];

  userClickedPattern = [];

  level = 0;

  started = false;

  temp = 0;
}

function nextSequence(){
  var randomNumber = Math.random()*4;
  randomNumber = Math.floor(randomNumber);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("h1").text("Level " + level);
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
