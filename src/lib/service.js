
import io from 'socket.io-client';

let socket;
let ref_obj;

function activeSchedule(schedule) {
	if (socket){
		socket.emit('active_schedule', schedule);
	}
}

function cancelSchedule() {
	if (socket) {
		socket.emit('cancel_schedule');
	}
}

function changeVolume(volume){
	if (socket) {
		socket.emit('change_volume', volume);
	}
}

function createSocket(hostname, obj) {
	console.log(`createSocket -> ${hostname}:3000`);

	if (!socket) {
		
		socket = io(`http://${hostname}:3000`, {forceNew: false, autoConnect: false});
		
	}
	socket.open();

	ref_obj = obj;

	socket.on('init_volume', (volume) => {
		ref_obj.setState(volume);
	});
}


module.exports = {
	activeSchedule,
	cancelSchedule,
	changeVolume,
	createSocket
};