const express = require('express')
const app = express()
const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!') // checking to make sure works
// })

app.get('/greetings/:username', (req, res) => (
    res.send(`Hello there, ${username}! What a delight to see you once more!`)
))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
