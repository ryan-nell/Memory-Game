
const card = document.querySelectorAll('.card');
const cardBody = document.querySelectorAll('.card-body');
const cardImage = document.querySelectorAll('i');
const stars = document.querySelectorAll('.fa-star');
const moves = document.querySelector('.move-counter');
const timerDiv = document.querySelector('.timer');

let deckOfCards = [], shuffleCards = [], matchCards = [], finalArray = [];
let firstCard, secondCard, timer, counter = 0, totalStars = 3;

//shuffle the cards when the page loads
document.body.onload = shuffleDeckOfCards();
startTimer();
//function to shuffle cards
function shuffleDeckOfCards(){
  //loop using length of cardbody
  for(let singleCard in cardBody){
    while(shuffleCards.length < 16){
      //use math.random to generate a random numbers up to 16
      let randomNum = Math.floor(Math.random() * card.length);
      //Make sure numbers are unique
      if(shuffleCards.indexOf(randomNum) > -1){
        continue;
      }
      shuffleCards[shuffleCards.length] = randomNum;
      deckOfCards.push(cardBody[randomNum]);
    }
  }
  // loop through each card within the deckOfCards array and append the newly
  // shuffled cards to the card container
  for(let cards in deckOfCards){
    //Add shuffled cards to the card containers
    card[cards].append(deckOfCards[cards]);
    cardBody[cards].addEventListener('click', function() {
      cardBody[cards].classList.add('flipped');
      cardBody[cards].parentElement.classList.add('disabled');
      //Add cards to an array for comparison
      matchCards.push(cardImage[cards]);
      //console.log(matchCards)
      checkCards();
    });

  }
}

//Fucntion to check if cards match
function checkCards(){
  if(matchCards.length == 2){

    firstCard = matchCards[0];
    secondCard = matchCards[1];

    //Call moves counter to update number of moves made
    movesCounter();

    if(firstCard.className == secondCard.className){
      //Loop through matched cards and push them to finalArray
      for(let populate in matchCards){
        finalArray.push(matchCards[populate]);
        //if Array has 16 Elements, call showModal function
        if(finalArray.length == 16){
          showModal();
        }
      }
      console.log(finalArray);
      match();
    }
    else{
      unmatched();
      console.log('Cards do not Match');
    }
    matchCards = [];
  }
}

//Add a mactched class to the divs if the cards match after 800ms
function match(){
  setTimeout(function(){
    let firstGreatGrandParent = firstCard.closest('.card');
    let secondGreatGrandParent = firstCard.closest('.card');

    firstCard.parentElement.classList.add('matched');
    secondCard.parentElement.classList.add('matched');

    firstGreatGrandParent.classList.add('disabled');
    secondGreatGrandParent.classList.add('disabled');
  }, 800);

}

//Funtion to change classes if cards are unmatched
function unmatched(){

  //timeout function to add miss-match class after 800ms
  setTimeout(function(){
    firstCard.parentElement.classList.add('miss-match');
    secondCard.parentElement.classList.add('miss-match');

  }, 800);
  disableAll();
  //timeout function to remove miss-match class after 1200ms
  setTimeout(function(){
    firstCard.parentElement.classList.remove('miss-match');
    secondCard.parentElement.classList.remove('miss-match');

  }, 1300);

  //timeout function to remove flipped class after 1000ms
  setTimeout(function(){
    firstGrandParent =  firstCard.closest('.card-body');
    secondGrandParent = secondCard.closest('.card-body');
    enableUnmatched();
    firstGrandParent.classList.remove('flipped');
    secondGrandParent.classList.remove('flipped');
    console.log('try again');

  }, 1000);
  matchCards = [];
  console.log(matchCards);
}

//Function to disable all cards
function disableAll(){
    Array.prototype.filter.call(deckOfCards, function(card){
        card.parentElement.classList.add('disabled');
    });
}

//Funtion to re-enable any cards that have not been matched
function enableUnmatched(){
    Array.prototype.filter.call(deckOfCards, function(card){
        card.parentElement.classList.remove('disabled');
      });
      disableMatched();
}

//function to disable any cards that have a matching pair
function disableMatched(){
  for(let i = 0; i < finalArray.length; i++){
    let parentCard = finalArray[i].closest('.card');
    parentCard.classList.add('disabled');
  }
}

//Show Modal function
function showModal(){
  $("#game-over-modal").modal();
  stopTimer();
  results();
}

//Function to update the move counter
function movesCounter(){
  counter++;
  moves.innerHTML = `Moves Made: ${counter}`;
  console.log(counter);
  updateStars();
}

//Function to change the stars classes after certain amount of moves
function updateStars(){
  for(let star in stars){
    if(counter > 8 && counter < 15){
      stars[2].classList.add('star-colour');
      totalStars = 2;
    }
    if(counter > 16 && counter < 23){
      stars[1].classList.add('star-colour');
      totalStars = 1;
    }
    if(counter > 24){
      stars[0].classList.add('star-colour');
      totalStars = 0;
    }
  }
}

//function to start the timer
function startTimer(){
  let s1 = 0, s2 = 0, m1 = 0, m2 = 0, h1 = 0, h2 = 0;

  //Select each div for seconds, minutes and hours by their classes
  let sec1 = document.querySelector(".sec1");
  let sec2 = document.querySelector(".sec2");

  let min1 = document.querySelector(".min1");
  let min2 = document.querySelector(".min2");

  let hr1 = document.querySelector(".hr1");
  let hr2 = document.querySelector(".hr2");

  //Set interval to increment the timer every one second to have a clock like display
  timer = setInterval(function(){
    //Set the innerHTML of each div to update the timer
    sec1.innerHTML = s1;
    sec2.innerHTML = s2;

    min1.innerHTML = m1;
    min2.innerHTML = m2;

    hr1.innerHTML = h1;
    hr2.innerHTML = h2;

    //increment each variable based on the time that has elapsed
    s1++;
    if(s1 == 10){
      s2++;
      s1 = 00;
    }
    if(s2 == 6){
      m1++;
      s2 = 00;
    }
    if(m1 == 10){
      m2++;
      m1 = 00;
    }
    if(m2 == 6){
      h1++;
      m2 = 00;
    }
    if(h1 == 10){
      h2++;
      h1 = 00;
    }
  }, 1000);
}

//Function to stop timer by clearing the interval
function stopTimer(){
  clearInterval(timer);
}

//Function to reload page
function reloadPage(){
  location.reload();
}

//function to display stats in the modal view
function results(){
  totalMoves = moves.innerHTML;
  totalTime = timerDiv.innerHTML;

  let modalStars = document.querySelector('.total-stars');
  let modalTimer = document.querySelector('.total-time');
  let modalMoves = document.querySelector('.total-moves');

  modalMoves.innerHTML = totalMoves;
  modalTimer.innerHTML = totalTime;
  modalStars.innerHTML = `Stars remaining: ${totalStars}`

}
