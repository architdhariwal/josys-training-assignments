// Array Methods:
// 1. Push
// 2. Pop
// 3. Unshift
// 4. Shift
// 5. Map
// 6. Filter
// 7. Reduce
// 8. Slice
// 9. Splice
// 10. forEach
var numbers = [1, 2, 3, 4, 5];
var fruits = ["apple", "banana", "orange", "mango"];
var mixedPrices = [10.99, 5.99, 3.99, 8.99, 15.99];
var names = ["John", "Jane", "Bob", "Alice"];
console.log("-------- Original Arrays --------");
console.log("Numbers:", numbers);
console.log("Fruits:", fruits);
console.log("Prices:", mixedPrices);
console.log("Names:", names);
// 1. Push Method
numbers.push(6);
console.log("Numbers after pushing 6:", numbers);
fruits.push("grape");
console.log("Fruits after pushing grape:", fruits);
// 2. Pop Method
var lastNumber = numbers.pop();
console.log("Popped number:", lastNumber);
console.log("Numbers after pop:", numbers);
var lastFruit = fruits.pop();
console.log("Popped fruit:", lastFruit);
console.log("Fruits after pop:", fruits);
// 3. Shift Method
var firstNumber = numbers.shift();
console.log("Shifted number:", firstNumber);
console.log("Numbers after shift:", numbers);
// 4. Unshift Method
numbers.unshift(1);
console.log("Numbers after unshifting 1:", numbers);
// 5. Map Method
var doubledNumbers = numbers.map(function (num) { return num * 2; });
console.log("Doubled numbers:", doubledNumbers);
var upperFruits = fruits.map(function (fruit) { return fruit.toUpperCase(); });
console.log("Uppercase fruits:", upperFruits);
// 6. ForEach Method
console.log("Printing each price with $:");
mixedPrices.forEach(function (price) {
    console.log("$".concat(price));
});
// 7. Filter Method
var evenNumbers = numbers.filter(function (num) { return num % 2 === 0; });
console.log("Even numbers only:", evenNumbers);
var expensiveItems = mixedPrices.filter(function (price) { return price > 10; });
console.log("Expensive items (>$10):", expensiveItems);
// 8. Reduce Method
var sum = numbers.reduce(function (acc, curr) { return acc + curr; }, 0);
console.log("Sum of numbers:", sum);
var totalPrice = mixedPrices.reduce(function (acc, curr) { return acc + curr; }, 0);
console.log("Total price:", totalPrice.toFixed(2));
// 9. Slice Method
var portionOfNumbers = numbers.slice(1, 4);
console.log("Portion of numbers (index 1-3):", portionOfNumbers);
var portionOfNames = names.slice(1, 3);
console.log("Portion of names (index 1-2):", portionOfNames);
// 10. Splice Method
// Remove 2 elements starting from index 1
var removedNames = names.splice(1, 2);
console.log("Removed names:", removedNames);
console.log("Names after splice removal:", names);
// Add new elements at index 1
names.splice(1, 0, "Sarah", "Mike");
console.log("Names after adding Sarah and Mike:", names);
// combining multiple methods
var result = numbers
    .filter(function (num) { return num > 2; })
    .map(function (num) { return num * 3; })
    .reduce(function (acc, curr) { return acc + curr; }, 0);
console.log("Complex operation result:", result);
var people = [
    { name: "Ram", age: 25 },
    { name: "Shyam", age: 30 },
    { name: "Geeta", age: 20 }
];
var adults = people
    .filter(function (person) { return person.age >= 25; })
    .map(function (person) { return person.name; });
console.log("Names of people 25 or older:", adults);
// function example to validate type
function processInput(input) {
    if (typeof input === "string") {
        console.log("String length: ".concat(input.length));
    }
    else if (typeof input === "number") {
        console.log("Rounded number: ".concat(Math.round(input)));
    }
    else if (typeof input === "boolean") {
        console.log(input ? "Boolean is true" : "Boolean is false");
    }
    else if (Array.isArray(input) && input.every(function (num) { return typeof num === "number"; })) {
        var sum_1 = input.reduce(function (acc, num) { return acc + num; }, 0);
        console.log("Sum of array: ".concat(sum_1));
    }
    else {
        // Error for any other type that doesn't match the allowed types
        console.log("Invalid type provided");
        throw new Error("Invalid input type");
    }
}
// Valid Inputs
console.log("ProcessInput Function----------->");
processInput("Hello");
processInput(42.7);
processInput(true);
processInput([1, 2, 3, 4, 5]);
// below are the invalid input Invalid Inputs which will go into else part 
// processInput(["a", 2, 3]);        
// processInput({ key: "value" });   
// processInput(undefined);          
