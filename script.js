'use strict';

const elementPlayer0 = document.querySelector('.player--0');
const elementPlayer1 = document.querySelector('.player--1');
const elementScore0 = document.querySelector('#score--0');
const elementCurrent0 = document.querySelector('#current--0');
const elementScore1 = document.getElementById('score--1'); //A bit faster
const elementCurrent1 = document.getElementById('current--1');
const elementDice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');


//Startup vars
function startGame(){
  elementDice.classList.add('hidden');

  playing=true
  document.querySelector(`.player--${currentPlayer}`).classList.remove('player--winner');
  elementScore0.textContent = 0;
  elementScore1.textContent = 0;
  elementCurrent0.textContent = 0;
  elementCurrent1.textContent = 0 ;
  scores[0] = 0;
  scores[1] = 0;
  currentPlayer=0;
  currentScore=0;
  elementPlayer0.classList.add('player--active');
  elementPlayer1.classList.remove('player--active');
}
const scores = [0, 0]; //Player0 and Player1 scores
let currentScore = 0;
let currentPlayer = 0;
let playing = true;

startGame();

function  switchPlayer(){
  currentScore = 0;
  document.getElementById(`current--${currentPlayer}`).textContent = currentScore;
  currentPlayer = currentPlayer === 0 ? 1 : 0 ;
  elementPlayer0.classList.toggle('player--active');
  elementPlayer1.classList.toggle('player--active');
}

btnRoll.addEventListener('click', function () {
  if(!playing) return;
  //1.get rand num
  const dice = Math.trunc(Math.random() * 6) + 1;
  //2.show dice
  elementDice.classList.remove('hidden');
  elementDice.src = `img/dice-${dice}.png`;
  //3. if 1 reset score and pass turn
  if(dice !== 1){
    currentScore += dice;
    document.getElementById(`current--${currentPlayer}`).textContent = currentScore;
  }else {
    switchPlayer();
  }

});

btnHold.addEventListener('click', function (){
  if(!playing) return;

  scores[currentPlayer] += currentScore;
  document.getElementById(`score--${currentPlayer}`).textContent = scores[currentPlayer];

  if (scores[currentPlayer] >= 10){
    document.querySelector(`.player--${currentPlayer}`).classList.add('player--winner');
    document.querySelector(`.player--${currentPlayer}`).classList.remove('player--active');
    elementDice.classList.add('hidden');
    playing = false;
  }else{
  switchPlayer() ;
  }


});

btnNew.addEventListener('click',function (){
  startGame();
});
