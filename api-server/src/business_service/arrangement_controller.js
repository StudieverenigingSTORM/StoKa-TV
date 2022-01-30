'use strict';

const globalCfg = require('../config');
const utils = require('../utils');

module.exports = function (dataSource) {
    let controller = {};

    controller.listArrangements = dataSource.listArrangements;

    controller.getArrangement = (arrangement) => {
        let cfg = dataSource.getArrangement(arrangement);
        if (!cfg.metadata.defined || cfg.metadata.invalid) {
            // If no configuration file was found, generate a default configuration
            cfg.name = arrangement;
            cfg.items = dataSource.getMediaFiles(arrangement).map(f => { return { file: f } });
        }
        // Apply type annotation
        cfg.items = cfg.items.map(i => {
            i.type = utils.getFileType(i.file);
            return i;
        });
        // Apply default image display time
        cfg.items = cfg.items.map(i => {
            if (!i.hasOwnProperty('duration')) {
                if(i.type == 'image') {
                    i.duration = globalCfg.defaultImageDuration;
                }
                else if(i.type == 'video') {
                    i.duration = dataSource.getVideoLength(arrangement, i.file);
                }
            }
            return i;
        });
        return cfg;
    };

    return controller;
};
