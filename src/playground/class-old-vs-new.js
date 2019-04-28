class OldSyntax {
  constructor() {
    this.name = 'Mike';
  }
  sayHi() {
    console.log(`Hi, my name is ${this.name}.`); 
  }
}
const oldSyntax = new OldSyntax();
console.log(oldSyntax); // OldSyntax {name: "Mike"}

console.log(oldSyntax.sayHi()); // Hi, my name is Mike.

const greeting = oldSyntax.sayHi();
console.log(greeting); // error because this binding wa s broken


// ============== //

class NewSyntax {
  name = 'Jenn';
  // use arrow function because it doesn't have it's own this value so therefore uses parent's, no need to explicitly bind this
  sayHi = () => {
    console.log(`Hi, my name is ${this.name}.`);
  }
}
const newSyntax = new NewSyntax();
console.log(newSyntax); // NewSyntax {name: "Jenn"}

const sayHiBetter = newSyntax.sayHi();
console.log(sayHiBetter); // Hi, my name is Jenn.

