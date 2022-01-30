'use strict';

const express = require('express');
const app = express();
const config = require('./config');

const port = process.env.PORT || 80;
const mediaDir = '/srv/media';

const repository = require('./data_access/arrangements_repository_fs')(mediaDir);
const controller = require('./business_service/arrangement_controller')(repository);
const handlers = require('./api/arrangements_handlers')(controller);

app.get(`${config.apiBasePath}/arrangements`, handlers.listArrangements);
app.get(`${config.apiBasePath}/arrangements/:arrangement`, handlers.getArrangement);
app.get(`${config.apiBasePath}/arrangements/:arrangement/:file`, handlers.getFile);

app.listen(port, () => {
    console.log(`API running on port ${port} of ${require('os').hostname}`);
});
