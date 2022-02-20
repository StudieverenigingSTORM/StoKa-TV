'use strict';

define(function (require, exports, module) {
    const BaseComponent = require('components/base');

    class Help extends BaseComponent {
        constructor(props) {
            super(props);
        }

        componentDidMount() {
            super.componentDidMount();
        }

        render() {
            return e('h1', { className: 'card help' }, '[[Help]]');
        }
    }

    module.exports = Help;
});