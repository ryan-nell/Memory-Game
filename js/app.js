
const card = document.querySelectorAll('.card');
const cardBody = document.querySelectorAll('.card-body');
const cardsArray = [], shuffleArray = [];


for(let i = 0; i < cardBody.length; i++){
  cardBody[i].remove();
  while(shuffleArray.length < 16){
    let randomNum = Math.floor(Math.random() * card.length);
    if(shuffleArray.indexOf(randomNum) > -1) continue;
    shuffleArray[shuffleArray.length] = randomNum;
    cardsArray.push(cardBody[randomNum]);
  }
}

for(let j = 0; j < cardsArray.length; j++){
  card[j].append(cardsArray[j]);
  cardBody[j].addEventListener('click', function() {
    cardBody[j].classList.toggle('flipped');
  });
}
