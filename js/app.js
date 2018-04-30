// Create a list that holds all of your cards

const cardsList = document.querySelectorAll('.card');
const cardsListArr = Array.from(cardsList);
let cardsListArrShuffled;
var cardOpen = [];
let cardSelected;
let moveCounter = 0;
let startingTime;
let endingTime;
let totalTime;
let timerStarted = false;

// intitial card shuffle
restart();

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided 'shuffle' method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// New game/ restart

const restartSelector = document.querySelector('.restart');

restartSelector.addEventListener('click', restart);

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
  const moveSelector = document.querySelector('.moves');
  moveCounter = 0;
  moveSelector.innerHTML = moveCounter;
}

function resetCards(array) {
  for (var i = 0; i < array.length; i++) {
    array[i].setAttribute('class', 'card');
  }
}

function resetFoundPairs() {
  foundPairs = 0;
}

function restart() {
  resetCards(cardsList);
  cardsListArrShuffled = shuffle(cardsListArr);
  const deckNode = document.querySelector('.card').parentNode;

  while (deckNode.firstChild) {
    deckNode.removeChild(deckNode.firstChild);
  }

  for (i = 0; i < cardsListArr.length; i++) {
    deckNode.appendChild(cardsListArrShuffled[i]);
  }

  resetMoves();
  cardsEventListener();
  resetFoundPairs();
  stars();
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of 'open' cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//add EventListener

function cardsEventListener() {
  // remove EventListener
  $('li').off();

  //add EventListener

  $('.card').not('.open').not('.show').not('.match').not('.fa').on('click', open);
}

cardsEventListener();

function moves() {
  const moveSelector = document.querySelector('.moves');
  ++moveCounter;
  moveSelector.innerHTML = moveCounter;

}

function openCards(card) {

  cardOpen.push(card);
}

function lockCards() {

  cardOpen[0].setAttribute('class', 'card match');
  cardOpen[1].setAttribute('class', 'card match');
  cardOpen = [];
  moves();
  stars();

  // activate cardsEventListener

  cardsEventListener();
}

function removeCards() {
  resetCards(cardOpen);
  cardOpen = [];
  moves();
  stars();

  // activate cardsEventListener

  cardsEventListener();
}

function gameWon() {

  function isMatch(cards) {
    return cards.className === 'card match';
  }

  let matchedCards = cardsListArr.filter(isMatch);
  if (matchedCards.length === 16) {
    endingTime = performance.now();
    totalTime = endingTime - startingTime;
    const textModal = document.querySelector('.modal-moves-stars-time');
    let starsWon = document.querySelectorAll('.fa-star:not(#modal-stars-won)').length;
    textModal.innerHTML = 'With ' + moveCounter + ' Moves and ';

    if (starsWon > 0) {
      for (var i = 0; i < starsWon; i++) {
        alert(i);
        let starElement = document.createElement("LI");
        starElement.setAttribute('id', 'modal-stars-won');
        starElement.setAttribute('class', 'fa fa-star');
        textModal.appendChild(starElement);
      }

    } else {
      let starElement = document.createElement("LI");
      starElement.setAttribute('class', 'fa fa-star-o');
      textModal.appendChild(starElement);
    }
    modal.style.display = 'block';

  }
}

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

function startTimer() {
  if (timerStarted === false) {
    startingTime = performance.now();
    timerStarted = true;
  }

}

function open() {
  cardSelected = $(event.target);
  cardSelected = cardSelected[0];
  cardSelected.setAttribute('class', 'card open show');
  openCards(cardSelected);
  startTimer();
  cardsEventListener();

  if (cardOpen.length === 2) {
    // delete all cardListener
    $('li').off();
    if (cardOpen[0].childNodes[1].className === cardOpen[1].childNodes[1].className) {
      lockCards();
      ++foundPairs;
      gameWon();
    } else {
      cardOpen[0].setAttribute('class', 'card open show wrong');
      cardOpen[1].setAttribute('class', 'card open show wrong');
      setTimeout(function() {
        removeCards();

      }, 300);
    }
  }
}

function stars() {
  let starSelector = document.querySelector('.stars');

  switch (true) {

    case (moveCounter >= 20):
      starSelector.children[0].firstElementChild.setAttribute('class', 'fa fa-star-o');
      break;
    case (moveCounter >= 15):
      starSelector.children[1].firstElementChild.setAttribute('class', 'fa fa-star-o');
      break;
    case (moveCounter >= 9):
      starSelector.children[2].firstElementChild.setAttribute('class', 'fa fa-star-o');
      break;
    default:
      starSelector.children[0].firstElementChild.setAttribute('class', 'fa fa-star');
      starSelector.children[1].firstElementChild.setAttribute('class', 'fa fa-star');
      starSelector.children[2].firstElementChild.setAttribute('class', 'fa fa-star');
  }

}

// Get the modal
const modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
const span = document.getElementsByClassName('close')[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

function closeModal() {
  restart();
  modal.style.display = 'none';
}

//listener of new game button
document.getElementById('modal-new-game-button').addEventListener('click', closeModal);