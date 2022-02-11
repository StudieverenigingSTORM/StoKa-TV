'use strict';

const express = require('express');
const app = express();
const config = require('./config');

const port = process.env.PORT || 80;
const mediaDir = '/srv/media';

const ArrangementsHandler = require('./arrangements/handler');
const ArrangementsController = require('./arrangements/controller');
const ArrangementsRepository = require('./arrangements/repository');

const arrangementsRepository = new ArrangementsRepository(mediaDir)
const arrangementController = new ArrangementsController(arrangementsRepository);
const arrangementsHandler = new ArrangementsHandler(arrangementController);

app.get(`${config.apiBasePath}/arrangements`, arrangementsHandler.listArrangements);
app.get(`${config.apiBasePath}/arrangements/:arrangement`, arrangementsHandler.getArrangement);
app.get(`${config.apiBasePath}/arrangements/:arrangement/:file`, arrangementsHandler.getFile);

app.listen(port, () => {
    console.log(`API running on port ${port} of ${require('os').hostname}`);
});
