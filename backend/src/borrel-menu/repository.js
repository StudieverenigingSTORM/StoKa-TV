'use strict';

const fs = require('fs');
const config = require('../config');
const utils = require('../utils');

class BorrelMenuRepository {
    constructor(mediaDir) {
        this.mediaDir = mediaDir;

        this.getBorrelMenu = this.getBorrelMenu.bind(this);
    }

    getBorrelMenu() {
        const borrelMenuFilename = fs.readdirSync(this.mediaDir)
            .filter(f => f.substring(0, f.lastIndexOf('.')) == config.borrelMenuFilenameWithoutExtension)
            .filter(f => fs.lstatSync(`${this.mediaDir}/${f}`).isFile())
            .filter(f => utils.isImageFile(f))[0];
        if (borrelMenuFilename == null) {
            return null;
        }
        else {
            const buffer = fs.readFileSync(`${this.mediaDir}/${borrelMenuFilename}`);
            const mimetype = utils.getMimeType(borrelMenuFilename);
            return {
                filename: borrelMenuFilename,
                mimetype: mimetype,
                buffer: buffer,
            }
        }
    }
}

module.exports = BorrelMenuRepository;
