import { h, Component } from 'preact';
import style from './style.less';

export default class About extends Component {

    render() {
        return (
            <div class={style.profile}>
                <h1>About Uploop!</h1>

                <p>
                I watch movies on my desktop computer while I'm lying on the bed and
                everytime that I have to turn up the volume I have to get out of bed.
                The same happens when I have to shutdown or suspend the computer.
                </p>
                <p> Uploop! solves that problem. </p>

                <div>Uploop! was developed for personal use.</div>
                <div>Currently it only works on linux (debian-based distros).</div>
                <div>To ask questions or doubts write to <a href="mailto:efealde@gmail.com">efealde@gmail.com</a>
                </div>
            </div>
        );
    }
}
