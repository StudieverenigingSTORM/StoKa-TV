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
            const style = { color: 'black', backgroundColor: 'red', padding: '10px' }
            return e('h1', { style: { textAlign: 'center' } }, e('span', { style }, '\u26a0 Error!'));
        }
    }

    module.exports = ErrorMessage;
});
