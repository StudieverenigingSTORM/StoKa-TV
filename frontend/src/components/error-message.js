'use strict';

define(function (require, exports, module) {
    const BaseComponent = require('components/base');

    class ErrorMessage extends BaseComponent {
        constructor(props) {
            super(props);
        }

        componentDidMount() {
            super.componentDidMount();
            console.error(this.props.message);
        }

        render() {
            return e('h1', { className: 'error-message' }, 'Error!');
        }
    }

    module.exports = ErrorMessage;
});
