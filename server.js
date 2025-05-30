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
app.get('/roll/:dice-number-parameter', (req, res) => {
    const dice-number-parameter = req.params.dice-number-parameter;
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
