'use strict';

const fs = require('fs');
const yaml = require('yaml');
const utils = require('../utils');
const sp = require('synchronized-promise');
const { getVideoDurationInSeconds } = require('get-video-duration');


module.exports = function (mediaDir) {
    let dataAcc = {};

    dataAcc.listArrangements = function () {
        return fs.readdirSync(mediaDir)
            .filter(f => fs.lstatSync(`${mediaDir}/${f}`).isDirectory());
    }

    dataAcc.getMediaFiles = function(arrangement) {
        const arrangementDir = `${mediaDir}/${arrangement}`
        return fs.readdirSync(arrangementDir).filter(f => utils.hasValidExtension(f));
    }

    dataAcc.getVideoLength = function(arrangement, filename) {
        return sp(getVideoDurationInSeconds)(`${mediaDir}/${arrangement}/${filename}`);
    }

    dataAcc.getArrangement = function (arrangement) {
        const arrangementDir = `${mediaDir}/${arrangement}`
        const arrangementFilename = `${arrangementDir}/arrangement.yaml`;
        const doesArrangementFileExist = fs.existsSync(arrangementFilename);
        let cfg = {};
        cfg.metadata = { defined: doesArrangementFileExist, invalid: false }
        cfg.name = ''
        cfg.items = [];
        if (doesArrangementFileExist) {
            // load config
            const cfgYaml = fs.readFileSync(arrangementFilename, 'utf-8');
            try {
                const parsed = yaml.parse(cfgYaml);
                // Validate arrangement config
                const schemaErrors = utils.validateSchema(parsed);
                if (schemaErrors.length > 0) {
                    throw Error(JSON.stringify(schemaErrors));
                }
                // Validate filenames
                const mediaFiles = dataAcc.getMediaFiles(arrangement);
                parsed.items.forEach(i => {
                    if(mediaFiles.indexOf(i.file) == -1) {
                        throw Error(`${i.file} does not exist in ${arrangement}`);
                    }
                });
                cfg = { ...cfg, ...parsed };
            }
            catch(e) {
                cfg.metadata.invalid = true;
                console.error(e);
            }
        }
        return cfg;
    }

    dataAcc.getFile = function(arrangement, filename) {
        try {
            return fs.readFileSync(`${mediaDir}/${arrangement}/${filename}`);
        }
        catch(e) {
            console.error(e);
            return null;
        }
    }

    dataAcc.getFileStream = function(arrangement, filename, start, end) {
        const path = `${mediaDir}/${arrangement}/${filename}`;
        try {
            return fs.createReadStream(path, {start, end});
        }
        catch(e) {
            console.error(e);
            return null;
        }
    }

    dataAcc.getFileSize = function(arrangement, filename) {
        try{
            return fs.statSync(`${mediaDir}/${arrangement}/${filename}`).size;
        }
        catch(e) {
            console.error(e);
            return 0;
        }
    }

    return dataAcc;
};
