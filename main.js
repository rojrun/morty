$(document).ready(start_memory_match_game);

var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;
// var canBeClicked = true;

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

var newDeck = shuffle_array(images);

function start_memory_match_game(){
    shuffle_array(images);
    card_creation(newDeck);
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

    return doubled_images;
}

function card_creation(shuffledDeck) {    /* creates deck dynamically */
    for (var cardIndex = 0; cardIndex < shuffledDeck.length; cardIndex++) {
        var playingCardFront = $("<div>").addClass("front").css("background-image", "url(" + shuffledDeck[cardIndex] + ")");
        var playingCardBack = $("<div>").addClass("back").on("click", clickCard);
        var playingCardContainer = $("<div>").addClass("card");
        $(playingCardContainer).append(playingCardFront, playingCardBack);
        $(".game-area").append(playingCardContainer);
    }
}

function clickCard(){
    // if (!canBeClicked) {
    //     return;
    // }

    // if ($(this).hasClass("cantClick")) {
    //     return;
    // }

    if (first_card_clicked === null) {
        first_card_clicked = $(this);
        first_card_clicked.hide();

    } else {
        // canBeClicked = false;
        second_card_clicked = $(this);
        second_card_clicked.hide();
        // $(".back").addClass("cantClick");
        $(".back").off("click", clickCard);
        var first_card = ((first_card_clicked.siblings())[0].style.backgroundImage).slice(22, -6);
        //var first_card = first_card_clicked.parent().find(".front").css("background-image").slice(66, -6);
        // var second_card = second_card_clicked.parent().find(".front").css("background-image").slice(66, -6);
        var second_card = ((second_card_clicked.siblings())[0].style.backgroundImage).slice(22, -6);
        console.log("first_card:", first_card);
        console.log("second_card:", second_card);

        if (first_card === second_card) {    /* cards match */  
            match_counter++;
            matches++;
            attempts++;
            display_stats();
            first_card_clicked = null;
            second_card_clicked = null;    
            $(".title").text("Great job Morty!");

            if (match_counter === total_possible_matches) {     /* if all matches found */
                $(".title").text("Morty, you found them all!");
                $(".card").remove();
                var newGame = $("<div>").addClass("newGame").text("Play Again?");
                var newGameButton = $("<div>").addClass("newGameButton").text("YES").on("click", startNewGame);
                var newGameContainer = $("<div>").addClass("newGameContainer");
                $(newGameContainer).append(newGame, newGameButton);
                $(".game-area").append(newGameContainer);

            } else {
                first_card_clicked = null;
                second_card_clicked = null;
                $(".back").on("click", clickCard);
            }

        } else {    /* cards mismatch */
            $(".title").text("Morty Smith is a moron!");
            setTimeout(function() {
                first_card_clicked.show(1000);
                second_card_clicked.show(1000);
                first_card_clicked = null;
                second_card_clicked = null;
            }, 2300);            
            attempts++;
            display_stats();
            $(".back").on("click", clickCard);
        }
    }
}

function reset_game() {
    games_played++;
    reset_stats();
    display_stats();
    $(".back").show();
    $(".title").text("Morty Smith is a moron!");
    $(".newGameContainer").remove();
    $(".card").remove();
    shuffle_array(images);
    card_creation(newDeck);
}

function display_stats() {
    $(".games-played .value").text(games_played);
    $(".attempts .value").text(attempts);
    accuracy = ((matches / attempts) * 100).toFixed(1);
    accuracy = (isNaN(accuracy)) ? 0 : accuracy;
    $(".accuracy .value").text(accuracy + " %");
}

function reset_stats() {
    first_card_clicked = null;
    second_card_clicked = null;
    accuracy = 0;
    matches = 0;
    match_counter = 0;
    attempts = 0;
    display_stats();
}

function startNewGame() {
    $(".newGameContainer").remove();
    reset_game();
}
