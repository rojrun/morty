$(document).ready(start_memory_game);

var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2;
var match_counter = 0;

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
}

function card_creation() {
   var doubled_images = images.concat( images );
   for  (var cardRowIndex = 1; cardRowIndex <=3; cardRowIndex++) {
       var cardRow = $("<div>").addClass("cardRow");
       for (var cardIndex = 1; cardIndex <= 6; cardIndex++) {
           var card_image = doubled_images.pop();
           var playingCardFront = $("<div>").addClass("front").css("background-image", "url(" + card_image+ ")");
           var playingCardBack = $("<div>").addClass("back").attr('cardIndex', cardIndex);
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
    debugger;
    console.log("clicked");
    $(this).addClass("hidden");
    if (first_card_clicked === null){
        first_card_clicked = $(this);
        console.log('First Card:', first_card_clicked);
        console.log("first card clicked" , first_card_clicked.attr('cardIndex'));
    } else {
        second_card_clicked = $(this);
        console.log("second card ", second_card_clicked.attr('cardIndex'));
        if (first_card_clicked.find(".front") === second_card_clicked.find(".front")) {
            console.log("both cards match");
            match_counter++;
            console.log("match counter ", match_counter);
            setTimeout(function () {
                first_card_clicked.remove(".front");
                second_card_clicked.remove(".front");
                first_card_clicked = null;
                second_card_clicked = null;
            }, 2000);
            // first_card_clicked.removeClass("hidden");
            // second_card_clicked.removeClass("hidden");
            // first_card_clicked = null;
            console.log("first_card_clicked = ", first_card_clicked);
            // second_card_clicked = null;
            console.log("second_card_clicked = ", second_card_clicked);
            $(".title").text("Great job Morty!");
            console.log("winner");
            if (match_counter === total_possible_matches) {
                $(".title").text("Great job Morty!");

            } else {
                console.log("loser");
                return card_selection();
                // setTimeout(function () {
                // first_card_clicked.removeClass("hidden");
                // second_card_clicked.removeClass("hidden");
                // first_card_clicked = null;
                // second_card_clicked = null;
                // }, 2000);
            }
        }
    }
}







