'use strict';

const globalCfg = require('../config');
const utils = require('../utils');

class ArrangementsController {
    constructor(dataSource) {
        this.dataSource = dataSource;

        this.getArrangement = this.getArrangement.bind(this);

        this.listArrangements = this.dataSource.listArrangements;
        this.getFileStream = this.dataSource.getFileStream;
        this.getFileSize = this.dataSource.getFileSize;
    }

    getArrangement(arrangement) {
        let cfg = this.dataSource.getArrangement(arrangement);
        if (!cfg.metadata.defined || cfg.metadata.invalid) {
            // If no configuration file was found, generate a default configuration
            cfg.name = arrangement;
            cfg.items = this.dataSource.getMediaFiles(arrangement).map(f => { return { file: f } });
        }
        // Apply type annotation
        cfg.items = cfg.items.map(i => {
            i.type = utils.getMimeType(i.file).split('/')[0];
            return i;
        });
        // Apply default image display time
        cfg.items = cfg.items.map(i => {
            if (!i.hasOwnProperty('duration')) {
                if (i.type == 'image') {
                    i.duration = globalCfg.defaultImageDuration;
                }
                else if (i.type == 'video') {
                    i.duration = this.dataSource.getVideoLength(arrangement, i.file);
                }
            }
            return i;
        });
        return cfg;
    };
}

module.exports = ArrangementsController;
