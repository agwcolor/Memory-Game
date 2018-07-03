//choice of font mixes displayed in droptown menu

const fontMix1 = ["gem", "anchor", "leaf", "bomb", "paper-plane", "bolt", "cube", "bicycle"];
const fontMix3 = ["grimace", "meh-rolling-eyes", "grin-tongue", "grin-stars", "grin-hearts", "grin-tongue-squint", "grin-wink", "grin-tongue-wink"];
const fontMix4 = ["bug", "crow", "chess-knight", "dove", "fish", "frog", "kiwi-bird", "child"];
const fontMix2 = ["lemon", "seedling", "tooth", "tree", "sun", "stroopwafel", "space-shuttle", "paw"];
const backGroundMix1 = ["hillyflowers_sm.jpg", "paraglider.jpg", "blue.jpg", "swirl.jpg", "sloth.jpg", "walrus.png", "moose.png", "mammoth.png", "mural.png", "grumpy_sm.png", "ohCanada_med.jpg", "eye.jpg"];
let pair = []; //2 element array for checking for pairs in openCardList()
let totalOpenedCards = 0; //when total = 16, then games is won.
let turnedCards = []; //
let moves; //total moves if divided by 2
let matches;
let totalSec = 00; //used to calculate hours/min/sec in timer()
let myTimer; //keeps track of timer to setInterval and clearInterval .
let fontMix = []; //

// Make Deck from chosen font mix
function makeDeck(array) {
    console.log("This is the value of fontMix in the makeDeck array" + fontMix);

    let deck = [];
    for (index in fontMix) {
        deck.push(fontMix[index]);
        deck.push(fontMix[index]);
    }
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

 //where e is the font chosen by player from drop-down menu
function startGame(f) {
    //populate fontMix array with chosen fontMix[1-4] array
    switch (f) {
        case 'Mix1':
            fontMix = fontMix1
            break;
        case 'Mix2':
            fontMix = fontMix2
            break;
        case 'Mix3':
            fontMix = fontMix3
            break;
        case 'Mix4':
            fontMix = fontMix4
            break;
        default:
            fontMix = fontMix1
    };
    //reset global variables to default settings at start of each game/on reload
    moves = 0;
    matches = 0;
    totalSec = 0;
    totalOpenedCards = 0;
//stop timer if running and you find it distracting
    myStopFunction();
    //reset to default play state (black icon & gradient mode) on reload
    document.getElementById('reveal-mode').classList.remove('active');
    document.querySelector('.deck').classList.remove('reveal');

    el = document.querySelector('.deck');
    el.style.background = 'linear-gradient(160deg, #02ccba 0%, #aa7ecd 100%)';

    //reset timer to 0
    document.getElementById("timer").innerHTML = `00 : 00 : 00`;

    //reset moves to 0
    document.querySelector('.moves').innerText = "0 Moves";

    //remove match open show classes
    const cards = document.querySelectorAll('.card');
    for (i = 0; i < cards.length; i++) {
        cards[i].classList.remove("match", "open", "show");
    }

    //refresh stars
    stars = document.querySelector('.stars');
    stars.innerHTML = "";
    for (x = 0; x < 5; x++) {
        stars.appendChild(document.createElement('li')).className = 'fas fa-star';
    };

    /*make font array from chosen font mix*/
    const fontsArray = makeDeck(fontMix);
    console.log(fontsArray + "is the fontsArray");

    /*shuffle the fonts*/
    const shuffledFonts = shuffle(fontsArray);

    /*add shuffled font styles to <li> html*/
    for (i = 0; i < cards.length; i++) {
        const cardImage = `<i class="fas fa-${shuffledFonts[i]}"></i>`;
        cards[i].innerHTML = cardImage;
        cards[i].addEventListener('click', displaySymbol);
    }
}

function timer() {

    let hour;
    let min;
    let sec;
    totalSec += 1;
    hour = parseInt(totalSec / 3600) % 24;
    min = parseInt(totalSec / 60) % 60;
    sec = totalSec % 60;

    document.getElementById("timer").innerHTML =
        ` ${hour< 10 ? (`0${hour}`) : (`${hour}`)} :
      ${min < 10 ? (`0${min}`)  : (`${min}`)}  :
      ${sec < 10 ? (`0${sec}`)  : (`${sec}`)}
    `;
}


function displaySymbol() {
    let flagCheck = document.getElementsByClassName("open");
    let matchCheck = document.getElementsByClassName("match");
    //start timer to increment every second
    if (moves === 0) {
        myTimer = setInterval(timer, 1000)
    };

    //alerts user if they have already clicked an open card
    if (this.classList.contains("open")) {
        alert("You already clicked that. try another");
    } else {
        /*makes sure more than 2 cards aren't open at any one time by subtracting total of matched cards from total opened cards. No more than 2 cards should be open at any one time*/

        if ((flagCheck.length <= 1) || ((flagCheck.length + 1) - matchCheck.length) <= 2) {
            this.classList.add("open", "show");
            openCard = this;
            openCardList(openCard);

        } else {
            return false; //won't turn card over
        }
    }
}

//check if opened cards are a pair - Call  moveCounter() & starCounter();
function openCardList(e) {
    pair.push(e);
    len = turnedCards.length;
    len++;
    if (len === 1) {
        turnedCards.push(e.innerHTML);
    } else {
        turnedCards.push(e.innerHTML);
        // console.log(turnedCards + " len is 2");

        if (turnedCards[0] === turnedCards[1]) {
            console.log("this is a match!");
            matches++;
            turnedCards = [];
            lockIntoOpen(pair);
            pair = [];

        } else {
            console.log("Try again"); //add function
            timerActive = true;
            setTimeout(hideSymbol, 1500);
            turnedCards = [];
        }
    }
    moveCounter();
    starCounter();

}

//lock pair open / remove evt listener / add match class
function lockIntoOpen(a) {
    /*console.log("it's a match!");*/
    totalOpenedCards += 2;
    pair[0].classList.add("match");
    pair[1].classList.add("match");
    pair[0].removeEventListener('click', displaySymbol);
    pair[1].removeEventListener('click', displaySymbol);
    /*console.log(totalOpenedCards + " is total # of cards opened");*/
    if (totalOpenedCards === 16) {
        /*console.log("total opened cards=" + totalOpenedCards);*/
        myStopFunction(); // stop timer when game finished
        clearIcons(); //clear the icons (esp so you can see Reveal version image after modal closes.)
    }
}

//hide incorrect pair by removing open / show classes. reset pair array a to 0.
function hideSymbol() {
    timerActive = false;
    pair[0].classList.remove("open", "show");
    pair[1].classList.remove("open", "show");
    pair = [];

    console.log("I removed open & show classes");
}

//increment move counter only after 2 cards have been turned over
function moveCounter() {
    moves++;
    //console.log(moves + " --># of moves");
    (moves === 2) ? (document.querySelector('.moves').innerText = moves / 2 + " Move") : (moves % 2 === 0) ? (document.querySelector('.moves').innerText = (moves / 2 + " Moves")) : console.log("This must be Odd");
}

// remove stars rating at various #'s of moves. Don't remove star if they make a match. //
function starCounter() {
    var stars = document.querySelector('.stars');
    //console.log(moves + "this is the current number of moves");
    //console.log(matches + "this is the current number of matches");
    switch ((moves) - (matches * 2)) {
        case 20:
            stars.removeChild(stars.children[0]);
            break;
        case 30:
            stars.removeChild(stars.children[0]);
            break;
        case 40:
            stars.removeChild(stars.children[0]);
            break;
        case 50:
            stars.removeChild(stars.children[0]);
            break;
        case 60:
            stars.removeChild(stars.children[0]);
            break;
    }
}
//
function displayWinMsg() {
    //  the modal
    var modal = document.getElementById('winModal');

    // close fa icon
    var span = document.getElementsByClassName("close")[0];

    //open the modal
    modal.style.display = "block";
    //add star rating and time to modal
    var congrats = document.querySelector(".congrats");

    var stats = document.createElement('div');
    stats.className = 'stats';

    var starCount = document.querySelector(".stars").getElementsByTagName("li").length

    stats.innerHTML = `<p>You have ${starCount} Stars in ${(moves+1)/2} Moves</p><p>Time: ${parseInt(totalSec/60)%60} min : ${totalSec%60} sec</p>`;
    congrats.appendChild(stats);

    //close the modal when x is clicked
    span.onclick = function() {
        modal.style.display = "none";

    }

    // if click outside modal, also close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function clearIcons() {
    var i;
    var a = document.getElementById("reveal-mode");

    console.log("This is the value of a  " + a);
    if (a.classList.contains("active")) {
        var el = document.querySelectorAll(".card");
        for (i = 0; i < el.length; i++) {
            el[i].innerHTML = "";
        }
        displayWinMsg();
    } else {
        displayWinMsg();
        startGame();
    }
};

/*
*stop the timer if it's distracting or the game is done
*/

function myStopFunction() {
    clearInterval(myTimer);
}

/*
*Reveal background image version of game.
*Cycles through backGroundMix1 array
*/
function reveal() {
    let currentIndex = 12;
    let el = document.querySelector('.deck');
    if (this.classList.contains("active")) {
        this.classList.remove("active");
        el.classList.remove("reveal");
        el.removeAttribute('style', 'background-image');
        startGame();

    } else {
        this.classList.add("active");
        el.classList.add("reveal");
        randomIndex = (Math.floor(Math.random() * currentIndex));
        console.log(randomIndex + " is the randomIndex for backgroundImage");
        let randomImage = backGroundMix1[randomIndex];
        el.style.backgroundImage = "url(./img/" + randomImage + ")";
        el.style.backgroundRepeat = "no-repeat";
        el.style.backgroundSize = "cover";
        console.log("you now should be active");
    }
}

//start game on browser reload or when called
startGame();

/*
*
*Event Listeners set for Icons for game settings
*
*/
//refresh game button
document.querySelector('.restart').addEventListener('click', startGame);

//reveal image version of the game button
document.getElementById('reveal-mode').addEventListener('click', reveal);

//stop timer if it's bugging you or distracting
document.querySelector('.timer').addEventListener('click', myStopFunction);

//choose font mix for game, dropdown menu --- (1 - 4)
document.getElementById('dropdown').addEventListener('change', function() {
    var x = this.value;
    startGame(x);
});



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