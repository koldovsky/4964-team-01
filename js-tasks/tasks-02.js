// String to array https://www.codewars.com/kata/convert-a-string-to-an-array/train/javascript
function stringToArray(string) {
  return string.split(" ");
}

// DNA to RNA https://www.codewars.com/kata/dna-to-rna-conversion/train/javascript
// Oleksandr Sydorskyi
function DNAtoRNA(dna) {
  return dna.replaceAll("T", "U");
}

// Find Maximum and Minimum Values of a List https://www.codewars.com/kata/577a98a6ae28071780000989/train/javascript
// Anastasiia Boiko
var min = function (list) {
  list.sort((a, b) => a - b);
  return list[0];
};
var max = function (list) {
  list.sort((a, b) => a - b);
  list.reverse();
  return list[0];
};

// Smallest value of an array https://www.codewars.com/kata/544a54fd18b8e06d240005c0/train/javascript
// Oleksandr Sydorskyi
function min(arr, toReturn) {
  let min = Math.min(...arr);
  return toReturn === "value" ? min : arr.indexOf(min);
}
