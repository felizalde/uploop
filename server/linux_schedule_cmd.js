const { exec } = require('child_process');
//https://askubuntu.com/questions/1792/how-can-i-suspend-hibernate-from-command-line

const SHUTDOWN = 'suspend'; // HACK: change to 'shutdown'. 
const SUSPEND = 'suspend';

const action = process.argv[2];
const h = parseInt(process.argv[3]);
const m = parseInt(process.argv[4]);
const s = parseInt(process.argv[5]);

const delay = (h, m , s) => {
	const hoursToMinute = h * 60;
	const secondToMinute = s/60;
	return ((hoursToMinute + m + secondToMinute) * 60000) 
}

setTimeout(() => {
	(action === SUSPEND) ? exec('systemctl suspend -i')
						 : exec('systemctl halt -i');
}, delay(h,m,s));



