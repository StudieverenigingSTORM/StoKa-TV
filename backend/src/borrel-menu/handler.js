'use strict';

class BorrelMenuHandler {
    constructor(controller) {
        this.controller = controller;

        this.getBorrelMenu = this.getBorrelMenu.bind(this);
    }

    getBorrelMenu(_, res) {
        const content = this.controller.getBorrelMenu();
        if (content == null) {
            res.status(404).end();
        }
        else {
            res.writeHead(200, {
                'Content-Type': content.mimetype,
                'Content-disposition': `inline;filename=${content.filename}`,
                'Content-Length': content.buffer.length,
            });
            res.end(content.buffer);
        }
    }
}

module.exports = BorrelMenuHandler;
