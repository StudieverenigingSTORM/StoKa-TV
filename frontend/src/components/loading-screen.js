'use strict';

define(function (require, exports, module) {
    const BaseComponent = require('components/base');

    class LoadingScreen extends BaseComponent {
        constructor(props) {
            super(props);
        }

        render() {
            return e('h1', null, 'Loading...');
        }
    }

    module.exports = LoadingScreen;
});
