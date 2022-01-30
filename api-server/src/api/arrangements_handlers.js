'use strict';

const utils = require('../utils');

module.exports = function (controller) {
    let handlers = {};

    handlers.listArrangements = function (_, res) {
        res.json(controller.listArrangements().filter(f => f.charAt(0) != '.').map(f => encodeURIComponent(f)));
    }

    handlers.getArrangement = function (req, res) {
        const arrangement = req.params['arrangement'];
        if (!controller.listArrangements().includes(arrangement)) {
            res.status(404).end()
        }
        res.json(controller.getArrangement(arrangement));
    }

    handlers.getFile = function (req, res) {
        const arrangement = req.params['arrangement'];
        const filename = req.params['file'];
        let content = null;
        const mimetype = utils.getMimeType(filename);
        const size = controller.getFileSize(arrangement, filename);
        const range = utils.getRangeFromRequest(req, size);
        // Stream video (return partial content) if possible
        if (range && mimetype.split('/')[0] == 'video') {
            content = controller.getFileStream(arrangement, filename, range.start, range.end);
            res.writeHead(206, {
                'Content-Type': mimetype,
                'Content-disposition': `inline;filename=${arrangement}_${filename}`,
                'Content-Range': `bytes ${range.start}-${range.end}/${size}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': (range.end - range.start) + 1,
            });
            if(content != null) {
                console.log(typeof content);
                content.pipe(res);
                return; // End function here to stop returning content
            }
        }
        else {
            content = controller.getFile(arrangement, filename);
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
