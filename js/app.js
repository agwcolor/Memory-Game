//choice of font mixes available to player in droptown menu
const fontMix1 = ["gem", "anchor", "leaf", "bomb", "paper-plane", "bolt", "cube", "bicycle"];
const fontMix3 = ["grimace", "meh-rolling-eyes", "grin-tongue", "grin-stars", "grin-hearts", "grin-tongue-squint", "grin-wink", "grin-tongue-wink"];
const fontMix4 = ["bug", "crow", "chess-knight", "dove", "fish", "frog", "kiwi-bird", "child"];
const fontMix2 = ["lemon", "seedling", "tooth", "tree", "sun", "stroopwafel", "space-shuttle", "paw"];

let pair = []; //2 element array for checking for pairs in openCardList()
let totalOpenedCards = 0; //counter, when total = 16, then games is won.
let turnedCards = []; //keeps track of active cards and is used to compare their innerHTML to determine a match. Length is always 2 or less.
let moves; //total "moves" if divided by 2, i.e. 1 pair = 2 moves
let matches; //keeps track of total matches
let totalSec = 00; //used to calculate hours/min/sec in timer()
let myTimer; //keeps track of timer to start & stop (setInterval and clearInterval) .
let fontMix = []; //contains the user-selected or default fontMix ... 1,2,3,or 4.

const backGroundMix1 = ["blue", "paraglider", "dog", "eye", "sloth", "hillyflowers", "moose", "mammoth", "mural", "grumpy", "ohCanada", "orb", "spaceCat"];
//responsive background image - randomImage - in responsiveBG()
const screenWidths = [
    window.matchMedia("(max-width: 480px)"),
    window.matchMedia("(min-width: 481px) and (max-width: 640px)"),
    window.matchMedia("(min-width: 641px) and (max-width: 768px)"),
    window.matchMedia("(min-width: 769px)")
];
const currentIndex = backGroundMix1.length;
let randomIndex;
let randomImage;


function startGame(f) {
    /*reset global variables to default settings at start of each game/on reload. The value of f if present is the chosen font mix from the dropdown menu */
    moves = 0;
    matches = 0;
    totalSec = 0;
    totalOpenedCards = 0;

    //reset timer
    myStopFunction();
    //set the random background image (randomImage), for if/when user switches to reveal mode
    randomIndex = (Math.floor(Math.random() * currentIndex));
    randomImage = backGroundMix1[randomIndex];
    responsiveBG();

    //reset to default play state (NOT reveal mode) on reload
    document.getElementById('reveal-mode').classList.remove('active');
    document.querySelector('.deck').classList.remove('reveal');
    //reset default background gradient for default play state
    el = document.querySelector('.deck');
    el.style.background = 'linear-gradient(160deg, #02ccba 0%, #c1a01d 100%)';

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

    //populate fontMix array with chosen fontMix[1 to 4] array f.
    //If f undefined (i.e. none chosen from dropdown), default fontMix1 used.
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
            fontMix = fontMix1 //default if user doesn't choose a font
    };

    /*make font array from chosen font mix*/
    const fontsArray = makeDeck(fontMix);
    /*shuffle the fonts*/
    const shuffledFonts = shuffle(fontsArray);
    /*add shuffled font styles to card <li> innerHTML*/
    for (i = 0; i < cards.length; i++) {
        const cardImage = `<i class="fas fa-${shuffledFonts[i]}"></i>`;
        cards[i].innerHTML = cardImage;
        /*if card clicked, display the symbol on the card via displaySymbol()*/
        cards[i].addEventListener('click', displaySymbol);
    }
}

/*Make Deck from chosen font mix*/
function makeDeck(array) {
    //array is the value of fontMix in the makeDeck array;
    let deck = [];
    for (index in fontMix) {
        //do push 2x to add pair of icons, not just one.
        deck.push(fontMix[index], fontMix[index]);
    }
    return deck;
}

/*Shuffle function from http://stackoverflow.com/a/2450976*/
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


/*calculate & display hour/minute/sec from totalSec. See displaySymbol() when user clicks first card of the game*/
function timer() {
    let hour, min, sec;
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

/*Display Symbol when user clicks card. Allow only 2 cards open at once*/
function displaySymbol() {
    let flagCheck = document.getElementsByClassName("open");
    let matchCheck = document.getElementsByClassName("match");
    //start timer to increment every second
    if (moves === 0) {
        myTimer = setInterval(timer, 1000)
    };

    //alerts user if they have already clicked an open card
    if (this.classList.contains("open")) {
        return false;
    } else {
        /*make sure that more than 2 cards aren't open at any one time by subtracting total of matched cards from total opened cards.*/

        if ((flagCheck.length <= 1) || ((flagCheck.length + 1) - matchCheck.length) <= 2) {
            this.classList.add("open", "show");
            openCard = this;
            //console.log((((flagCheck.length+1) - matchCheck.length) <= 2));
            //console.log(openCard + "is the value of openCard")
            openCardList(openCard);

        } else {
            return false; //won't turn card over
        }
    }
}

/*check if opened cards are a pair - Increment moves & decrease stars if necessary  moveCounter() & starCounter();*/
function openCardList(e) { //e is the opened li card element
    pair.push(e);
    len = turnedCards.length; //keeps track of total of cards active
    len++;
    if (len === 1) {
        turnedCards.push(e.innerHTML); //innerHTML of li card element
    } else {
        turnedCards.push(e.innerHTML);
        //compare innerHMTL of opened card elements stored in turnedCards array
        if (turnedCards[0] === turnedCards[1]) {
            //console.log("this is a match!");
            matches++; //increment matches
            turnedCards = []; //reset turnedCards
            lockIntoOpen(pair); //adds match styles and removes eventListener. Checks for win.
            pair = []; //reset pair after match style applied in lockIntoOpen()
        } else {
            // console.log("Try again")
            setTimeout(hideSymbol, 1500);
            turnedCards = [];
        }
    }
    moveCounter(); //update moves counter
    starCounter(); //update star rating
}


/*lock pair open / remove event listener / add match class*/
function lockIntoOpen(a) {
    totalOpenedCards += 2;
    pair[0].classList.add("match"); //add 'match' class to both opened cards
    pair[1].classList.add("match");
    pair[0].removeEventListener('click', displaySymbol); //make them unclickable
    pair[1].removeEventListener('click', displaySymbol);
    if (totalOpenedCards === 16) { //game is won, ie all 16 cards turned over
        myStopFunction(); // stop timer when game finished
        clearIcons(); //clear the icons (esp so you can see Reveal version image (if active) after modal closes.)
    }
}


/*hide incorrect pair by removing open / show classes. reset pair array to 0.*/
function hideSymbol() {
    pair[0].classList.remove("open", "show");
    pair[1].classList.remove("open", "show");
    pair = [];
}

/*increment 'Moves' counter only after 2 cards have been turned over*/
function moveCounter() {
    moves++;
    (moves === 2) ? (document.querySelector('.moves').innerText = moves / 2 + " Move") : (moves % 2 === 0) ? (document.querySelector('.moves').innerText = (moves / 2 + " Moves")) : "" /*(console.log("This must be Odd"))*/ ;
}

/*remove stars rating at various #'s of moves. Don't remove star if they make a match. */
function starCounter() {
    let stars = document.querySelector('.stars');
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

/*Modal for win message*/
function displayWinMsg() {
    let modal = document.getElementById('winModal');

    // close button
    let span = document.getElementsByClassName("close")[0];

    //open the modal
    modal.style.display = "block";

    //add star rating, moves & time to modal
    let congrats = document.querySelector(".congrats");
    let stats = document.createElement('div');
    stats.className = 'stats';
    let starCount = document.querySelector(".stars").getElementsByTagName("li").length
    stats.innerHTML = `<p>You have ${starCount} Stars in ${(moves+1)/2} Moves</p><p>Time: ${parseInt(totalSec/60)%60} min : ${totalSec%60} sec</p>`;
    congrats.appendChild(stats);

    //close the modal when x is clicked
    span.onclick = function() {
        modal.style.display = "none";
    }

    // close if clicked outside of modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}


/*
 *checks to see if reveal-mode is 'active'.
 *If reveal-mode active, show modal then clear icons to reveal picture when it is closed; otherwise, just display modal & restart game when modal is closed
 */
function clearIcons() {
    let i;
    let a = document.getElementById("reveal-mode");
    if (a.classList.contains("active")) {
        //remove all icons for reveal mode active
        let el = document.querySelectorAll(".card");
        for (i = 0; i < el.length; i++) {
            el[i].innerHTML = "";
        }
        displayWinMsg();
    } else {
        //display modal and restart game for standard mode
        displayWinMsg();
        startGame();
    }
};


/*stop the timer if it's distracting or the game is done*/
function myStopFunction() {
    clearInterval(myTimer);
}

/*evt listener set on this function, on window resize
*applies responsive background image (backgroundImage) for reveal mode
*/
function responsiveBG() {
    let el = document.querySelector('.deck');
    if (el.classList.contains("reveal")) {
        //if in reveal mode, select responsive background image
        if (screenWidths[0].matches) {
            console.log(" (max-width: 480px)");
            el.style.backgroundImage = "url(./img/" + randomImage + "-480.jpg)";
        } else if (screenWidths[1].matches) {
            console.log(" (max-width: 640px)");
            el.style.backgroundImage = "url(./img/" + randomImage + "-640.jpg)";
        } else if (screenWidths[2].matches) {
            console.log(" (max-width: 768px)");
            el.style.backgroundImage = "url(./img/" + randomImage + "-768.jpg)";
        } else if (screenWidths[3].matches) {
            console.log(" (min-width: 769px)");
            el.style.backgroundImage = "url(./img/" + randomImage + "-1024.jpg)";
        }
        el.style.backgroundRepeat = "no-repeat";
        el.style.backgroundSize = "cover";
    } else {
        return false;
    }
}

/*
 *REVEAL background image version of game.
 *Cycles through backGroundMix1 array
 */
function reveal() {
    /*Note : initial value of 'this' is document.getElementById('reveal-mode');*/
    let currentIndex = backGroundMix1.length;
    let el = document.querySelector('.deck');
    //if reveal-mode active (red), change to standard mode.
    if (this.classList.contains("active")) {
        this.classList.remove("active");
        el.classList.remove("reveal");
        el.removeAttribute('style', 'background-image');
        startGame();

    } else {

        //add reveal mode & styling.
        this.classList.add("active");
        el.classList.add("reveal");
        responsiveBG();
    }
}

/*********************************************
 *Event Listeners for game options:
 *restart, reveal mode, timer, & FontMix dropdown
 *add event listeners to screeWidths for background Images in reveal mode
 *********************************************/

/*add evt listeners for responsive background when in 'reveal' mode*/
document.addEventListener("DOMContentLoaded", function(e) {
    for (var i = 0; i < screenWidths.length; i++) {
        screenWidths[i].addListener(responsiveBG);
    }
});

/*start game*/
startGame();

//restart game button
document.querySelector('.restart').addEventListener('click', startGame);

//REVEAL background image version of the game button
document.getElementById('reveal-mode').addEventListener('click', reveal);

//stop timer if it's bugging you or distracting
document.querySelector('.timer').addEventListener('click', myStopFunction);

//choose font mix for game, dropdown menu --- fontMix (1 - 4)
document.getElementById('dropdown').addEventListener('change', function() {
    let x = this.value;
    startGame(x);
});