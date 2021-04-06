// To check the browser connectivity
const express = require('express')
const app = express()

// setting template engine
app.set('view engine', 'pug')

// serving static files
app.use(express.static('public'))


// localhost:8000
app.get('/', (req, res) => {
    res.render('index')
    });

// create page
app.get('/create_task', (req, res) => {
    res.render('create_task')
    });
    
// listening  for requests
app.listen(8000, err => {
    if (err) console.log(err)
    
    console.log('App is listening on port  http://localhost:8000')
  })
