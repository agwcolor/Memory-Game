const fontMix1 = ["diamond", "anchor", "leaf", "bomb", "paper-plane-o", "bolt", "cube", "bicycle"]
let pair = []; //2 element pair array
let totalOpenedCards = 0; 
let turnedCards = [];
let moves; //total moves if divided by 2
let matches;
let totalSec = 00;
let myTimer;

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
    totalSec = 0;
    /*sec = 00;
    min = 00;
    hour = 00;*/
    totalOpenedCards = 0;

    myStopFunction(); //stop timer if running
    //document.getElementById("timer").innerHTML = `${hour} : ${min} : ${sec}`; 
    document.getElementById("timer").innerHTML = `00 : 00 : 00`; //reset timer to 0

    //reset moves to 0
    document.querySelector('.moves').innerText = "zero Moves";

    //remove match open show classes
    const cards = document.querySelectorAll('.card');

    //clear moves
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

    /*add shuffled font styles to <li> html*/
    for (i = 0; i < cards.length; i++) {
        const cardImage = `<i class="fa fa-${shuffledFonts[i]}"></i>`;
        cards[i].innerHTML = cardImage;
        cards[i].addEventListener('click', displaySymbol);
    }
}

//timer
/*function timer() {
    sec += 1;
    if (sec == 60) {
        min += 1;
        sec = 00;
        if (min == 60) {
            min = 00;
            hour += 1;
        }
    }
    document.getElementById("timer").innerHTML = `${hour} : ${min} : ${sec}`;
}*/

function timer() {

    let hour; let min; let sec;
    totalSec += 1;
    hour = parseInt(totalSec/3600)%24;
    min = parseInt(totalSec/60)%60;
    sec = totalSec%60;

    document.getElementById("timer").innerHTML = 
    ` ${hour< 10 ? (`0${hour}`) : (`${hour}`)} :
      ${min < 10 ? (`0${min}`)  : (`${min}`)}  : 
      ${sec < 10 ? (`0${sec}`)  : (`${sec}`)} 
    ` ;
}


/*document.getElementById("timer").innerHTML = `${hour} : ${min} : ${sec}`;
}*/

function displaySymbol() {
    if (moves === 0) {
        myTimer = setInterval(timer, 1000)
    }; //run timer every second

    /*if (timerActive) {
        hideSymbol() 
    };*/
    if (this.classList.contains("show")) {
        alert("You already clicked that. try another");

    } else {
        this.classList.add("open", "show");
        openCard = this;
        //console.log("This is the value of openCard in displaySymbol function (objectHTMLLIElement)--> " + openCard);
        openCardList(openCard);
    }
}

function openCardList(e) {
    pair.push(e);
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
            lockIntoOpen(pair);
            pair = [];

        } else {
            console.log("Try again"); //add function
            //console.log("this is the array of a " + a);
            //console.log("this is a[0]" + a[0].classList, "This is a[1]" + a[1].classList);
            timerActive = true;
            setTimeout(hideSymbol, 2000);
            turnedCards = [];
            //console.log(e + "  this is what I'm passing to hideSymbol")

        }
    }
    moveCounter();
    starCounter();

}

//lock pair open / remove evt listener / add match class
function lockIntoOpen(a) {
    console.log("it's a match!");
    totalOpenedCards += 2;
    pair[0].classList.add("match");
    pair[1].classList.add("match");
    pair[0].removeEventListener('click', displaySymbol);
    pair[1].removeEventListener('click', displaySymbol);
    console.log(totalOpenedCards + " is total # of cards opened");
    if (totalOpenedCards === 16) {
        myStopFunction(); // stop timer

        displayWinMsg(); // display win message if all cards opened
    }
}

//hide incorrect pair by removing open / show classes. reset pair array a to 0.
function hideSymbol() {
    //console.log("This is the value of a at hideSymbol -->" + a);
    timerActive = false;
    pair[0].classList.remove("open", "show");
    pair[1].classList.remove("open", "show");
    //console.log(" This is a[0]" + a[0].classList, "This is a[1]" + a[1].classList);
    pair = [];

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

    stats.innerHTML =  `<p>${starCount} Stars</p><p>Time: ${min} min : ${sec} sec</p>`;
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

function myStopFunction() {
    console.log("stop the timer!");
    clearInterval(myTimer);
}



//restart button + timer 
startGame(); /*Start Game Over on refresh.  */
document.querySelector('.restart').addEventListener('click', startGame);
document.querySelector('.timer').addEventListener('click', myStopFunction);





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