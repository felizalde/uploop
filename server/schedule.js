const { exec } = require('child_process');
const killer = require('tree-kill');

//CHECK PLATFORM
const SHUTDOWN = (h,m,s) => `node ${__dirname}/linux_schedule_cmd.js shutdown ${h} ${m} ${s}`;
const SUSPEND =  (h,m,s) => `node ${__dirname}/linux_schedule_cmd.js suspend ${h} ${m} ${s}`;

class ScheduleHelper {

	constructor() {
		this.hasActive = false;
		this.ref_process = null;
		this._handleChildProcess = this._handleChildProcess.bind(this);
	}

	_handleChildProcess(error, stdout, stderr) {
		if (error) {
			console.log(`error exec: ${error}`);
			return;
		}

		console.log('Child process finished');
		console.log(stdout, stderr);
		this.hasActive = false;
	}

	_killChildProcess() {
		killer(this.ref_process.pid, 'SIGKILL', (err) => {
			if (err) {
				console.log(`error killer: ${err}`);
				return;
			}
			this.hasActive = false;
		});
	}

	active(schedule) {
		console.log('Active called.');
		if (this.hasActive) {
			this._killChildProcess();
		}
		const {hours, minutes, seconds} = schedule;
		const cmd = (schedule.shutdown) ? SHUTDOWN(hours, minutes, seconds)
			: SUSPEND(hours, minutes, seconds);
		this.ref_process = exec(cmd, this._handleChildProcess);
		this.hasActive = true;
	}

	cancel() {
		console.log('Cancel called.');
		if (this.hasActive) {
			this._killChildProcess();
		}
	}
}


module.exports = new ScheduleHelper();