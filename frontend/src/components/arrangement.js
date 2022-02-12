'use strict';

define(function (require, exports, module) {
    const React = require('react');
    const e = React.createElement;

    class Arrangement extends React.Component {
        constructor(props) {
            super(props);
        }

        render() {
            // TODO implement
            return e('h1', null, 'Arrangement: ' + this.props.arrangement);
        }
    }

    module.exports = Arrangement;
});
