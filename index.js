// implement your API here
const express = require('express');
const db = require('./data/db.js');

const server = express();

server.use(express.json());


server.get('/', (req, res) => {
    res.send('Hello World');
});

server.listen(4000, () => {
    console.log('\n *** Running on port 4000 *** \n');
});
