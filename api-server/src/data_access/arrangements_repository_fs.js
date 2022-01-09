'use strict';

const fs = require('fs');

module.exports = function(mediaDir) {
    let dataAcc = {};

    dataAcc.listArrangements = function () {
        return fs.readdirSync(mediaDir)
            .filter(f => fs.lstatSync(`${mediaDir}/${f}`).isDirectory());
    }

    dataAcc.getArrangement = function (arrangement) {
        const arrangementFilename = `${mediaDir}/${arrangement}/arrangement.yml`;
        const doesArrangementFileExist = fs.existsSync(arrangementFilename);
        var cfg = {};
        cfg.implicit = !doesArrangementFileExist;
        if (doesArrangementFileExist) {
            // TODO load config
        } else {
            // TODO generate config
        }
        return cfg;
    }

    return dataAcc;
};
