const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const bunnys = document.querySelectorAll('.bunny');

let lastHole;

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
  const time = randomTime(350, 1000);
  const hole = randomHole(holes);
  hole.classList.add('up');
}
