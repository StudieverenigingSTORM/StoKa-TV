'use strict';

define(function (require, exports, module) {
    const config = require('config');
    window.document.title = config.title;

    const React = require('react');
    const ReactDom = require('react-dom');

    // expose e globally
    window.e = React.createElement;

    const App = require('components/app');

    const domContainer = document.querySelector('#reactDomContainer');
    const app = e(App, { config: config })
    ReactDom.render(app, domContainer);
});
