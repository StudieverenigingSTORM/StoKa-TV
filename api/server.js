'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 80;

app.get('/', (req, res) => {
    res.send('Hello world! :)');
});

app.listen(port, () => {
    console.log(`API running on port ${port} of ${ require('os').hostname }`);
});
