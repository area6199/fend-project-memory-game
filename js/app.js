/*
 * Create a list that holds all of your cards
 */
let cardsList = document.querySelectorAll(".card");
let cardsListArr = Array.from(cardsList);
let cardsListArrShuffled;
var cardOpen = [];
let cardSelected;
let moveCounter = 0;
let foundPairs = 0;



// intitial card shuffle
restart();

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// New game/ restart

const restartListener = document.querySelector(".restart");
restartListener.addEventListener("click", restart);

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  // array = cardsListArr;
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;

  }

  return array;
}

function resetMoves() {
  const moveSelector = document.querySelector(".moves");
  moveCounter = 0;
  moveSelector.innerHTML = moveCounter;
}

function resetCards(array) {
  for (var i = 0; i < array.length; i++) {
    array[i].setAttribute("class", "card");
  }
}

function restart() {
  resetCards(cardsList);
  cardsListArrShuffled = shuffle(cardsListArr);
  const deckNode = document.querySelector(".card").parentNode;

  while (deckNode.firstChild) {
    deckNode.removeChild(deckNode.firstChild);

  }
  for (i = 0; i < cardsListArr.length; i++) {
    deckNode.appendChild(cardsListArrShuffled[i]);
  }
  resetMoves();
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





//add EventListener

function cardsEventListener() {
  // remove EventListener
  $("li").off();
  //add EventListener
  $('.card').not(".open").not(".show").not(".match").not(".fa").on('click', open);
};

cardsEventListener();

function moves() {
  const moveSelector = document.querySelector(".moves");
  ++moveCounter;
  moveSelector.innerHTML = moveCounter;


}



function openCards(card) {

  cardOpen.push(card);
}

function lockCards() {

  cardOpen[0].setAttribute("class", "card match");
  cardOpen[1].setAttribute("class", "card match");
  cardOpen = [];
  moves();
  // activate cardsEventListener
  cardsEventListener();


}

function removeCards() {
  resetCards(cardOpen);
  cardOpen = [];
  moves();
  // activate cardsEventListener
  cardsEventListener();
}



function open() {


  cardSelected = $(event.target);
  cardSelected = cardSelected[0];
  cardSelected.setAttribute("class", "card open show");
  openCards(cardSelected);

  cardsEventListener();
  if (cardOpen.length === 2) {
    // delete all cardListener
    $("li").off();
    if (cardOpen[0].childNodes[1].className === cardOpen[1].childNodes[1].className) {
      lockCards();
      ++foundPairs;


      if (foundPairs === (cardsList.length / 2)) {

        alert("you won");

      }


    } else {
      setTimeout(function() {
        removeCards();

      }, 300);
    }

  }


}