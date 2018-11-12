$(document).ready(start_memory_game);

var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2;
var match_counter = 0;
var matches = 0;
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
    "./Rick_and_Morty/Rick_in_prison.jpg",
    "./Rick_and_Morty/season-3.jpg",
    "./Rick_and_Morty/Vindicators.jpg",
];


function start_memory_game(){
    card_creation();
    card_selection();
    $(".reset").click(function(){
       games_played++;
       reset_stats();
       display_stats();
       $(".back").removeClass("hidden");
       $(".title").text("Morty Smith is a moron!");
    });
}

function card_creation() {
   var doubled_images = images.concat( images );
   for  (var cardRowIndex = 1; cardRowIndex <=3; cardRowIndex++) {
       var cardRow = $("<div>").addClass("cardRow");
       for (var cardIndex = 1; cardIndex <= 6; cardIndex++) {
           var card_image = doubled_images.pop();
           var playingCardFront = $("<div>").addClass("front").css("background-image", "url(" + card_image+ ")");
           var playingCardBack = $("<div>").addClass("back");
           var divPlayingCard = $("<div>").addClass("card");
           $(divPlayingCard).append(playingCardFront, playingCardBack);
           $(cardRow).append(divPlayingCard);
       }
       $(".game-area").append(cardRow);
   }
}

function card_selection() {
    $(".back").click(card_clicked);
}

function card_clicked(){
    $(this).addClass("hidden");
    if (first_card_clicked === null){
        first_card_clicked = $(this);
    } else {
        second_card_clicked = $(this);
        attempts++;
        first_card_clicked = first_card_clicked.parent().find(".front").css("background-image");
        second_card_clicked = second_card_clicked.parent().find(".front").css("background-image");
        if (first_card_clicked === second_card_clicked) {
            match_counter++;
            attempts++;
            matches++;
            display_stats();
            setTimeout(function () {
                first_card_clicked.removeClass("hidden");
                second_card_clicked.removeClass("hidden");
                first_card_clicked = null;
                second_card_clicked = null;
            }, 2000);
            $(".title").text("Great job Morty!");
            if (match_counter === total_possible_matches) {
                $(this).find('.back').addClass('hidden');
                $(".title").text("Great job Morty!");
            } else {
                setTimeout(function () {
                first_card_clicked.removeClass("hidden");
                second_card_clicked.removeClass("hidden");
                first_card_clicked = null;
                second_card_clicked = null;
                }, 2000);
            }
        } else {
            first_card_clicked = null;
            second_card_clicked = null;
            first_card_clicked.addClass("back");
            second_card_clicked.addClass("back");
            attempts++;
            display_stats();
        }
    }
}

function display_stats(){
    $(".games-played .value").text(games_played);
    $(".attempts .value").text(attempts);
    accuracy = (matches / attempts) * 100;
    $(".accuracy .value").text(accuracy + " % ");
}

function reset_stats(){
    accuracy = 0;
    matches = 0;
    attempts = 0;
    display_stats();
}






