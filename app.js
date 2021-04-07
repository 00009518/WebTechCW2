// To check the browser connectivity
const express = require('express')
const app = express()
const fs = require('fs')

// setting template engine
app.set('view engine', 'pug')

// serving static files
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))


// localhost:8000
app.get('/', (req, res) => {
    res.render('index')
});

// create page get
app.get('/create_task', (req, res) => {
    res.render('create_task')
})

// create page post
app.post('/create_task', (req, res) => {
    const title = req.body.title
    const description = req.body.description


    if (title.trim() === '' && description.trim() === '') {
        res.render('create_task', { error: true })
    } else {
        fs.readFile('./data/tasks.json', (err, data) => {
            if (err) throw err

            const tasks = JSON.parse(data)

            tasks.push({
                id: id(),
                title: title,
                description: description
            })
            fs.writeFile('./data/tasks.json', JSON.stringify(tasks), err => {
                if (err) throw err

                res.render('create_task', { success: true })

            })
        })
    }



})


const tasks = ['fewfgreger', 'eqERWfseawFWAfr']
    // all tasks page
app.get('/all_tasks', (req, res) => {
    res.render('all_tasks', { tasks: tasks })
})


// detail page
app.get('/all_tasks/details', (req, res) => {
    res.render('details', { tasks: tasks })
})

// listening  for requests
app.listen(8000, err => {
    if (err) console.log(err)
    console.log('App is listeningonport  http://localhost:8000')
})


function id() {
    return '_' + Math.random().toString(36).substr(2, 9);
}