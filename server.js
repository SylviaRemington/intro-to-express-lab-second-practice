const express = require('express');
const app = express();
const port = 3000;


//--------------------------------------------------------------------------------------------------------------------------------
// TEST ROUTE TO MAKE SURE WORKING
// app.get('/', (req, res) => {
//   res.send('Hello World!') // checking to make sure works
// })


//--------------------------------------------------------------------------------------------------------------------------------
//Exercise 1 - Be Polite, Greet the User
// app.get('/greetings/:username', (req, res) => {
//     const username = req.params.username; //you have to have req.params.username anytime after using : to define the parameter
//     res.send(`Hello there, ${username}! What a delight to see you once more!`);
// });


//--------------------------------------------------------------------------------------------------------------------------------
//Exercise 2 - Rolling the Dice
app.get('/roll/:diceNumber', (req, res) => {
    const diceNumber = req.params.diceNumber;
    let validNumber = parseInt(diceNumber, 10); //changes a string to a number (e.g. "3" to 3)

    if (isNaN(validNumber)) {
        res.send('You must specify a number.');
    }else {
        let randomNumber = Math.floor(Math.random() * (validNumber + 1)); 
        res.send(`You have a valid number! And you rolled a ${randomNumber}`)
    }
})

/*
Checking to make sure my code is correct via AI, and it wrote:
Yes. ✅ Your code is now correct:
It reads the number from the URL
Converts it using parseInt
Validates with isNaN
Generates a random whole number from 0 to that number
It meets all the assignment requirements.
*/

/*More Information On Why the Code Content has to go in this order... I was doing it previously in a different order. 
Here's the explanation via AI:

It has to go in this order so each step builds safely on the one before it:

✅ 1. Get the value from the URL
const diceNumber = req.params.diceNumber;
You must get the input first so you can work with it.

✅ 2. Convert it to a number
let validNumber = parseInt(diceNumber, 10);
You need to turn the string into a number before doing any math.

✅ 3. Check if it's a valid number
if (isNaN(validNumber)) { ... }
You check before using it, to avoid breaking your math.

✅ 4. Do the math
Math.floor(Math.random() * (validNumber + 1));
Now it's safe to calculate the random number.

✅ 5. Respond to the user
res.send(...);
You only send a result once everything else is done right.

Each step depends on the one before it. Changing the order would cause errors or invalid results.

*/

//EXPLAINING MATH.FLOOR FULL EQUATION:
/*
1. Why Start with Math.floor()?
The Math.floor() function appears first in the expression because it wraps around the rest of the calculation. 
Its job is to take the final decimal value produced by Math.random() * (validNumber + 1) and round it down to 
the nearest whole number (integer). This ensures the result is a clean, usable integer (e.g., 3 instead of 3.784). 
Without Math.floor(), you’d get fractional values, which are often unwanted for dice rolls, counts, or array indices.

2. Why Math.random() Next?
Math.random() generates a random decimal between 0 (inclusive) and 1 (exclusive). This raw randomness is the foundation—
it’s then scaled up by multiplying it with (validNumber + 1) to cover the desired range. For example, if validNumber is 6, 
Math.random() * 7 produces a decimal between 0 and 6.999..., which Math.floor() then truncates to 0–6.

3. Why (validNumber + 1)?
Adding 1 ensures the upper bound (validNumber) is inclusive. Without +1, Math.random() * validNumber would max out at validNumber - 0.000...1, so Math.floor() would never reach validNumber. For a 6-sided die (validNumber = 6), +1 guarantees 6 is a possible result.


ADDTL INFO ABOUT THIS EQUATION AND THE ORDER IT IS RUN:
example: 
Math.floor(Math.random() * 7)

Step-by-step:
Math.random() → gives a decimal between 0 and just under 1
Multiply by 7
Math.floor() removes the decimal part, giving a whole number from 0 to 6
That’s the order. Math.floor is written first but runs last.

*/


//--------------------------------------------------------------------------------------------------------------------------------
//Exercise 3 - I Want THAT One!

// This is the shop’s list of items
const collectibles = [
    { name: 'shiny ball', price: 5.95 }, // Item 0
    { name: 'autographed picture of a dog', price: 10 }, // Item 1
    { name: 'vintage 1970s yogurt (Are you sure you want this? May cause food poisoning.) SOLD AS-IS', price: 0.99 } // Item 2
  ];

app.get('/collectibles/:indexNumber', (req, res) => { //setting up a route
    const indexNumber = req.params.indexNumber; //getting the indexNumber from the params url
    let validNumber = parseInt(indexNumber, 10) //parseInt stands for "parse integer" & means try to read this string as a whole number
    //converting the "string" from the url into a whole number

    if(isNaN(validNumber) || validNumber < 0 || validNumber > 2 ) {
        res.send('This item is not yet in stock. Check back soon!');
    }else {
        const userItemSelected = collectibles[validNumber]; //getting the item the user selected from the array
        res.send(`You'd like the ${userItemSelected.name}? You can purchase it for $${userItemSelected.price}`);//sending msg back to user as response
    }
});

/*
Pseudocode for Exercise #3 above:

1.Set up the route to match /collectibles/:indexNumber

2.Get the index value from the URL

3.Turn the index into a number (it comes in as a string)

4.Check if the index is valid
Is it a number?
Is it within the range of the collectibles array?

5.If the index is not valid:
Respond with: "This item is not yet in stock. Check back soon!"

6. If the index is valid:
Get the item from the array using the index
Use the item’s name and price to build a message like:
"So, you want the [name]? For [price], it can be yours!"
Send that message as the response

*/

/*
REWRITTEN PSEUDOCODE FOR EXERCISE 3 THAT WORKS BETTER - ESPECIALLY #4
Pseudocode for Exercise #3:

1. Set up a route that matches /collectibles/:indexNumber

2. Get the index value from the URL parameters

3. Convert the index value into a number

4. Validate the number:
   - Check if it's not a number (use isNaN)
   - Check if it's less than 0
   - Check if it's greater than the last index in the array

5. If the number is invalid:
   - Send the message: "This item is not yet in stock. Check back soon!"

6. If the number is valid:
   - Use it to get the correct item from the collectibles array
   - Create a message using the item's name and price
   - Send the message as the response
*/


//ANOTHER ALTERNATE VERSION I DID DURING THE FIRST TIME DOING THIS THAT'S CLEANER:
// const collectibles = [
//     { name: 'shiny ball', price: 5.95 }, // Item 0
//     { name: 'autographed picture of a dog', price: 10 }, // Item 1
//     { name: 'vintage 1970s yogurt (Are you sure you want this? May cause food poisoning.) SOLD AS-IS', price: 0.99 } // Item 2
//   ];
  
//   app.get('/collectibles/:index', (req, res) => {
//     const index = parseInt(req.params.index, 10);
    
//     if (isNaN(index) || index < 0 || index > 2) {
//       res.send('This item is not yet in stock. Check back soon!');
//     } else {
//       const item = collectibles[index];
//       res.send(`You'd like the ${item.name}? You can purchase it for $${item.price}.`);
//     }
//   });



  //Another alt version with notes:
  // Exercise #3 - works!
// This is the shop’s list of items
// const collectibles = [
//     { name: 'shiny ball', price: 5.95 }, // Item 0
//     { name: 'autographed picture of a dog', price: 10 }, // Item 1
//     { name: 'vintage 1970s yogurt (Are you sure you want this? May cause food poisoning.) SOLD AS-IS', price: 0.99 } // Item 2
//   ];
  
  // When someone visits a web address like yourshop.com/collectibles/0 or http://localhost:3000/collectibles/2
//   app.get('/collectibles/:index', (req, res) => {
    // Grab the number from the web address (like "0" or "2")
//     const index = parseInt(req.params.index, 10);
    
    // Check if the number works (Checking if it's not 0, 1, or 2, or not a number at all)
//     if (isNaN(index) || index < 0 || index > 2) {
      // Tell them we don’t have that item
//       res.send('This item is not yet in stock. Check back soon!');
//     } else {
      // Pick the item from the list using the number
//       const item = collectibles[index];
      // Show them the item’s name and price
//       res.send(`You'd like the ${item.name}? You can purchase it for $${item.price}.`);
//     }
//   });

//--------------------------------------------------------------------------------------------------------------------------------





//--------------------------------------------------------------------------------------------------------------------------------
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})












/*  CODE GRAVEYARD - OLDER TRIES AT CODE

/Exercise 2 - Rolling the Dice - DOESN'T WORK
/This one makes the most sense for me so far:

app.get('/roll/:diceNumber', (req, res) => {
    const diceNumber = req.params.diceNumber;
    let validNumber = parseInt(diceNumber, 10);

    if (diceNumber === validNumber) {
        let randomNumber = Math.floor(Math.random() * (validNumber + 1)); 
        res.send(`You have a valid number! And you rolled a ${randomNumber}`)
    }else {
        res.send('You must specify a number.');
    }
})


*/