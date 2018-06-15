const fontMix1 = ["diamond", "anchor", "leaf", "bomb", "paper-plane-o", "bolt", "cube", "bicycle"]
let turnedCards = [];
let openedCardList = [];
let totalOpenedCards = "";

// Make Deck from chosen font mix
function makeDeck(array) {
    let deck = [];
    for (index in fontMix1) {
        deck.push(fontMix1[index]);
        deck.push(fontMix1[index]);
        console.log(`This is the length of the fonts Array! --> ${deck.length}`);
    }
    console.log(`Hey this is the deck at the start! --> ${deck}`);
    return deck;
}

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
 * 'Turn over' the cards on the page by removing match/open/show classes
 /* Return array of .cards classes*/
function startOver() {
    const cards = document.querySelectorAll('.card');
    console.log(cards);
    for (i = 0; i < cards.length; i++) {
        //for (const card of cards) {
        cards[i].classList.remove("match", "open", "show");
        console.log(cards[i]);
    return cards;
}

function displaySymbol() {
    this.classList.add("open", "show");
    openCard=this;
    openCardList(openCard);
    //console.log(e.classList + " --> These are updated classes.");
}

function openCardList(e) {
    console.log(e.innerHTML);
    len = turnedCards.length;
    //var child = this.childNodes[0];
    //console.log(child + " --> This is the child.");
    console.log(e + "is now called card1");
    //console.log("This is the value of" + len + " length of array");
    len++;
    //console.log("This is the value of" + len + " length of array after incrementing by 1");

    if (len === 1) {
            turnedCards.push(e.innerHTML);
            console.log(turnedCards + " len is 1");
    } else {
            turnedCards.push(e.innerHTML);
            console.log(turnedCards + " len is 2");
            if (turnedCards[0] === turnedCards[1]) {
                console.log("it's a match!");
                lockIntoOpen();                 
                turnedCards = [];
            } else {
                console.log("Try again"); //add function
                hideSymbol();
                turnedCards = [];
            }
        }
}

function lockIntoOpen() {
    totalOpenedCards += 2;
    if (totalOpenedCards === 16) {
    displayWinMsg();
    }

}

function hideSymbol90 {

}

function moveCounter {

}

function displayWinMsg {

}
/*   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 * - set up event listener for ea card 
 */
const cards = startOver(); /*Start Game Over on refresh.  */
const fontsArray = makeDeck(fontMix1); /*make font array from chosen font mix*/
const shuffledFonts = shuffle(fontsArray); /*shuffle the fonts*/
console.log("this is the shuffledFonts array that we are using to add event listeners to --> " + shuffledFonts);
console.log(cards.length + "this is the length of the cards array");
//?whynotwork?for (const shuffledDeck of shuffledDecks) 
for (i = 0; i < cards.length; i++) {
    const cardImage = `<i class="fa fa-${shuffledFonts[i]}"></i>`;
    cards[i].innerHTML = cardImage;
    cards[i].addEventListener('click', displaySymbol);

}




/*
 ***set up the event listener for a card. If a card is clicked:
 ****display the card's symbol (put this functionality in another function that you call from this one)
 
 ***  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 ****  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */