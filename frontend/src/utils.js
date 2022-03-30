'use strict';

define(function(require, exports, module) {
    module.exports = {
        getCurrentArrangement: () => {
            return window.location.pathname.substring(1);
        },
        setCurrentArrangement: (arrangement) => {
            window.history.replaceState({}, '', arrangement)
        },
        setupKeyListeners: (eventTarget, app) => {
            eventTarget.addEventListener('keyup', function(event) {
                if (event.key == 'ArrowRight') {
                    app.selectNextArrangement();
                } else if (event.key == 'ArrowLeft') {
                    app.selectPreviousArrangement();
                } else if (event.key == 'ArrowUp') {
                    app.toggleBorrelMenu();
                } else if (event.key == 'ArrowDown') {
                    app.toggleHelp();
                } else if (event.key >= '0' && event.key <= '9') {
                    app.selectArrangementByKey(event.key);
                }
            });
        },
    };
});