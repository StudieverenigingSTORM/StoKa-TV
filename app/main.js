'use strict';

const iframe = document.querySelector('iframe');

iframe.setAttribute('src', iframeUrl);

tizen.tvinputdevice.unregisterKey("Exit");

tizen.tvinputdevice.registerKey('Info');
for(let i = 0; i < 10; i++) {
	tizen.tvinputdevice.registerKey(`${i}`);
}

document.addEventListener('keyup', (event) => {
	if (event.key == 'ArrowRight') {
		iframe.contentWindow.app.selectNextArrangement();
	} else if (event.key == 'ArrowLeft') {
		iframe.contentWindow.app.selectPreviousArrangement();
	} else if (event.key == 'ArrowUp' || event.key == 'ArrowDown') {
		iframe.contentWindow.app.toggleBorrelMenu();
	} else if (event.key.endsWith('Info')) {
		iframe.contentWindow.app.toggleHelp();
	} else if (event.key >= '0' && event.key <= '9') {
		iframe.contentWindow.app.selectArrangementByKey(event.key);
	}
});
