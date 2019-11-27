$(document).ready(start_memory_match_game);

var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var matches = 0;
var touched = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;

var images = [
    "./Rick_and_Morty/birdperson_rick.jpg",
    "./Rick_and_Morty/citadel.jpg",
    "./Rick_and_Morty/Evil-Rick.jpg",
    "./Rick_and_Morty/Evil_Morty.jpg",
    "./Rick_and_Morty/first_episode.jpg",
    "./Rick_and_Morty/Pickle_Rick.jpg",
    "./Rick_and_Morty/wedding_squanchers.jpg",
    "./Rick_and_Morty/rickshank_redemption.jpg",
    "./Rick_and_Morty/Vindicators.jpg",
];

function start_memory_match_game(){
    shuffle_array(images);
    $(".logo").click(function() {
        location.reload();
    });
    $(".card").on("click", clickCard);
    $(".reset").on("click", reset_game);   
}

function shuffle_array(imagesArray) {    /* duplicates array and shuffles deck */
    var doubled_images = imagesArray.concat( imagesArray );

    for (var i = doubled_images.length; i; i -= 1) {
        var randomize_images = Math.floor(Math.random() * i);
        var x = doubled_images[i - 1];
        doubled_images[i - 1] = doubled_images[randomize_images];
        doubled_images[randomize_images] = x;
    }

    card_creation(doubled_images);
}

function card_creation(shuffledDeck) {    /* creates deck dynamically */
    for (var cardIndex = 0; cardIndex < shuffledDeck.length; cardIndex++) {
        var playingCardFront = $("<div>").addClass("front").css("background-image", "url(" + shuffledDeck[cardIndex] + ")");
        var playingCardBack = $("<div>").addClass("back");
        var playingCardContainer = $("<div>").addClass("card");
        $(playingCardContainer).append(playingCardFront, playingCardBack);
        $(".game-area").append(playingCardContainer);
    }
}

function clickCard(){
    touched++;
    if (first_card_clicked === null) {
        first_card_clicked = $(this);
        first_card_clicked.addClass("card_flipped");

    } else {
        second_card_clicked = $(this);
        second_card_clicked.addClass("card_flipped");
        $(".card").off("click", clickCard);
        var first_card = ((first_card_clicked.children(".front")[0]).style.backgroundImage).slice(22, -6);
        var second_card = ((second_card_clicked.children(".front")[0]).style.backgroundImage).slice(22, -6);

        if (first_card === second_card) {    /* cards match */  
            matches++;
            attempts++;
            display_stats();
            first_card_clicked.addClass("matched");
            second_card_clicked.addClass("matched");  
            $(".title").text("Great job Morty!");

            if (matches === total_possible_matches) {     /* if all matches found */
                $(".title").text("Morty, you found them all!");
                
                setTimeout(function() {
                    $(".card").remove();
                    var newGame = $("<div>").addClass("newGame").text("Play Again?");
                    var newGameButton = $("<div>").addClass("newGameButton").text("YES").on("click", startNewGame);
                    var newGameContainer = $("<div>").addClass("newGameContainer");
                    $(newGameContainer).append(newGame, newGameButton);
                    $(".game-area").append(newGameContainer);
                }, 3000);

            } else {
                first_card_clicked = null;
                second_card_clicked = null;
                $(".card").on("click", clickCard);
            }

        } else {    /* cards mismatch */
            $(".title").text("Morty Smith is a moron!");
            setTimeout(function() {
                first_card_clicked.removeClass("card_flipped");
                second_card_clicked.removeClass("card_flipped");
                first_card_clicked = null;
                second_card_clicked = null;
                $(".card").on("click", clickCard);
            }, 3500);      
            attempts++;
            display_stats();           
        }
    }
}

function reset_game() {
    if (touched > 0) {
        games_played++;
        reset_stats();
        $(".back").hide(7000, function() {
            $(".title").text("Morty Smith is a moron!");
            $(".newGameContainer").remove();
            $(".card").remove();
            shuffle_array(images);
        });               
    }    
}

function display_stats() {
    $(".games-played .value").text(games_played);
    $(".attempts .value").text(attempts);
    accuracy = parseInt((matches / attempts) * 100);
    accuracy = (isNaN(accuracy)) ? 0 : accuracy;
    $(".accuracy .value").text(accuracy + " %");
}

function reset_stats() {
    first_card_clicked = null;
    second_card_clicked = null;
    touched = 0;
    accuracy = 0;
    matches = 0;
    attempts = 0;
    display_stats();
}

function startNewGame() {
    games_played++;
    $(".newGameContainer").remove();
    reset_stats();
    shuffle_array(images);
}
