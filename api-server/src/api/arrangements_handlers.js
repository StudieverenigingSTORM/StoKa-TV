'use strict';

module.exports = function(controller){
    const { listArrangements, getArrangement } = controller;
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

    return handlers;
};
