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



let numbers: number[] = [1, 2, 3, 4, 5];
let fruits: string[] = ["apple", "banana", "orange", "mango"];
let mixedPrices: number[] = [10.99, 5.99, 3.99, 8.99, 15.99];
let names: string[] = ["John", "Jane", "Bob", "Alice"];

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

let lastNumber = numbers.pop();
console.log("Popped number:", lastNumber);
console.log("Numbers after pop:", numbers);

let lastFruit = fruits.pop();
console.log("Popped fruit:", lastFruit);
console.log("Fruits after pop:", fruits);

// 3. Shift Method

let firstNumber = numbers.shift();
console.log("Shifted number:", firstNumber);
console.log("Numbers after shift:", numbers);

// 4. Unshift Method

numbers.unshift(1);
console.log("Numbers after unshifting 1:", numbers);

// 5. Map Method

let doubledNumbers = numbers.map((num: number) => num * 2);
console.log("Doubled numbers:", doubledNumbers);

let upperFruits = fruits.map((fruit: string) => fruit.toUpperCase());
console.log("Uppercase fruits:", upperFruits);

// 6. ForEach Method

console.log("Printing each price with $:");
mixedPrices.forEach((price: number) => {
    console.log(`$${price}`);
});

// 7. Filter Method

let evenNumbers = numbers.filter((num: number) => num % 2 === 0);
console.log("Even numbers only:", evenNumbers);

let expensiveItems = mixedPrices.filter((price: number) => price > 10);
console.log("Expensive items (>$10):", expensiveItems);

// 8. Reduce Method
let sum = numbers.reduce((acc: number, curr: number) => acc + curr, 0);
console.log("Sum of numbers:", sum);

let totalPrice = mixedPrices.reduce((acc: number, curr: number) => acc + curr, 0);
console.log("Total price:", totalPrice.toFixed(2));

// 9. Slice Method

let portionOfNumbers = numbers.slice(1, 4);
console.log("Portion of numbers (index 1-3):", portionOfNumbers);

let portionOfNames = names.slice(1, 3);
console.log("Portion of names (index 1-2):", portionOfNames);

// 10. Splice Method

// Remove 2 elements starting from index 1
let removedNames = names.splice(1, 2);
console.log("Removed names:", removedNames);
console.log("Names after splice removal:", names);

// Add new elements at index 1
names.splice(1, 0, "Sarah", "Mike");
console.log("Names after adding Sarah and Mike:", names);

// combining multiple methods
let result = numbers
    .filter(num => num > 2)          
    .map(num => num * 3)             
    .reduce((acc, curr) => acc + curr, 0); 

console.log("Complex operation result:", result);

// Working with objects
interface Person {
    name: string;
    age: number;
}

let people: Person[] = [
    { name: "Ram", age: 25 },
    { name: "Shyam", age: 30 },
    { name: "Geeta", age: 20 }
];

let adults = people
    .filter(person => person.age >= 25)
    .map(person => person.name);

console.log("Names of people 25 or older:", adults);




// function example to validate type


function processInput(input: string | number | boolean | number[]): void {
    if (typeof input === "string") {
        console.log(`String length: ${input.length}`);
    } else if (typeof input === "number") {
        console.log(`Rounded number: ${Math.round(input)}`);
    } else if (typeof input === "boolean") {
        console.log(input ? "Boolean is true" : "Boolean is false");
    } else if (Array.isArray(input) && input.every(num => typeof num === "number")) {
        const sum = input.reduce((acc, num) => acc + num, 0);
        console.log(`Sum of array: ${sum}`);
    } else {
        // Error for any other type that doesn't match the allowed types
        console.log("Invalid type provided");
        throw new Error("Invalid input type");
    }
}

// Valid Inputs

console.log("ProcessInput Function----------->")

processInput("Hello");            
processInput(42.7);               
processInput(true);               
processInput([1, 2, 3, 4, 5]);   

// below are the invalid input Invalid Inputs which will go into else part 

// processInput(["a", 2, 3]);        
// processInput({ key: "value" });   
// processInput(undefined);          
