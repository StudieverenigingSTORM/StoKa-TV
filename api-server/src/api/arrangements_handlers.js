'use strict';

const utils = require('../utils');

module.exports = function(controller){
    const { listArrangements, getArrangement, getFile } = controller;
    let handlers = {};

    handlers.listArrangements = function(_, res) {
        res.json(listArrangements().filter(f => f.charAt(0) != '.').map(f => encodeURIComponent(f)));
    }

    handlers.getArrangement = function(req, res) {
        const arrangement = req.params['arrangement'];
        if (!listArrangements().includes(arrangement)) {
            res.status(404).end()
        }
        res.json(getArrangement(arrangement));
    }

    handlers.getFile = function(req, res) {
        const arrangement = req.params['arrangement'];
        const filename = req.params['file'];
        let content = null;
        const mimetype = utils.getMimeType(filename);
        if(mimetype.split('/')[0] == 'video') {
            // TODO return video
            content = 'Video is work in progress';
        }
        else {
            content = getFile(arrangement, filename);
            res.writeHead(200, {
                'Content-Type': mimetype,
                'Content-disposition': `inline;filename=${arrangement}_${filename}`,
                'Content-Length': content.length,
            });
        }
        if (content == null) {
            res.status(404).end()
        }
        else {
            res.end(Buffer.from(content, 'binary'));
        }
    }

    return handlers;
};
