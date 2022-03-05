'use strict';

const iframe = document.querySelector('iframe');

// Show hosted app
iframe.setAttribute('src', iframeUrl);

// Set up input
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

// Set up auto-start
if(tizen.alarm.getAll().length == 0) {
	// Sets an alarm occurring on every weekday at 08:40, starting from January 1st 2016
    const alarm = new tizen.AlarmAbsolute(new Date(2016, 0, 1, 8, 40), ["MO", "TU", "WE", "TH", "FR"]);
	const appId = tizen.application.getCurrentApplication().appInfo.id;
	tizen.alarm.add(alarm, appId);
}

