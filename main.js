$(document).ready(startMemoryGame);

function startMemoryGame(){
    cardCreation();


}

function cardCreation() {
   for  (var cardRowIndex = 1; cardRowIndex <=3; cardRowIndex++) {
       var cardRow = $("<div>").addClass("cardRow");
       for (var cardIndex = 1; cardIndex <= 6; cardIndex++) {
           var playingCardFront = $("<div>").addClass("front");
           var playingCardBack = $("<div>").addClass("back");
           var divPlayingCard = $("<div>").addClass("card").text(cardIndex);
           $(divPlayingCard).append(playingCardFront, playingCardBack);
           $(cardRow).append(divPlayingCard);
       }
       $(".game-area").append(cardRow);
   }
}






//
//
// var firstCard= null;
// var secondCard = null;
// $(document).ready(startApp);
//
// startApp(){
//     addclickhandlerstoelecmnets();
// }
// function addclickhandlerstolements(){
//     $(".card").click(processcardclick);
// }
// function processcardclick(){
//     console.log("process card click");
//     $(this).addClass("hidden");
//     if (firstCard === null){
//         //this must be the first click
//         firstCard = this;
//         console.log("first")
//     } else {
//         console.log("second");
//         secondCard= this;
//         var firstCardBackground = $(firstCard).find('front').css("background-image");
//     }
// }