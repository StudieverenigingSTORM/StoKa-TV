'use strict';

define(function (require, exports, module) {
    const React = require('react');
    const e = React.createElement;

    class ErrorMessage extends React.Component {
        constructor(props) {
            super(props);
        }

        componentDidMount() {
            console.error(this.props.message);
        }

        render() {
            return e('h1', { className: 'error-message' }, 'Error!');
        }
    }

    module.exports = ErrorMessage;
});
