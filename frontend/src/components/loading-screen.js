'use strict';

define(function (require, exports, module) {
    const React = require('react');
    const e = React.createElement;

    class LoadingScreen extends React.Component {
        constructor(props) {
            super(props);
        }

        render() {
            return e('h1', null, 'Loading...');
        }
    }

    module.exports = LoadingScreen;
});
