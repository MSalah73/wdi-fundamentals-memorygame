// Stores the element that hold the score to update.
var scoreElement = document.getElementById("score");
// Store the fliped card element for resetting later.
var elements = [];
// Store the Indices of each card to shuffle letter on.
var cardsIDs = [0,1,2,3];

var cards = [{rank:"queen",suit:"hearts", cardImage:"images/queen-of-hearts.png"},
			 {rank:"queen",suit:"diamonds", cardImage:"images/queen-of-diamonds.png"},
			 {rank:"king",suit:"hearts", cardImage:"images/king-of-hearts.png"},
			 {rank:"king",suit:"diamonds", cardImage:"images/king-of-diamonds.png"}];

var cardsInPlay = [];

// Score number
var score = 0;

function flipCard(){
	// Getting the values of data-id and update them with the new shuffled values.
	var cardId = cardsIDs[this.getAttribute("data-id")];

	cardsInPlay.push(cards[cardId].rank);
	console.log("User flipped "+ cards[cardId].rank);
	console.log(cards[cardId].cardImage)
	console.log(cards[cardId].suit)
	this.setAttribute("src", cards[cardId].cardImage);
	// Remove the click event listener to prevent the user from clicking the same card.
	this.removeEventListener("click", flipCard);
	// Saves the filped card element for resetting.
	elements.push(this);

	checkForMatch();
}

function checkForMatch(crd){
	if (cardsInPlay.length === 2){
		if(cardsInPlay[0] === cardsInPlay[1]){
			alert("You found a match!");
			// Update the score
			updateScore();
		}else{
			alert("Sorry, try again");
		}
		gameReset();
	}

}

function updateScore(){
	score += 1;
	scoreElement.textContent = "Score: " + score;
}

function gameReset(){
	// For some reason using for(element in elements) does not work
	for(var i = 0; i < elements.length; ++i){
		elements[i].setAttribute("src", "images/back.png");
		elements[i].addEventListener("click", flipCard);
	}
	// Empty the array
	cardsInPlay.length = 0;
	elements.length = 0;
	
	shuffleCards();
}

function shuffleCards(){
	cardsIDs.shuffle();
}

function createBoard(){
	// Shuffle the array cardsIDs.
	shuffleCards();
	for(var i = 0; i < cards.length; ++i){
		var cardElement = document.createElement("img");
		cardElement.setAttribute("src", "images/back.png");
		cardElement.setAttribute("data-id", cardsIDs[i]);
		cardElement.addEventListener("click", flipCard);
		document.getElementById("game-board").appendChild(cardElement);
	}
}
// Adding shuffle (Fisher–Yates shuffle algorithm) method to the array object 
Array.prototype.shuffle = function() {
	for(var i = 3; i > -1; --i){
		var toSwap = Math.floor(Math.random() * (i+1)); 
		var temp = cardsIDs[i];
		cardsIDs[i] = cardsIDs[toSwap];
		cardsIDs[toSwap] = temp;
	}
	return cardsIDs;
}

createBoard();