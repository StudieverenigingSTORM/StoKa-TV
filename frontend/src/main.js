'use strict';

define(function(require, exports, module) {
    const config = require('config');
    const utils = require('utils');

    const React = require('react');
    const ReactDom = require('react-dom');

    const App = require('components/app');

    window.document.title = config.title;
    // expose e globally
    window.e = React.createElement;

    const appRef = React.createRef();
    const app = e(App, {
        ref: appRef,
        config: config,
        initialArrangement: utils.getCurrentArrangement(),
        onSelectArrangement: utils.setCurrentArrangement,
    });

    const domContainer = document.querySelector('#reactDomContainer');
    ReactDom.render(app, domContainer);
    // Has to be called after the render function or current will be null
    utils.setupKeyListeners(window, appRef.current);
});