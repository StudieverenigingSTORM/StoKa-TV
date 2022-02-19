'use strict';

define(function (require, exports, module) {
    module.exports = {
        getCurrentArrangement: () => {
            return window.location.pathname.substring(1);
        },
        setCurrentArrangement: (arrangement) => {
            window.history.replaceState({}, '', arrangement)
        },
        setupKeyListeners: (eventTarget, app) => {  
            eventTarget.addEventListener('keyup', function (event) {
                if (event.key == 'ArrowRight') {
                    app.selectNextArrangement();
                }
                else if (event.key == 'ArrowLeft') {
                    app.selectPreviousArrangement();
                }
            });
        },
    };
});