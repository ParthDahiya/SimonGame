buttonColours = ["red", "blue", "green", "yellow"];

gamePattern = [];

userClickedPattern = [];

var started = false;

var level = 0;

$(document).keypress(function(){ 
    if (started == false){
        $("#level-title").text("Level 0");
        nextSequence();
    } 
});

// $("body").click(function(){
//     if (started == false){
//         $("#level-title").text("Level 0");
//         nextSequence();
//     }
// });

function nextSequence(){

    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random() * 4 ) ;
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    started = true;
    
    
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

$(".btn").on("click", function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
    
})

function checkAnswer(currentLevel){

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel] ){
        console.log("success");

        if (gamePattern.length === userClickedPattern.length){

            setTimeout(function(){
                nextSequence();
            }, 1000);
        };
    } else {
        
        console.log("wrong");

        var audioWrong = new Audio("sounds/wrong.mp3");
        audioWrong.play();
        
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        
        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function animatePress(){
    $(".btn").on("click", function(){
        $(this).addClass("pressed");
        that = this;
        setTimeout(function(){
            $(that).removeClass("pressed");
        }, 100)
    })
    
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
};





animatePress();