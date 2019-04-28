class Person {
  constructor(name = 'Anonymous', age = 0) {
    this.name = name;
    this.age = age;
  }
  getGreeting() {
    return `Hi, my name is ${this.name}.`;
  }
  getDescription() {
    return `${this.name} is ${this.age} year(s) old.`;
  }
}

class Student extends Person {
  // name and age defaults don't need to be explicitly declared in the subclass
  constructor(name, age, major) {
    // super basically calls the constructor of the parent class
    super(name, age);
    this.major = major;
  }
  hasMajor() {
    return !!this.major;
  }
  getDescription() {
    let description = super.getDescription();

    if(this.hasMajor()) {
      description += ` Their major is ${this.major}.`;
    }

    return description;
  }
}

class Traveler extends Person {
  constructor(name, age, homeLocation) {
    super(name, age);
    this.homeLocation = homeLocation;
  }
  getGreeting() {
    let greeting = super.getGreeting();

    if (this.homeLocation) {
      greeting += ` I'm visiting from ${this.homeLocation}.`;
    }

    return greeting;
  }
}

const Andrew = new Traveler('Andrew Meade', 26, 'Bora Bora');
console.log(Andrew.getGreeting());

const you = new Traveler();
console.log(you.getGreeting());