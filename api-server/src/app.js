'use strict';

const express = require('express');
const app = express();
const config = require('./config');

const port = process.env.PORT || 80;
const mediaDir = '/srv/media';

// Arrangements
const ArrangementsRepository = require('./arrangements/repository');
const ArrangementsController = require('./arrangements/controller');
const ArrangementsHandler = require('./arrangements/handler');

const arrangementsRepository = new ArrangementsRepository(mediaDir)
const arrangementController = new ArrangementsController(arrangementsRepository);
const arrangementsHandler = new ArrangementsHandler(arrangementController);

app.get(`${config.apiBasePath}/arrangements`, arrangementsHandler.listArrangements);
app.get(`${config.apiBasePath}/arrangements/:arrangement`, arrangementsHandler.getArrangement);
app.get(`${config.apiBasePath}/arrangements/:arrangement/:file`, arrangementsHandler.getFile);

// Borrel Menu
const BorrelMenuRepository = require('./borrel-menu/repository');
const BorrelMenuController = require('./borrel-menu/controller');
const BorrelMenuHandler = require('./borrel-menu/handler');

const borrelMenuRepository = new BorrelMenuRepository(mediaDir);
const borrelMenuController = new BorrelMenuController(borrelMenuRepository);
const borrelMenuHandler = new BorrelMenuHandler(borrelMenuController);

app.get(`${config.apiBasePath}/borrel-menu`, borrelMenuHandler.getBorrelMenu);

// Serve
app.listen(port, () => {
    console.log(`API running on port ${port} of ${require('os').hostname}`);
});
