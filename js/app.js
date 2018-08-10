
const card = document.querySelectorAll('.card');
const cardBody = document.querySelectorAll('.card-body');
const cardImage = document.querySelectorAll('i');
let deckOfCards = [], shuffleCards = [], matchCards = [];
let firstCard, secondCard;

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
      cardBody[cards].classList.toggle('flipped');

      matchCards.push(cardImage[cards]);
      console.log(matchCards)
      checkCards();
    });
  }
  console.log(deckOfCards);
}

//Fucntion to check if cards match
function checkCards(){
  //Add cards to an array for comparison

  if(matchCards.length == 2){

    firstCard = matchCards[0];
    secondCard = matchCards[1];

    if(firstCard.className == secondCard.className){

      console.log(matchCards);
      console.log('Cards Match');

    }
    else{
      //cardsDontMatch();
      console.log('Cards do not Match');
    }
    matchCards = [];
  }
}
