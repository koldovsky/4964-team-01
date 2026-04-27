//Geometry Basics: Circle Circumference in 2D  https://www.codewars.com/kata/geometry-basics-circle-circumference-in-2d/train/javascript
// Vladyslav Tupikin
function circleCircumference(circle) {
  const diameter = 2 * circle.radius;
  const circumference = diameter * Math.PI;
  return circumference;
}

//Training JS #12: loop statement --for..in and for..of  https://www.codewars.com/kata/training-js-number-12-loop-statement-for-dot-in-and-for-dot-of/train/javascript
// Vladyslav Tupikin
function giveMeFive(obj) {
  let giveMeFiveArr = [];
  const wordSize = 5;

  for (key in obj) {
    if (key.length === wordSize) {
      giveMeFiveArr.push(key);
    }

    if (obj[key].length === wordSize) {
      giveMeFiveArr.push(obj[key]);
    }
  }

  return giveMeFiveArr;
}

//Understanding closures - the basics https://www.codewars.com/kata/understanding-closures-the-basics/train/javascript
function buildFun(n) {
  let res = [];

  for (let i = 0; i < n; i++) {
    res.push(function () {
      return i;
    });
  }
  return res;
}

//Fun with ES6 Classes #2 - Animals and Inheritance https://www.codewars.com/kata/fun-with-es6-classes-number-2-animals-and-inheritance/train/javascript
class Shark extends Animal {
  constructor(name, age, status) {
    super(name, age, 0, "shark", status);
  }
}

class Cat extends Animal {
  constructor(name, age, status) {
    super(name, age, 4, "cat", status);
  }

  introduce() {
    return `${super.introduce()}  Meow meow!`;
  }
}
class Dog extends Animal {
  constructor(name, age, status, master) {
    super(name, age, 4, "dog", status);
    this.master = master;
  }

  greetMaster() {
    return `Hello ${this.master}`;
  }
}
