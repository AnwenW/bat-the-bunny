const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const bunnys = document.querySelectorAll('.bunny');
const countdownNum = document.querySelector('#countdown');

let lastHole;
let timeUp = false;
let score = 0;
let timeleft = 10;

//// Function to give random amount of time (rounded) between min and max ////

function randomTime (min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

//// Pick a random hole for bunny to popout from (takes in a list of 'holes', be could be any list of DOM elements) ////

function randomHole(holes) {
  // console.log(holes); // holes is a NodeList that contains all 6 holes, so need to find random index between 0 and 5
  const index = Math.floor(Math.random() * holes.length);
  const hole = holes[index];
  // console.log(hole); // now need to prevent the same hole twice in a row!

  if (hole === lastHole) {
    // console.log('Same hole!');
    return randomHole(holes);
  }

  lastHole = hole;
  return hole;
}

//// Get bunnies to pop up from holes at random time intervals, adding class setting CSS top:0, and removing class after timeout ////

function peep() {
  const time = randomTime(300, 1000);
  const hole = randomHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    // then run peep(); again, but need a timeout or will run indefinitely:
    if (!timeUp) peep();
  }, time);
}

function startGame() {
  scoreBoard.textContent = 0;
  timeleft = 10;
  timeUp = false; // set on page load, but reset here in case new game
  score = 0;
  peep();
  setTimeout(() => timeUp = true, 10000);
  countdownTimer();
}

function countdownTimer() {

  var timer = setInterval(function() {
      timeleft--;
      countdownNum.textContent = timeleft;
      if (timeleft <= 0)
        clearInterval(timer);
  }, 1000); // time 1s between numbers counting down

  setTimeout(() => {
      countdownNum.textContent = '10';
  }, 12000) // time until timer resets to 10s

}

function bat(e) {
  // Check that click event is genuine (true), not simulated in JavaScript
  if(!e.isTrusted) return; // cheater
  score++;
  this.classList.remove('up');
  scoreBoard.textContent = score;
}

bunnys.forEach(bunny => bunny.addEventListener('click', bat));
