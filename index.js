const express = require('express');

const app = express();
const path = require('path');

// tell the app to look for static files in these directories
app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));


// Testing
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'arielspage', './server/static/index.html'));
});


// start the server
app.listen(9000, () => {
    console.log('Server is running on http://localhost:9000 or http://127.0.0.1:9000');
});