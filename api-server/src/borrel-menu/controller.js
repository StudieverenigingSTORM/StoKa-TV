'use strict';

class BorrelMenuController {
    constructor(dataSource) {
        this.dataSource = dataSource;

        this.getBorrelMenu = dataSource.getBorrelMenu;
    }
}

module.exports = BorrelMenuController;
