const express = require('express');
const app = express();
const port = 3000;


//--------------------------------------------------------------------------------------------------------------------------------
// TEST ROUTE TO MAKE SURE WORKING
// app.get('/', (req, res) => {
//   res.send('Hello World!') // checking to make sure works
// })


//--------------------------------------------------------------------------------------------------------------------------------
// Exercise 1 - Be Polite, Greet the User
app.get('/greetings/:username', (req, res) => {
    const username = req.params.username; //you have to have req.params.username anytime after using : to define the parameter
    res.send(`Hello there, ${username}! What a delight to see you once more!`);
});


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

    if(isNaN(validNumber) || validNumber < 0 || validNumber > collectibles.length -1 ) {
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
//Exercise 4 - Filter Shoes by Query Parameters
//example: localhost:3000/hello?name=Christy&age=32
//Scroll down after notes and pseudocode, to see the code.

/*
Information about using Query Parameters in this lesson:
Using Query Parameters
In this section, you practice using query parameters to pass information from the URL to the server 
in an Express application. Query parameters are added to the end of a URL after a ? and are formatted 
as key=value pairs. Multiple query parameters can be added to a URL by separating them with &. 
For example, the following URL has two query parameters, name and age:

localhost:3000/hello?name=Christy&age=32

Query parameters are available in the server’s req.query object. 
We can access the values of the name and age query parameters like so:

app.get('/hello', (req, res) => {
    res.send(`Hello there, ${req.query.name}! I hear you are ${req.query.age} years old!`);
});
*/

/* ASSIGNMENT FOR EXERCISE #4:
Use the following array of shoes in this challenge.

Task: Create a route /shoes that filters the list of shoes based on query parameters.

Query Parameters:
min-price: Excludes shoes below this price.
max-price: Excludes shoes above this price.
type: Shows only shoes of the specified type.
No parameters: Responds with the full list of shoes.
*/

/* BASIC OVERVIEW
💬 What are you trying to build?
You are building a menu of shoes.

People can visit your page and say:
“Only show me boots.”
“Only show me shoes that cost more than $100.”
“Only show me sandals that cost less than $50.”

🧠 But how do they “say” that?
They don’t say it out loud. They type it in the web address.

Like this:
/shoes?min-price=100&type=boot
That just means:
“Show me boots that cost at least $100.”

❓So why do you need code?
Because your page doesn’t know what to show until you teach it.

You write code that says:
“If someone asks for boots, I’ll only show boots.”
“If someone asks for shoes under $50, I’ll hide the expensive ones.”

📦 You already have a list of shoes.
Now you are just saying:

“Look at what the person typed in the web address.”
“Use that info to decide what shoes to show.”
That’s it.

*/


//ALSO THIS MEANS: (!isNaN(value) // means: it *is* a number)

/* PSEUDOCODE FOR EXERCISE 4

✅ Pseudocode for /shoes route with query filters

1. Set up a route that listens for requests to /shoes

2. Look at the URL and get any query filters the user included:
One for minimum price
One for maximum price
One for type of shoe

3. Start with the full shoe list

4. If there is a minimum price:
Remove any shoes that cost less than that number

5. If there is a maximum price:
Remove any shoes that cost more than that number

6. If there is a type:
Keep only the shoes that match that type

7. Send back the list of shoes that passed all the filters
*/

  const shoes = [
      { name: "Birkenstocks", price: 50, type: "sandal" },
      { name: "Air Jordans", price: 500, type: "sneaker" },
      { name: "Air Mahomeses", price: 501, type: "sneaker" },
      { name: "Utility Boots", price: 20, type: "boot" },
      { name: "Velcro Sandals", price: 15, type: "sandal" },
      { name: "Jet Boots", price: 1000, type: "boot" },
      { name: "Fifty-Inch Heels", price: 175, type: "heel" }
  ];

  app.get('/shoes', (req, res) => { //set up a route that listens for requests to /shoes
    let shoeFilter = shoes; //gives the list a name that fits its role / gives same array a new name to make code easier to follow
    //better to create a new array so don't mess up old data like const shoeFilter = [...shoes], but can do let above too
    //We're starting with all the shoes. This list will shrink if the user adds filters.

    const minPrice = Number(req.query["min-price"]); //getting the minimum price filter from the URL, 
    // if the user typed one — like ?min-price=100. We change it from a string to a number using Number().

    /*Here’s a simple breakdown of each part:
    With Example URL: /shoes?min-price=100

    const minPrice = ...
    ➡️ We’re creating a new variable called minPrice.

    Number(...)
    ➡️ Converts the string "100" into a real number: 100.
    So we can do math with it (like comparing prices).

    req.query
    ➡️ This gets all the query parameters from the URL.
    Example URL:
    /shoes?min-price=100
    This whole part: ?min-price=100 is called the query.

    req.query["min-price"]
    ➡️ This grabs the value from the URL's min-price query.
    In the example above, it grabs 100 (as a string).

    All together:
    🟢 “Get the value of min-price from the URL, turn it into a number, and save it as minPrice.”
    */

    const maxPrice = Number(req.query["max-price"]); //getting the maximum price filter from the URL — like ?max-price=500.
    // Again, we convert it from a string to a number with the Number() method. Could also use pareInt or parseFloat.

    const type = req.query.type; //getting the shoe type from the URL - ike ?type=boot or ?type=sneaker.
    //No number conversion is needed here because it's a word.

    if (!isNaN(minPrice)) { //Check if the user gave a real number for the minimum price. !isNaN(...) means “this is a real number.”
        shoeFilter = shoeFilter.filter(shoe => shoe.price >= minPrice); //Remove shoes that are too cheap. 
        // EXPLANATION OF THIS ABOVE LINE OF CODE BELOW:
        // OVERVIEW: Only keep shoes that cost more than or equal to the minPrice.
        // CODE BREAKDOWN OF EACH PART BELOW HERE:
        // if (!isNaN(minPrice)) means "if minPrice is a number" - ! with isNaN means "not a not a number", which means it is a number. There is no other verbiage in code that just says something is a number.
        // shoeFilter - This is the current list of shoes we're working with. We're updating the shoe filter list with what happens when it is the min price.
        // shoeFilter.filter - Going through each item in the shoeFilter list. Only keeping the ones that match this rule. This creates a shorter list.
        // shoe => This is a tiny function used inside .filter() - It runs one time for each shoe. (shoe = one shoe at a time)
        // shoe.price >= minPrice // meaning below
        // shoe.price >= minPrice
        // shoe.price = the price of this one shoe
        // minPrice = the number the user typed in the URL
        // Keep the shoe only if the price is greater than or equal to minPrice 
        // Full meaning:“Look at each shoe. If the price is big enough and greater than the minimum, keep it. 
        // Then update shoeFilter with only the shoes that passed.” 
        // “Go through the current shoe list. Only keep shoes that are at least the minimum price.
    }

    if (!isNaN(maxPrice)) { //Check if the max price is a real number.
        shoeFilter = shoeFilter.filter(shoe => shoe.price <= maxPrice); //Remove shoes that are too expensive.
        // Only keep shoes that cost less than or equal to the maxPrice.
    }

    if (type) { //Check if the user typed in a type of shoe, like "boot".
        shoeFilter = shoeFilter.filter(shoe => shoe.type === type); 
        //Only keep shoes that match the type the user asked for.
    }

    //One version of res.send
    // res.send(shoeFilter); //Send the final list of shoes back to the user (on the webpage or in JSON).
    // This is what the user sees after their filters are applied.

    //Could also do a different version of res.send to make it more readable for the user, such as:
    res.send("Here are the shoes you asked for: <br><br>" + 
        //res.send sends a message from your server back to the user’s browser
        // This sends a message back to the browser. The message starts with a sentence.
        // <br><br> makes two line breaks in the browser (like pressing Enter twice)
        // &browser knows not to include the words br br but just perform the action

        shoeFilter.map(shoe => `${shoe.name} — $${shoe.price} (${shoe.type})`).join('<br>'));
        //EXPLANATION OF THE ABOVE LINE BROKEN DOWN BELOW:
        // This whole line says: Go through every shoe in the list. And for each shoe name make a sentence like:
        // "Air Jordans = $500 (sneaker)".
        // To make each shoe appear on a new line in the browser, do this with the .join('<br>') - It adds an HTML line break between each shoe.
        
        //THIS LINE BROKEN DOWN FURTHER FOR EACH SPECIFIC SECTION:
        //shoeFilter is the array list of filtered shoe objects. This is what we will be filtering through to find a shoe for the user.
        //.map() is a method that loops through each item in the list. 
        // shoe => is a tiny function that tells the code what to do for each shoe. It takes one shoe and builds a string using name, price, and type.
        // `${shoe.name} — $${shoe.price} (${shoe.type})` -- this is a template literal to create what we will see on the browser with inserting in shoe name, etc.
        // .join('<br>') combines shoe sentences into one long string (as long as they meet the query parameter) - Only includes shoes that match the query parameters (like type, min-price, etc.).

    });

/*
    This is how the code looks without all the notes:
    const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => {
  let shoeFilter = shoes;
  const minPrice = Number(req.query["min-price"]);
  const maxPrice = Number(req.query["max-price"]);
  const type = req.query.type;

  if (!isNaN(minPrice)) {
    shoeFilter = shoeFilter.filter(shoe => shoe.price >= minPrice);
  }

  if (!isNaN(maxPrice)) {
    shoeFilter = shoeFilter.filter(shoe => shoe.price <= maxPrice);
  }

  if (type) {
    shoeFilter = shoeFilter.filter(shoe => shoe.type === type);
  }

  res.send("Here are the shoes you asked for: <br><br>" + 
    shoeFilter.map(shoe => `${shoe.name} — $${shoe.price} (${shoe.type})`).join('<br>'));
});
*/

    //CORRECT LOCAL HOST TO USE:
    // http://localhost:3000/shoes?min-price=500&type=sneaker

    //ANOTHER CORRECT LOCAL HOST COULD USE TO AQUIRE SHOE INFO:
    //http://localhost:3000/shoes?min-price=999
    // RESULT: 
    // Here are the shoes you asked for: Jet Boots — $1000 (boot)

    // INITIALLY USED WRONG LOCALHOST INFO OF THIS....
    // USING LOCAL HOST THIS LINK: http://localhost:3000/shoes?name=AirJordans&price=500&type=sneaker
    /* BUT THIS LINK DOESN'T FULLY WORK BECAUSE:
    You're right — that URL works in the sense that it doesn't crash. But here’s what’s actually happening:
    Why it "works" — but doesn’t filter: Your route only looks for these query parameters: min-price, max-price,type
    
    But in your URL, you're using: 
    name=AirJordans ✅ (not used in your code) 
    price=500 ✅ (not used in your code)
    type=sneaker ✅ this is the only one your code actually uses
    So the code filters only by type=sneaker, and ignores the rest.

    */

    //A third version of res.send: 
    // const shoeList = shoeFilter
    //    .map(shoe => `${shoe.name} — $${shoe.price} (${shoe.type})`)
    //    .join('<br>'); // HTML line breaks
    // res.send("Here are the shoes you asked for:<br><br>" + shoeList);});

/*Also, some addtl notes:
1. Why use ["min-price"] instead of camelCase like .minPrice?

Because:
The query parameter in the URL is written as ?min-price=100
JavaScript object keys with hyphens must be accessed using bracket notation, not dot notation.


2. Why use multiple if statements instead of if...else if...else?

Because:
The user might give none, one, two, or all three query parameters.
Each if block checks separately and runs only if that specific input exists.
Using else if would stop after the first match — which is not what you want here.
*/

/*
--------
AND HERE ARE SOME METHODS I MIGHT USE:
✅ 1. req.query
To get the query parameters from the URL
Example: req.query["min-price"], req.query.type

✅ 2. Array.prototype.filter()
To create a new list of shoes that match your criteria
You'll apply this method multiple times, once for each condition (min price, max price, type)

✅ 3. Number(), parseInt(), or parseFloat()
To convert min-price and max-price from strings to numbers

Use parseFloat() when the value may include cents (like 5.95)

Use parseInt() if you're only working with whole numbers

Number() also works and auto-detects format but may return NaN on bad input

✅ 4. res.send()
To send the final filtered list back to the user

SO YOU WOULD ONLY USE ONE OF THESE THREE? Number(), parseInt(), or parseFloat()

ChatGPT said:
Yes. ✅ You would only use one of these three — not all at once.

Which one you choose depends on what kind of number you expect:

🔹 Use parseFloat()
✅ Best choice for prices (like 5.95, 100.25)
Keeps decimals
Recommended for this shoe exercise

🔹 Use parseInt()
✅ Use only if you need whole numbers only
Cuts off anything after the decimal
Not recommended for prices

🔹 Use Number()
✅ Also converts strings to numbers (decimals or whole)
More strict — returns NaN on invalid input
Flexible, but less clear than parseFloat() for price-specific use

✅ For this assignment:
Use parseFloat() for min-price and max-price. //best use scenario
*/

//ANOTHER VERSION:
// app.get('/shoes', (req, res) => {
//   let filteredShoes = shoes;

//   const minPrice = parseFloat(req.query["min-price"]);
//   const maxPrice = parseFloat(req.query["max-price"]);
//   const type = req.query.type;

//   if (!isNaN(minPrice)) {
//     filteredShoes = filteredShoes.filter(shoe => shoe.price >= minPrice);
//   }

//   if (!isNaN(maxPrice)) {
//     filteredShoes = filteredShoes.filter(shoe => shoe.price <= maxPrice);
//   }

//   if (type) {
//     filteredShoes = filteredShoes.filter(shoe => shoe.type === type);
//   }

//   res.send(filteredShoes);
// });


//YET ANOTHER VERSION: 
// const shoes = [
//   { name: "Birkenstocks", price: 50, type: "sandal" },
//   { name: "Air Jordans", price: 500, type: "sneaker" },
//   { name: "Air Mahomeses", price: 501, type: "sneaker" },
//   { name: "Utility Boots", price: 20, type: "boot" },
//   { name: "Velcro Sandals", price: 15, type: "sandal" },
//   { name: "Jet Boots", price: 1000, type: "boot" },
//   { name: "Fifty-Inch Heels", price: 175, type: "heel" }
// ];

// app.get('/shoes', (req, res) => { // listens for people visiting /shoes

//   let shoeFilter = [...shoes]; // make a copy of the shoe list so we don’t change the original

//   const minPrice = parseInt(req.query['min-price'], 10); // turn the min-price string into a whole number
//   const maxPrice = parseInt(req.query['max-price'], 10); // turn the max-price string into a whole number
//   const type = req.query.type; // get the type from the URL if provided

//   if (!isNaN(minPrice)) { // if min-price is a real number
//     shoeFilter = shoeFilter.filter(shoe => shoe.price >= minPrice);
//   }

//   if (!isNaN(maxPrice)) { // if max-price is a real number
//     shoeFilter = shoeFilter.filter(shoe => shoe.price <= maxPrice);
//   }

//   if (type) { // if a type is provided
//     shoeFilter = shoeFilter.filter(shoe => shoe.type === type);
//   }

//   res.send(shoeFilter); // send the final list of shoes back
// });


/*
shoeFilter = shoeFilter.filter(shoe => shoe.price >= minPrice); is the same as this below:

shoeFilter = shoeFilter.filter(function(shoe) {
  return shoe.price >= minPrice;
});
*/

//Another version:
// app.get('/shoes', (req, res) => {
//       const shoes = [
//       { name: "Birkenstocks", price: 50, type: "sandal" },
//       { name: "Air Jordans", price: 500, type: "sneaker" },
//       { name: "Air Mahomeses", price: 501, type: "sneaker" },
//       { name: "Utility Boots", price: 20, type: "boot" },
//       { name: "Velcro Sandals", price: 15, type: "sandal" },
//       { name: "Jet Boots", price: 1000, type: "boot" },
//       { name: "Fifty-Inch Heels", price: 175, type: "heel" }
//   ];

//   let filteredShoes = shoes;

//   const minPrice = Number(req.query['min-price']);
//   const maxPrice = Number(req.query['max-price']);
//   const type = req.query.type;

//   if (!isNaN(minPrice)) {
//     filteredShoes = filteredShoes.filter(shoe => shoe.price >= minPrice);
//   }

//   if (!isNaN(maxPrice)) {
//     filteredShoes = filteredShoes.filter(shoe => shoe.price <= maxPrice);
//   }

//   if (type) {
//     filteredShoes = filteredShoes.filter(shoe => shoe.type === type);
//   }

//   res.send(filteredShoes);

// });

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