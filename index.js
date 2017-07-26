const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();


// connect to the database and load models
require('./server/models').connect("mongodb://localhost/arielspage", {
    useMongoClient: true,
});

// tell the app to look for static files in these directories
app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));
// tell the app to parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }));

// routes
const dataRoutes = require('./server/routes/data');
app.use('/data', dataRoutes);



app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'arielspage', './server/static/index.html'));
});


// start the server
app.listen(9000, () => {
    console.log('Server is running on http://localhost:9000 or http://127.0.0.1:9000');
});