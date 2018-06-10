/*
 * Create a list that holds all of your cards
 */
 const pair1 = "fa-diamond";
 const pair2 = "fa-anchor";
 const pair3 = "fa-leaf";
 const pair4 = "fa-bomb";
  const pair5 = "fa-paper-plane-o";
 const pair6 = "fa-bolt";
 const pair7 = "fa-cube";
 const pair8 = "fa-bicyle";
const deck = [pair1, pair2, pair3, pair4, pair5, pair6, pair7, pair8]
console.log(deck);

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, 
    temporaryValue, 
    randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 
 /*initialize page*/
const cards = document.querySelectorAll('.card');
const image = document.querySelectorAll('.fa');
console.log(image);
console.log(cards);
for (i=0; i<cards.length; i++) {
//for (const card of cards) {
	console.log(cards[i]);
cards[i].classList.remove("match", "open", "show");
//image[i].classList.remove("fa-\*");
cards[i].innerHTML = '';

//cards[i].removeChild(image[i]);
}

console.log(image);
console.log(cards);
/*   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

const shuffledDecks = shuffle(deck);
//for (const shuffledDeck of shuffledDecks) 
for (i=0; i<cards.length; i++) {
	const cardImage=`<i class="fa ${shuffledDecks[i]}"></i>`;
	console.log(cardImage);
	console.log(cards);
	cards[i].innerHTML=cardImage;
}





/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
