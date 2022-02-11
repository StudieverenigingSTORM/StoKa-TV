'use strict';

const utils = require('../utils');

class ArrangementsHandler {
    constructor(controller) {
        this.controller = controller;

        this.listArrangements = this.listArrangements.bind(this);
        this.getArrangement = this.getArrangement.bind(this);
        this.getFile = this.getFile.bind(this);
    }

    listArrangements(_, res) {
        res.json(this.controller.listArrangements().filter(f => f.charAt(0) != '.').map(f => encodeURIComponent(f)));
    }

    getArrangement(req, res) {
        const arrangement = req.params['arrangement'];
        if (!this.controller.listArrangements().includes(arrangement)) {
            res.status(404).end()
        }
        res.json(this.controller.getArrangement(arrangement));
    }

    getFile(req, res) {
        const arrangement = req.params['arrangement'];
        const filename = req.params['file'];
        let content = null;
        const mimetype = utils.getMimeType(filename);
        const size = this.controller.getFileSize(arrangement, filename);
        const range = utils.getRangeFromRequest(req, size);
        // Stream video (return partial content) if possible
        if (range && mimetype.split('/')[0] == 'video') {
            content = this.controller.getFileStream(arrangement, filename, range);
            if (content != null) {
                res.writeHead(206, {
                    'Content-Type': mimetype,
                    'Content-disposition': `inline;filename=${arrangement}_${filename}`,
                    'Content-Range': `bytes ${range.start}-${range.end}/${size}`,
                    'Accept-Ranges': 'bytes',
                    'Content-Length': (range.end - range.start) + 1,
                });
            }
        }
        else {
            content = this.controller.getFileStream(arrangement, filename, range);
            if (content != null) {
                res.writeHead(200, {
                    'Content-Type': mimetype,
                    'Content-disposition': `inline;filename=${arrangement}_${filename}`,
                    'Content-Length': size,
                });
            }
        }
        if (content == null) {
            res.status(404).end()
        }
        else {
            content.pipe(res);
        }
    }
}

module.exports = ArrangementsHandler;
