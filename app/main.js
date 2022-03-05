'use strict';

var value = tizen.tvinputdevice.getSupportedKeys().map(k => k.name);
console.log('Supported keys:')
console.log(value);

document.querySelector('iframe').setAttribute('src', iframeUrl);
