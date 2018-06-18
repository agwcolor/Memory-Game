const fontMix1 = ["diamond", "anchor", "leaf", "bomb", "paper-plane-o", "bolt", "cube", "bicycle"]
let a = [];
let totalOpenedCards = 0;
let turnedCards = [];
let timerActive = false;
let moves;
let matches;
let msec = 00;
let sec = 00;
let min = 00;
let myTimer;
let timerToggle = true;

// Make Deck from chosen font mix
function makeDeck(array) {
    let deck = [];
    for (index in fontMix1) {
        deck.push(fontMix1[index]);
        deck.push(fontMix1[index]);
        //console.log(`This is the length of the fonts Array! --> ${deck.length}`);
    }
    //console.log(`Hey this is the deck at the start! --> ${deck}`);
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
function startGame() {
    moves = 0;
    matches = 0;
    msec = 00;
    sec = 00;
    min = 00;
    const cards = document.querySelectorAll('.card');
    //clear moves
    document.querySelector('.moves').innerText = "zero Moves";
    //remove match open show classes
    for (i = 0; i < cards.length; i++) {
        cards[i].classList.remove("match", "open", "show");
    }
    //refresh stars 
    stars = document.querySelector('.stars');
    stars.innerHTML = "";
    for (x = 0; x < 5; x++) {
        //document.querySelector('.stars').innerHTML = `<li><i class="fa fa-star"></i>`;
        stars.appendChild(document.createElement('li')).className = 'fa fa-star';
    };

    /*make font array from chosen font mix*/
    const fontsArray = makeDeck(fontMix1);

    /*shuffle the fonts*/
    const shuffledFonts = shuffle(fontsArray);

    /*add shuffled fonts to html*/
    for (i = 0; i < cards.length; i++) {
        const cardImage = `<i class="fa fa-${shuffledFonts[i]}"></i>`;
        cards[i].innerHTML = cardImage;
        cards[i].addEventListener('click', displaySymbol);
    }
}

function timer() {
    msec += 1;
    if (msec == 60) {
        sec += 1;
        msec = 00;
        if (sec == 60) {
            sec = 00;
            min += 1;
        }
    }
    document.getElementById("timer").innerHTML = `${min} : ${sec} : ${msec}`;
}

function displaySymbol() {
    if (msec === 0) {
        myTimer = setInterval(timer, 1000)
    }; //update timer every second

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
    //console.log(totalOpenedCards + " is total # of cards opened");
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
    //star removal -- also. don't remove star if player makes a match)
    switch ((moves) - (matches * 2)) {
        case 6:
            stars.removeChild(stars.children[0]);
            break;
        case 14:
            stars.removeChild(stars.children[0]);
            break;
        case 18:
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
    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
        console.log('you won!');
    }
}

//restart button + timer 
startGame(); /*Start Game Over on refresh.  */
document.querySelector('.restart').addEventListener('click', startGame);
document.querySelector('.timer').addEventListener('click', myStopFunction);

function myStopFunction() {
    clearInterval(myTimer);
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