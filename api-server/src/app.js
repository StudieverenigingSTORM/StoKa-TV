'use strict';

const express = require('express');
const app = express();

const port = process.env.PORT || 80;
const mediaDir = '/srv/media';

const repository = require('./data_access/arrangements_repository_fs')(mediaDir);
const handlers = require('./api/arrangements_handlers')(repository)

app.get('/arrangements', handlers.listArrangements);
app.get('/arrangements/:arrangement', handlers.getArrangement);

app.listen(port, () => {
    console.log(`API running on port ${port} of ${require('os').hostname}`);
});
