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

// define basic REST API
app.get('/api/v1/tasks', (req, res) => {
    fs.readFile('./data/tasks.json', (err, data) => {
        if (err) throw err

        const tasks = JSON.parse(data)

        res.json(tasks)
    })
})



// all tasks page
app.get('/all_tasks', (req, res) => {


    fs.readFile('./data/tasks.json', (err, data) => {
        if (err) throw err

        const tasks = JSON.parse(data)

        res.render('all_tasks', { tasks: tasks })
    })
})


// detail page
app.get('/all_tasks/:id', (req, res) => {
    const id = req.params.id

    fs.readFile('./data/tasks.json', (err, data) => {
        if (err) throw err

        const tasks = JSON.parse(data)

        const task = tasks.filter(task => task.id == id)[0]
        res.render('details', { task: task })
    })
})

// listening  for requests
app.listen(8000, err => {
    if (err) console.log(err)
    console.log('App is listening on port  http://localhost:8000')
})


// delete function
app.get('/:id/delete', (req, res) => {
    const id = req.params.id
    fs.readFile('./data/tasks.json', (err, data) => {
        if (err) throw err

        const tasks = JSON.parse(data)

        const filteredTasks = tasks.filter(task => task.id != id)

        fs.writeFile('./data/tasks.json', JSON.stringify(filteredTasks), (err) => {
            if (err) throw err

            res.render('all_tasks', { tasks: filteredTasks, deleted: true })
        })
    })
})

function id() {
    return '_' + Math.random().toString(36).substr(2, 9);
}