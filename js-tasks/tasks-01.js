// https://www.codewars.com/kata/5748838ce2fab90b86001b1a/train/javascript

function squareArea(A) {
  const side = (4 * A) / (2 * Math.PI);
  const square = side ** 2;
  return square;
}

//Messi Goals https://www.codewars.com/kata/grasshopper-messi-goals-function/train/javascript
// Generic code everyone used solution below
function goals(laLigaGoals, copaDelReyGoals, championsLeagueGoals) {
  return laLigaGoals + copaDelReyGoals + championsLeagueGoals;
}

//Make negative    https://www.codewars.com/kata/55685cd7ad70877c23000102/train/javascript
// Oleksandr Sydorsky
function makeNegative(num) {
  return num <= 0 ? num : -num;
}

//Game Move https://www.codewars.com/kata/grasshopper-terminal-game-move-function/train/javascript
// Sofia Hrebeniuk
function move(position, roll) {
  return position + roll * 2;
}

//Personalized Message https://www.codewars.com/kata/grasshopper-personalized-message/train/javascript
// Oleksandr Sydorsky
function greet(name, owner) {
  return `Hello ${name === owner ? "boss" : "guest"}`;
}

//Keep Hydrated https://www.codewars.com/kata/keep-hydrated-1/train/javascript
// Vladyslav Tupikin
function litres(time) {
  if (time < 1) return 0;

  if (time >= 1.5) return Math.floor(time * 0.5);

  return 0;
}

//Opposites Attract https://www.codewars.com/kata/555086d53eac039a2a000083/train/javascript
// Prymak Andrii
function lovefunc(flower1, flower2) {
  return flower1 % 2 !== flower2 % 2;
}

// String to array https://www.codewars.com/kata/convert-a-string-to-an-array/train/javascript
// DNA to RNA https://www.codewars.com/kata/dna-to-rna-conversion/train/javascript
// Find Maximum and Minimum Values of a List https://www.codewars.com/kata/577a98a6ae28071780000989/train/javascript
// Smallest value of an array https://www.codewars.com/kata/544a54fd18b8e06d240005c0/train/javascript
