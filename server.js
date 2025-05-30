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

//EXERCISE 3


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