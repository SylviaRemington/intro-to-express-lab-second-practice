const express = require('express');
const app = express();
const port = 3000;

// app.get('/', (req, res) => {
//   res.send('Hello World!') // checking to make sure works
// })

//Exercise 1 - Be Polite, Greet the User
app.get('/greetings/:username', (req, res) => {
    const username = req.params.username; //you have to have req.params.username anytime after using : to define the parameter
    res.send(`Hello there, ${username}! What a delight to see you once more!`);
});

//Exercise 2 - Rolling the Dice
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
