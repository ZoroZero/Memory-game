const cards = document.querySelectorAll('.card');
let hasCardFlipped = false;
let lockBoard = false;
let firstCard, secondCard;
let numCardFlip = 0;
function flipCard() {
  this.classList.add('flip');
  if(lockBoard) 
    return; 

  if(firstCard == this){
    return;
  }

  if(!hasCardFlipped){
    firstCard = this;
    hasCardFlipped = true;
    return;
  }
 
  secondCard = this;
  hasCardFlipped = true;
  checkForMatch();
  checkforEndGame();
}

function checkForMatch(){
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  if(isMatch){
    flip2Card();
  }
  else{
    unFlipCard();
  }
}


function flip2Card(){
  console.log(firstCard.dataset.framework);
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  numCardFlip += 2;
  reset();
}

function unFlipCard(){
  lockBoard = true;
  setTimeout(()=>{
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    lockBoard = false;
    reset();
  },500);
  
}

function reset(){
  lockBoard = false;
  hasCardFlipped = false;
  [firstCard, secondCard] = [null,null];
}

function checkforEndGame(){
  let endGame = numCardFlip == cards.length;
  if(endGame){
    showEndScene();
  }
  return;
}

function showEndScene(){
  document.querySelector(".endgame").style.display = "block";
  document.querySelector(".endgame .text").innerText = "You win";
}



function shuffleCard(){
  cards.forEach(card => {
    let ramdomPos = Math.floor(Math.random() * 12);
    card.style.order = ramdomPos;
  });
}

function flipAllCard(){
  cards.forEach(card => {card.classList.add('flip')})
  setTimeout(() => {cards.forEach(card => {card.classList.remove('flip')})}, 1000);
}

function startGame(){
  document.querySelector(".endgame").style.display = "none";
  for(let i = 0; i< cards.length; i++){
    if(cards[i].classList.contains('flip')){
      cards[i].classList.remove('flip');
    }
  }
  reset();
  numCardFlip = 0;
  shuffleCard();
  flipAllCard();
}

shuffleCard();
flipAllCard();
document.getElementById("replay_butt").addEventListener('click', startGame);
cards.forEach(card => card.addEventListener('click', flipCard));