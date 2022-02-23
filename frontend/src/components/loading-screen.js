'use strict';

define(function(require, exports, module) {
    const BaseComponent = require('./base');

    class LoadingScreen extends BaseComponent {
        constructor(props) {
            super(props);
        }

        render() {
            return e('div', { className: 'loading-screen' }, e('div'));
        }
    }

    module.exports = LoadingScreen;
});