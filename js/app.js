
const card = document.querySelectorAll('.card');
const cardBody = document.querySelectorAll('.card-body');
const cardImage = document.querySelectorAll('i');
let deckOfCards = [], shuffleCards = [];


for(let singleCard in cardBody){
  while(shuffleCards.length < 16){
    let randomNum = Math.floor(Math.random() * card.length);
    if(shuffleCards.indexOf(randomNum) > -1){
      continue;
    }
    shuffleCards[shuffleCards.length] = randomNum;
    deckOfCards.push(cardBody[randomNum]);
  }
}

for(let cards in deckOfCards){
  card[cards].append(deckOfCards[cards]);
  cardBody[cards].addEventListener('click', function() {
    cardBody[cards].classList.toggle('flipped');
  });
}
