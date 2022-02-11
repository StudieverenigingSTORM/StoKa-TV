'use strict';

const fs = require('fs');
const yaml = require('yaml');
const utils = require('../utils');
const sp = require('synchronized-promise');
const { getVideoDurationInSeconds } = require('get-video-duration');

class ArrangementsRepository {
    constructor(mediaDir) {
        this.mediaDir = mediaDir;

        this.listArrangements = this.listArrangements.bind(this);
        this.getArrangement = this.getArrangement.bind(this);
        this.getMediaFiles = this.getMediaFiles.bind(this);
        this.getVideoLength = this.getVideoLength.bind(this);
        this.getFileStream = this.getFileStream.bind(this);
        this.getFileSize = this.getFileSize.bind(this);
    }

    listArrangements() {
        return fs.readdirSync(this.mediaDir)
            .filter(f => fs.lstatSync(`${this.mediaDir}/${f}`).isDirectory());
    }

    getArrangement(arrangement) {
        const arrangementDir = `${this.mediaDir}/${arrangement}`
        const arrangementFilename = `${arrangementDir}/arrangement.yaml`;
        const doesArrangementFileExist = fs.existsSync(arrangementFilename);
        let cfg = {};
        cfg.metadata = { defined: doesArrangementFileExist, invalid: false }
        cfg.title = ''
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
                    if (mediaFiles.indexOf(i.file) == -1) {
                        throw Error(`${i.file} does not exist in ${arrangement}`);
                    }
                });
                cfg = { ...cfg, ...parsed };
            }
            catch (e) {
                cfg.metadata.invalid = true;
                console.error(e);
            }
        }
        return cfg;
    }

    getMediaFiles(arrangement) {
        const arrangementDir = `${this.mediaDir}/${arrangement}`
        return fs.readdirSync(arrangementDir).filter(f => utils.hasValidExtension(f));
    }

    getVideoLength(arrangement, filename) {
        return sp(getVideoDurationInSeconds)(`${this.mediaDir}/${arrangement}/${filename}`);
    }

    getFileStream(arrangement, filename, range = null) {
        const path = `${this.mediaDir}/${arrangement}/${filename}`;
        if (fs.existsSync(path) && fs.lstatSync(path).isFile()) {
            const options = range == null ? {} : { start: range.start, end: range.end };
            return fs.createReadStream(path, options);
        }
        else {
            return null;
        }
    }

    getFileSize(arrangement, filename) {
        const path = `${this.mediaDir}/${arrangement}/${filename}`;
        let size = 0;
        if (fs.existsSync(path)) {
            const stat = fs.lstatSync(path);
            if (stat.isFile()) {
                size = stat.size;
            }
        }
        return size
    }
}

module.exports = ArrangementsRepository;
