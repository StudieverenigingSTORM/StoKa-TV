'use strict';

module.exports = function(model){
    const { listArrangements, getArrangement } = model;
    let controller = {};

    controller.listArrangements = listArrangements;

    controller.getArrangement = getArrangement;

    return controller;
};
