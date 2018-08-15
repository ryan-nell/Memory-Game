
const card = document.querySelectorAll('.card');
const cardBody = document.querySelectorAll('.card-body');
const cardImage = document.querySelectorAll('i');
const stars = document.querySelectorAll('.fa-star');
const moves = document.querySelector('.move-counter');


//shuffle the cards when the page loads
document.body.onload = shuffleDeckOfCards();

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

function disableAll(){
    Array.prototype.filter.call(deckOfCards, function(card){
        card.parentElement.classList.add('disabled');
    });
}

function enableUnmatched(){
    Array.prototype.filter.call(deckOfCards, function(card){
        card.parentElement.classList.remove('disabled');
      });
      disableMatched();
}

function disableMatched(){
  for(let i = 0; i < finalArray.length; i++){
    let parentCard = finalArray[i].closest('.card');
    parentCard.classList.add('disabled');
  }
}

//Show Modal
function showModal(){
  $("#game-over-modal").modal();
}
