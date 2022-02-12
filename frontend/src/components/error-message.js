'use strict';

define(function (require, exports, module) {
    const React = require('react');
    const e = React.createElement;

    class ErrorMessage extends React.Component {
        constructor(props) {
            super(props);
        }

        componentDidMount() {
            console.error(this.props.errorObject);
        }

        render() {
            return e('h1', null, 'Error!');
        }
    }

    module.exports = ErrorMessage;
});
