'use strict';

define(function (require, exports, module) {
    const config = require('config');
    window.document.title = config.title;

    const React = require('react');
    const ReactDom = require('react-dom');
    const e = React.createElement;

    const Demo = require('demo');

    const domContainer = document.querySelector('#reactDomContainer');
    ReactDom.render(e(Demo), domContainer);
});
