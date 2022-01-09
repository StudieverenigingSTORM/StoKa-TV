'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 80;
const fs = require('fs');
const mediaDir = '/srv/media';

function listArrangements() {
    return fs.readdirSync(mediaDir)
        .filter(f => fs.lstatSync(`${mediaDir}/${f}`).isDirectory());
}

function getArrangement(arrangement) {
    const arrangementFilename = `${mediaDir}/${arrangement}/arrangement.yml`;
    const doesArrangementFileExist = fs.existsSync(arrangementFilename);
    var arrangement = {};
    arrangement.implicit = !doesArrangementFileExist;
    if (doesArrangementFileExist) {
        // TODO load config
    } else {
        // TODO generate config
    }
    return arrangement
}

app.get('/arrangements', (req, res) => {
    res.json(listArrangements().filter(f => f.charAt(0) != '.').map(f => encodeURIComponent(f)));
});

app.get('/arrangements/:arrangement', (req, res) => {
    const arrangement = req.params['arrangement'];
    if (!listArrangements().includes(arrangement)) {
        res.status(404).end()
    }
    res.json(getArrangement(arrangement));
})

app.listen(port, () => {
    console.log(`API running on port ${port} of ${require('os').hostname}`);
});
