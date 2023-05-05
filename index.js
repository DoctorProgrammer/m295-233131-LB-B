/*
  name: index.js
  author: Robin Trachsel
  date: 2020-03-26
  version: 0.0.1
  description: Backend für Lernbeurteilung Teil B

  Readme:
    Author, Entwicklungsumgebung, Version, Git-Repository, Beschreibung, Verwendung, Quellen
    TESTING.md beschreiben die Testfälle
    Versionskontrolle, Git-Log: git log > log.txt
*/

const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(session({
  secret: 'superSecret',
  resave: false,
  saveUnititialized: true,
  cookie: {}
}))

function logRequest (req, res, next) {
  console.log(`Port: ${port}\t${req.method}: ${req.url}`)
  next()
}

function checkLoggedIn (req, res) {
  if (req.session.email) {
    return true
  } else {
    res.status(403).json({ error: 'Not logged in' })
  }
}

let tasks = [
  {
    id: 1,
    title: 'Task 1',
    createdOn: new Date(),
    finishedOn: undefined
  },
  {
    id: 2,
    title: 'Task 2',
    createdOn: new Date(),
    finishedOn: undefined
  }
]

// Hauptanforderungen

app.get('/tasks', (req, res) => {
  logRequest(req, res, () => {
    if (!checkLoggedIn(req, res)) return
    res.status(200).send(tasks)
  })
})

app.post('/tasks', (req, res) => {
  logRequest(req, res, () => {
    if (!checkLoggedIn(req, res)) return
    const { title } = req.body
    if (title === undefined) {
      res.status(406).json({ error: 'No title' })
      return
    }
    const task = {
      id: tasks.length + 1,
      title,
      createdOn: new Date(),
      finishedOn: undefined
    }
    tasks.push(task)
    res.status(201).send(task)
  })
})

app.get('/tasks/:id', (req, res) => {
  logRequest(req, res, () => {
    if (!checkLoggedIn(req, res)) return
    const id = req.params.id
    const task = tasks.filter((task) => task.id === parseInt(id))
    if (task.length === 0) {
      res.sendStatus(404)
    } else {
      res.status(200).send(task)
    }
  })
})

app.put('/tasks/:id', (req, res) => {
  logRequest(req, res, () => {
    if (!checkLoggedIn(req, res)) return
    const id = req.params.id
    const task = tasks.filter((task) => task.id === parseInt(id))
    const { title, finished } = req.body
    task[0].title = title
    if (finished) {
      task[0].finishedOn = new Date()
    }
    if (task.length === 0) {
      res.sendStatus(404)
    } else if (title === undefined) {
      res.status(406).json({ error: 'No title' })
    } else {
      res.status(201).send(task)
    }
  })
})

app.delete('/tasks/:id', (req, res) => {
  logRequest(req, res, () => {
    if (!checkLoggedIn(req, res)) return
    const id = req.params.id
    const task = tasks.filter((task) => task.id === parseInt(id))
    if (task.length === 0) {
      res.sendStatus(404)
    } else {
      tasks = tasks.filter((task) => task.id !== parseInt(id))
      for (let i = 0; i < tasks.length; i++) {
        tasks[i].id = i + 1
      }
      res.status(201).send(tasks)
    }
  })
})

// Anforderungen an die Authentifizierung

app.post('/login', (req, res) => {
  logRequest(req, res, () => {
    const email = req.body.email.toLowerCase()
    const password = req.body.password
    if (!email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)) {
      res.status(401).json({ error: 'Invalid email' })
      return
    }
    if (password === 'm295') { // "email === email && " kommt vor das "password === 'm295'". Das zweite "email" steht da um jede Eingabe zu akzeptieren
      req.session.email = email
      res.status(200).json({ email: req.session.email })
    } else {
      res.status(401).json({ error: 'Invalid credentials' })
    }
  })
})

app.get('/verify', (req, res) => {
  logRequest(req, res, () => {
    if (req.session.email) {
      res.status(200).json({ email: req.session.email })
    } else {
      res.status(401).json({ error: 'Not logged in' })
    }
  })
})

app.delete('/logout', (req, res) => {
  logRequest(req, res, () => {
    if (!checkLoggedIn(req, res)) return
    req.session.destroy()
    res.sendStatus(204)
  })
})

// Zusätzliche Anforderungen

app.all('*', (req, res) => {
  logRequest(req, res, () => {
    res.status(404).json({ error: 'Not found' })
  })
})

app.listen(port, () => {
  console.clear()
  console.log(
    `\nPort: ${port}\thttp://localhost:${port}\t\t${new Date().toString()}`
  )
})
