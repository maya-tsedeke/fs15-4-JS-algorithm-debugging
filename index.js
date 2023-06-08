/*
1. Fix the bugs in the codes below, to make the console print out different numbers
from 0 to 100
 

const printNum = () => {
    for (var i = 0; i <= 100; i++) {
        setTimeout(() => console.log(i), 1000)
    }
}
Answer: 
The issue with the code is that the setTimeout function creates a closure around the i variable, 
but since var is used to declare the variable, it has a function scope, not a block scope. 
This means that when the callback function is called after the timeout, 
it references the same i variable for all iterations of the loop, 
and by the time the callback is executed, the loop has already completed and i is equal to 101. 
To fix this, we can use let instead of var to declare the i variable, which will give it block scope.

By using let, each iteration of the loop will have its own i variable with a block scope, 
so the callback function will reference the correct value of i for each iteration, 
and the console will print out the numbers from 0 to 100.
Here's the corrected code:
*/
const printNum = () => {
    for (let i = 0; i <= 100; i++) {
        setTimeout(() => console.log(i), 1000);
    }
};

printNum();

/*
2. Given the array below:
myArr = ['12-24-2014', '09-2022-23', '12-30-2021', '08-02-2021', '07-15-2018', '2019-12-14', '2022-14-12']
the array above has serveral dates, written in order month-day-year
Write the code inside function fixDate(array) below to transform the array to new
format dates day-month-year
expected result: ['24-12-2014', '23-09-2022', '30-12-2021', '08-02-2021', '15-07-2018', '14-12-2019', '14-12-2022'] . 
You only need to produce the same array as expected result, no need to consider other 
possibility. 
no mode
 */

let myArr = ['12-24-2014', '09-2022-23', '12-30-2021', '08-02-2021', '07-15-2018', '2019-12-14', '2022-14-12']
const fixDate = (array) => {
    /* provide your code here */
    let newArr = []
    for (let i = 0; i < array.length; i++) {
        let date = array[i]
        if (date.indexOf('-') !== -1) {
            let parts = date.split('-')
            if (parts.length === 3) {
                let newDate = parts[1] + '-' + parts[0] + '-' + parts[2]
                newArr.push(newDate)
            } else {
                newArr.push(date)
            }
        } else {
            newArr.push(date)
        }
    }
    return newArr
}
let newArr = fixDate(myArr)
console.log(newArr)

/*
3. Counter function
Write a counter funtion to print out in console the time difference between 2 given date
Expected result in the console: 11 days - 13 hours - 38 minutes - 20 seconds

Answer:
To calculate the time difference between two dates, you can use the getTime() method of the Date object, 
which returns the number of milliseconds between the date object and midnight January 1 1970.

Here is the corrected code:
*/
const dateFrom = new Date(500000)
const dateTo = new Date(1000000000)
const counter = (from, to) => {
    /* provide your code here */
    const diff = to.getTime() - from.getTime();
    const seconds = Math.floor(diff / 1000 % 60);
    const minutes = Math.floor(diff / 1000 / 60 % 60);
    const hours = Math.floor(diff / 1000 / 60 / 60 % 24);
    const days = Math.floor(diff / 1000 / 60 / 60 / 24);

    return `${days} days - ${hours} hours - ${minutes} minutes - ${seconds} seconds`;
}
const timer = counter(dateFrom, dateTo)
console.log(timer)

/*
4. Provide logic for function generateNewFolderName, which receive an array as argument. Everytime the function gets called,
it should check for folder name. If the folder named 'New Folder' does not exist, it should add the name 'New Folder' to array.
If folder 'New Folder' exists, it should add 'New Folder (1)' to array. If 'New Folder (1)' exists, it should add 'New Folder (2)'
to array, and so on.

Answer:
The function starts by initializing a count variable to 0, and a newName variable to 'New Folder'.
 It then enters a while loop that checks if the existingFolders array includes the current newName.
 If it does, it increments the count and generates a new newName string with the current count value.

The loop continues until it finds a newName that is not in the existingFolders array, 
at which point it returns that name.
*/


const generateNewFolderName = (existingFolders) => {
  let count = existingFolders.length;
  let newName = 'New Folder';

  while (existingFolders.includes(newName)) {
    count++;
    newName = `New Folder (${count})`;
  }

  return newName;
}

let folder = []
console.log(generateNewFolderName(folder)) // Output: "New Folder"
console.log(generateNewFolderName(folder)) // Output: "New Folder (1)"
console.log(generateNewFolderName(folder)) // Output: "New Folder (2)"
console.log(generateNewFolderName(folder)) // Output: "New Folder (3)"
console.log(folder) // Output: []
/*expect to see ['New Folder', 'New Folder (1)', 'New Folder (2)', 'New Folder (3)']*
Note that the console.log(folder) statement at the end will always output an empty array, 
because we are not modifying the original folder array inside the generateNewFolderName function./

/* 5. Write a higher order function in JavaScript called debounce that can be used to debounce a callback function. 
The debounce function should take two arguments: the callback function to debounce and the delay time in milliseconds. 
The debounced function returned by debounce should wait until the delay time has passed before calling the callback function. 
If the debounced function is called again within the delay time, the timer should be reset and the callback function should be called after the delay time has passed. 
Your solution should be implemented in JavaScript without using any third-party libraries or frameworks. 

Answer:
This implementation uses closure to keep track of the timeoutId variable between calls 
to the returned debounced function. 
It uses setTimeout to delay the execution of the callback function and 
clearTimeout to cancel the previous timeout 
if the debounced function is called again within the delay time. Finally, 
it uses apply to call the original callback function with the correct context and arguments.*/

//This is the test code for the debounce function
const debounce = (callback, timer) => {
    //Your code goes here
   let timeoutId;
   
 
   return function() {
     const context = this;
     const args = arguments;
 
     clearTimeout(timeoutId);
 
     timeoutId = setTimeout(() => {
       callback.apply(context, args);
     }, timer);
   };
 };
 
 // Define the function to be debounced
 const logMessage = () => console.log("this should print out only once");
 
 // Call the debounce function and pass in the function and delay time
 const debouncedLogMessage = debounce(logMessage, 1000);
 
 // Call the debounced function multiple times within the delay time
 for (let i = 0; i < 5; i++) {
    debouncedLogMessage();
  }
  
/* 6. Create a function called cacheFunc that takes another function as an argument and returns a new function. 
The new function should cache the result of the original function for each set of arguments that it's called with. 
If the new function is called with the same arguments again, it should return the cached result, instead of calling the original function again. 
The new function should have a cache property that stores the cached results. 

Answer:
This function returns a new function that uses an object cache to store the cached results. 
The cache is indexed by a stringified version of the arguments (JSON.stringify(args)).

If the cache doesn't contain the result for the given arguments, it calls the original function with callback(...args) 
and stores the result in the cache. Subsequent calls with the same arguments will return the cached result.
*/

const cacheFunc = (callback) => {
    //Your code goes here
    const cache = {}
    return (...args) => {
      const key = JSON.stringify(args)
      if (cache[key] === undefined) {
        cache[key] = callback(...args)
      }
      return cache[key]
    }
}

//This is the test code for cacheFunc
const addition = (a, b) => {
    console.log("addition of " + a + " and " + b)
    return a + b
}
const subtraction = (a, b) => {
    console.log("subtraction of " + a + " and " + b)
    return a - b
}
const cacheAddition = cacheFunc(addition)
const cacheSubtraction = cacheFunc(subtraction)
console.log(cacheAddition(10, 5)) // should print out: "addition of 10 and 5" and "15"
console.log(cacheAddition(10, 5)) // should print out: "15"
console.log(cacheAddition(10, 9)) // should print out: "addition of 10 and 9" and "19"
console.log(cacheAddition(10, 9)) // should print out: "19"
console.log(cacheSubtraction(10, 5)) // should print out: "subtraction of 10 and 5" and "5"
console.log(cacheSubtraction(10, 5)) // should print out: "5"

/* 7. Check the code below, fix the bug and complete withMetrics to make the final console.log
print out the expect result 

There are a few issues with the code as written:

The this keyword inside the printInstructions method does not refer to the recipe object, 
because it is an arrow function. We can change it to a regular function to fix this issue.
The withMetrics function needs to return a function that takes in a createRecipe function 
as an argument and returns a modified version of it.
*/
const createRecipe = (name, instructions) => {
    return {
      name,
      instructions,
      printInstructions() {
        console.log(`Instructions for ${this.name}:`);
        console.log(`${this.instructions} for ${this.time} seconds. Contain ${this.calories} calories`);
      }
    };
  };
  //Answer focused here!!
  const withMetrics = (time, calories) => {
    return (createRecipeFunc) => {
      return (name, instructions) => {
        const recipe = createRecipeFunc(name, instructions);
        return {
          ...recipe,
          time,
          calories,
          printInstructions() {
            console.log(`Instructions for ${this.name}:`);
            console.log(`${this.instructions} for ${this.time} seconds. Contain ${this.calories} calories`);
          }
        };
      };
    };
  };
  
  const pancakeRecipe = withMetrics(30, 200)(createRecipe)('Pancakes', 'Mix flour, eggs, and milk. Cook on a griddle.');
  /** Expected result
   * Instructions for Pancakes:
   * Mix flour, eggs, and milk. Cook on a griddle.for 30 seconds. Contain 200 calories
   */
  pancakeRecipe.printInstructions();
  