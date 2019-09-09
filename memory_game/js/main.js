var cards = ["queen", "queen", "king", "king"];
var cardsInPlay = [];

function flipCard(cardId){

	cardsInPlay.push(cards[cardId]);
	console.log("User flipped "+ cards[cardId]);
	checkForMatch();

}

function checkForMatch(){

	if (cardsInPlay.length === 2){
		if(cardsInPlay[0] === cardsInPlay[1]){
			console.log("You found a match!");
		}else{
			console.log("Sorry, try again");
		}
	}
	
}

flipCard(0);
flipCard(2);