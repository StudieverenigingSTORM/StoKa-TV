'use strict';

module.exports = function(dataSource){
    const { listArrangements, getArrangement } = dataSource;
    let controller = {};

    controller.listArrangements = listArrangements;

    controller.getArrangement = getArrangement;

    return controller;
};
