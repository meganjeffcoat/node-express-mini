// implement your API here
const express = require('express');
const db = require('./data/db.js');

const server = express();

server.use(express.json());

//Initial endpoint to test that it is working
server.get('/', (req, res) => {
    res.send('Hello World');
});

//Project endpoints
server.get('/api/users', (req, res) => {
    db
        .find()
        .then(users => {
            res.status(200).json({ success: true, users });
        })
        .catch(err => {
            res.status(err.code).json({ success: false, message: err.message });
        })
});

server.post('/api/users', (req, res) => {
    const user = req.body;
    db  
        .insert(user)
        .then(user => {
            res.status(201).json({ success: true, user });
        })
        .catch(err => {
            res.status(err.code).json({ success: false, message: err.message})
        })
});

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db  
        .findById(id)
        .then(user => {
            res.status(200).json({ success: true, user});
        })
        .catch(err => {
            res.status(err.code).json({ success: false, message: err.message})
        })
});

server.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    db
        .remove(userId)
        .then(deleteUser => {
            res.status(204).end();
        })
        .catch(({ code, message }) => {
            res.status(code).json({ success: false, message})
        });
});

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    db
        .update(id, changes)
        .then(updatedUser => {
            if (updatedUser) {
                res.status(200).json({ success: true, updatedUser });
            } else {
                res.status(404).json({ success: false, message: 'This user does not exist'})
            }
        })
        .catch(({ code, message }) => {
            res.status(code).json({ success: false, message })
        })
});





server.listen(4000, () => {
    console.log('\n *** Running on port 4000 *** \n');
});
