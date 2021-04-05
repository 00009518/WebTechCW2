// To check the browser connectivity
const express = require('express')
const app = express()

// setting template engine
app.set('view engine', 'pug')

// getting the request
app.get('/', (req, res) => {
    res.send('Hello')
    });
    
// listening  for requests
app.listen(8000, err => {
    if (err) console.log(err)
    
    console.log('App is listening on port  http://localhost:8000')
  })
