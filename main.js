$(document).ready(start_memory_match_game);

var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
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

var newDeck = shuffle_array(images);

function start_memory_match_game(){
    shuffle_array(images);
    card_creation(newDeck);
    $(".reset").click(reset_game);
}

function shuffle_array(imagesArray) {
    var doubled_images = imagesArray.concat( imagesArray );

    for (var i = doubled_images.length; i; i -= 1) {
        var randomize_images = Math.floor(Math.random() * i);
        var x = doubled_images[i - 1];
        doubled_images[i - 1] = doubled_images[randomize_images];
        doubled_images[randomize_images] = x;
    }

    return doubled_images;
}

function card_creation(shuffledDeck) {
    for (var cardIndex = 0; cardIndex < shuffledDeck.length; cardIndex++) {
        var playingCardFront = $("<div>").addClass("front").css("background-image", "url(" + shuffledDeck[cardIndex] + ")");
        var playingCardBack = $("<div>").addClass("back").click(card_clicked);
        var playingCardContainer = $("<div>").addClass("card");
        $(playingCardContainer).append(playingCardFront, playingCardBack);
        $(".game-area").append(playingCardContainer);
    }
}

function card_clicked(){

    if (first_card_clicked === null){
        first_card_clicked = $(this);
        flipCard(this);
        first_card_clicked.siblings('.card-back').off();
    } else{
        second_card_clicked = $(this);
        flipCard(this);
        var firstCard = first_card_clicked.siblings('.card-back').css('background-image');
        var secondCard = second_card_clicked.siblings('.card-back').css('background-image');
        if (firstCard === secondCard){
            //Found a match
            var matchNumber = $('.matches .value');
            match_counter++;
            matchNumber.text(match_counter + ' ');
            attempts++;
            var attemptsValue=$('.attempts .value');
            attemptsValue.text(attempts + ' ');
            accuracy = match_counter/attempts;
            var accuracyValue= $('.accuracy .value');
            accuracyValue.text(Math.floor(accuracy * 100)+'%');
            var cards = $('.card-front, .card-back');
            cards.off('click');
            setTimeout(function(){
                pairMatchAnimation(first_card_clicked, second_card_clicked);
                cards.on('click', clickCard);
                first_card_clicked = null;
                second_card_clicked = null;
            },1200);
            if (match_counter === matches){
                //All matches found
                winningDisplay();
            }
        } else {
            var cards = $('.card-front, .card-back');
            cards.off('click');
            flag = true;
            second_card_clicked.siblings('.card-back').addClass('shake')
            first_card_clicked.siblings('.card-back').addClass('shake')
            setTimeout(function(){
                nonPairMatchAnimation();
                cards.on('click', clickCard);
                second_card_clicked.siblings('.card-back').removeClass('shake')
                first_card_clicked.siblings('.card-back').removeClass('shake')
                first_card_clicked = null;
                second_card_clicked = null;
            },700);
            attempts++;
            var attemptsValue=$('.attempts .value');
            attemptsValue.text(attempts + ' ');

            if(match_counter >= 0 && match_counter < 9){
                accuracy = match_counter/attempts;
                var accuracyValue= $('.accuracy .value');
                accuracyValue.text(Math.floor(accuracy * 100)+'%');
            } else{
                winningDisplay();
            }
        }
    }




    // $(this).find(".back").hide();
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

function reset_game() {
    games_played++;
    reset_stats();
    display_stats();
    $(".back").removeClass("hidden");
    $(".title").text("Morty Smith is a moron!");
    $(".card").remove();
    shuffle_array(images);
    card_creation(newDeck);
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