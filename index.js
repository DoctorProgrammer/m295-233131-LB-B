const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'superSecret',
    resave: false,
    saveUnititialized: true,
    cookie: {}
}));


function logRequest(req, res, next) {
    console.log(`Port: ${port}\t${req.method}: ${req.url}`);
    next();
}

let tasks = [
    {
        id: 1,
        text: 'Task 1',
        createdOn: new Date(),
        finishedOn: undefined,
    },
    {
        id: 2,
        text: 'Task 2',
        createdOn: new Date(),
        finishedOn: undefined,
    }
];

// Hauptanforderungen

app.get('/tasks', (req, res) => {
    logRequest(req, res, () => {
        res.status(200).send(tasks);
    });
});

app.post('/tasks', (req, res) => {
    logRequest(req, res, () => {
        const task = {
            id: tasks.length + 1,
            text: req.query.text,
            createdOn: new Date(),
            finishedOn: undefined
        };
        tasks.push(task);
        res.status(201).send(task);
    });
});

app.get('/tasks/:id', (req, res) => {
    logRequest(req, res, () => {
        const id = req.params.id;
        const task = tasks.filter((task) => task.id === parseInt(id));
        if (task.length === 0) {
            res.sendStatus(404);
        } else {
            res.status(200).send(task);
        }
    });
});

app.put('/tasks/:id', (req, res) => {
    logRequest(req, res, () => {
        const id = req.params.id;
        const task = tasks.filter((task) => task.id === parseInt(id));
        task[0].text = req.query.text;
        if (req.query.finished) {
            task[0].finishedOn = new Date();
        }
        if (task.length === 0) {
            res.sendStatus(404);
        } else if (task[0].text === undefined) {
            res.sendStatus(406);
        } else {
            res.status(201).send(task);
        }
    });
});

app.delete('/tasks/:id', (req, res) => {
    logRequest(req, res, () => {
        const id = req.params.id;
        const task = tasks.filter((task) => task.id === parseInt(id));
        if (task.length === 0) {
            res.sendStatus(404);
        } else {
            tasks = tasks.filter((task) => task.id !== parseInt(id));
            for (let i = 0; i < tasks.length; i++) {
                tasks[i].id = i + 1;
            }
            res.status(201).send(tasks);
        }
    });
});

app.listen(port, () => {
    console.clear();
    console.log(
        `\nPort: ${port}\thttp://localhost:${port}\t\t${new Date().toString()}`
    );
});