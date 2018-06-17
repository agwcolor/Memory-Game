const fontMix1 = ["diamond", "anchor", "leaf", "bomb", "paper-plane-o", "bolt", "cube", "bicycle"]
let a = [];
let totalOpenedCards = 0;
let turnedCards = [];
let timerActive = false;

let moves = 0;
let matches = 0;

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
    document.querySelector('.moves').innerText = "zero Moves";
    console.log(cards);
    for (i = 0; i < cards.length; i++) {
        //for (const card of cards) {
        cards[i].classList.remove("match", "open", "show");
        console.log(cards[i]);
        console.log("I'm in the function start over!")
    }

    return cards;
}

function displaySymbol() {
    if (timerActive) {
        hideSymbol()
    };
    if (this.classList.contains("show")) {
        alert("You already clicked that. try another");

    } else {
        this.classList.add("open", "show");
        openCard = this;
        console.log("This is the value of openCard in displaySymbol function (objectHTMLLIElement)--> " + openCard);
        openCardList(openCard);
    }
}

function openCardList(e) {
    a.push(e);
    //console.log(a[0].classList + "is value of a[0].classList");
    len = turnedCards.length;
    //console.log("This is the value of" + len + " length of array");
    len++;
    //console.log("This is the value of" + len + " length of array after incrementing by 1");

    if (len === 1) {
        turnedCards.push(e.innerHTML);
    } else {
        turnedCards.push(e.innerHTML);
        // console.log(turnedCards + " len is 2");

        if (turnedCards[0] === turnedCards[1]) {
            console.log("this is a match!");
            matches++;
            turnedCards = [];
            lockIntoOpen(a);
            a = [];

        } else {
            console.log("Try again"); //add function
            //console.log("this is the array of a " + a);
            //console.log("this is a[0]" + a[0].classList, "This is a[1]" + a[1].classList);
            timerActive = true;
            setTimeout(hideSymbol, 1000);
            turnedCards = [];
            //console.log(e + "  this is what I'm passing to hideSymbol")

        }
    }
    moveCounter();
    starCounter();

}

function lockIntoOpen(a) {
    console.log("it's a match!");
    totalOpenedCards += 2;
    a[0].classList.add("match");
    a[1].classList.add("match");
    a[0].removeEventListener('click', displaySymbol);
    a[1].removeEventListener('click', displaySymbol);
    console.log(totalOpenedCards + " is total # of cards opened");
    if (totalOpenedCards === 16) {
        displayWinMsg();
    }
}

function hideSymbol() {
    console.log("This is the value of a at hideSymbol -->" + a);
    timerActive = false;
    a[0].classList.remove("open", "show");
    a[1].classList.remove("open", "show");
    console.log(" This is a[0]" + a[0].classList, "This is a[1]" + a[1].classList);
    a = [];

    console.log("I removed open & show classes");
}

function moveCounter() {
    moves++;
    console.log(moves + " --># of moves");
    //console.log("this is moves remainder 2 -->" + moves % 2);
    (moves === 2) ? (document.querySelector('.moves').innerText = moves / 2 + " Move") : (moves % 2 === 0) ? (document.querySelector('.moves').innerText = (moves / 2 + " Moves")) : console.log("This must be Odd");
}

function starCounter() {
    var stars = document.querySelector('.stars');
    console.log(moves + "this is the current number of moves");
    console.log(matches + "this is the current number of matches");
    switch ((moves)-(matches*2)) {
        case 6:
            stars.removeChild(stars.children[0]);
            break;
        case 14:
            stars.removeChild(stars.children[0]);
            break;
        case 16:
            stars.removeChild(stars.children[0]);
            break;
        case 20:
            stars.removeChild(stars.children[0]);
            break;
        case 30:
            stars.removeChild(stars.children[0]);
            break;
    }
}
//
function displayWinMsg() {
    console.log('you won!');

}

function starRating() {
    //5-1

}

//restart button + timer 

/*   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 * - set up event listener for ea card 
 */
const cards = startOver(); /*Start Game Over on refresh.  */
const fontsArray = makeDeck(fontMix1); /*make font array from chosen font mix*/
const shuffledFonts = shuffle(fontsArray); /*shuffle the fonts*/
console.log("this is the shuffledFonts array that we are using to add event listeners to --> " + shuffledFonts);

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
 ****    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 ****    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */