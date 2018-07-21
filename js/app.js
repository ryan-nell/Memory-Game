const cardBody = document.querySelectorAll('.card-body');

for(let i = 0; i < cardBody.length; i++){
  cardBody[i].addEventListener('click', function() {
    cardBody[i].classList.toggle('flipped');
  });
}
