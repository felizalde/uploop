import { h, Component } from 'preact';
import { Link } from 'preact-router';
import style from './style.less';

export default class Header extends Component {
	render() {
		return (
			<header class={style.header}>
				<Link href="/"><h1>Uploop!</h1></Link>
				<nav>
					<Link href="/about">About</Link>
				</nav>
			</header>
		);
	}
}
