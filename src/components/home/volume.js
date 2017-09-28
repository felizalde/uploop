import { h, Component } from 'preact';
import style from './style';


export default class Volume extends Component {

    render() {
        const {volume} = this.props;
        return (
            <div class={style.volume}>
                <h3> Volume up or down! </h3>
                <input type="range" min="1" max="100"
                    value={volume} name="volume" onChange={this.props.onChange} />
                <div>
                    <div>
                        <h5>Controls</h5>
                        <select>
                            <option value="Master">master</option>
                        </select>
                    </div>
                    <div>
                        <h5>Volume</h5>
                        <div> {volume}% </div>
                    </div>
                </div>
            </div>
        );
    }
}
