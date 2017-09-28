import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import Home from './home';
import About from './about';

import {
	createSocket,
	activeSchedule,
	cancelSchedule,
	changeVolume } from '../lib/service';


export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	constructor(props) {
		super(props);
		this.state = {
			volume: 50,
			control: 'Master',
			hours: 0,
			minutes: 30,
			seconds: 0,
			shutdown: false,
			suspend: false
		};

		this.handleChanges = this.handleChanges.bind(this);
	}

	handleChanges(e){
		const target = e.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		switch (name) {
			case 'shutdown':
				(value) ? this.setState({shutdown: true, suspend: false},
					() => activeSchedule(this.state))
					: this.setState({[name]: value}, () => cancelSchedule());
				break;
			case 'suspend':
				(value) ? this.setState({shutdown: false, suspend: true},
					() => activeSchedule(this.state))
					: this.setState({[name]: value}, () => cancelSchedule());
				break;
			case 'volume':
				this.setState({[name] : value}, () => changeVolume({[name] : value}));
				break;
			default:
				this.setState({[name] : value});
		}
	}

	componentDidMount() {
		createSocket(window.location.hostname, this);
	}

	render() {
		const {volume, control, hours, minutes, seconds, shutdown, suspend} = this.state;
		return (
			<div id="app">
				<Header />
				<Router onChange={this.handleRoute}>
					<Home path="/"
						volumeState={{volume, control}}
						scheduleState={{hours, minutes, seconds, shutdown, suspend}}
						onVolumeChanges={this.handleChanges}
						onTimeChanges={this.handleChanges}
					/>
					<About path="/about"/>
				</Router>
			</div>
		);
	}
}
