'use strict';

const baseUrl = window.location.href.split('/').slice(0, -1).join('/');

define(function(require, exports, module) {
    module.exports = {
        title: 'StoKa-TV', // Do NOT change title
        apiBaseUrl: baseUrl + '/api',
        titleTimeout: 3000,
        notFoundTimeout: 1500,
        reloadArrangementsInterval: 5000,
        transitionTime: 800 /* CSS transition time */ ,
    };
});