// implement your API here
const express = require('express');
const db = require('./data/db.js');

const server = express();

server.use(express.json());

//Initial endpoint to test that it is working
server.get('/', (req, res) => {
    res.send('Hello World');
});

// Project Endpoints
server.get('/api/users', (req, res) => {
    db
        .find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ message: 'The information about the users could not be retrieved' });
        });
});

server.post('/api/users', (req, res) => {
    const user = req.body;
    if (!user.name || !user.bio){
        res.status(400).json({ message: 'You need to have both a name and bio to input a new user'});
    }
    db
        .insert(user)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            res.status(500).json({ message: 'There was an error while saving the user to the database.'});
        });
});

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db
        .findById(id)
        .then(user => {
            if (!user){
                res.status(404).json({ message: 'The user with the specified ID does not exist'});
            }
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json({ message: 'The user information could not be retrieved' });
        });
});

server.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    db
        .remove(userId)
        .then(deletedUser => {
            if (deletedUser === 0){
                res.status(404).json({ message: 'The user with the specified ID does not exist'})
            }
            res.status(204).end();
        })
        .catch(err => {
            res.status(500).json({ message: 'The user could not be removed' });
        });
});

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    if (!changes.name || !changes.bio){
        res.status(400).json({ success: false, message: 'Please provide name and bio for the user'});
    }

    db
        .update(id, changes)
        .then(updatedUser => {
            if (updatedUser){
                res.status(200).json({ success: true, updatedUser });
            } else {
                res.status(404).json({
                    success: false,
                    message: 'This user does not exist',
                });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'The user information could not be modified' });
        });
});





server.listen(4000, () => {
    console.log('\n *** Running on port 4000 *** \n');
});
