import { h, Component } from 'preact';
import _ from 'lodash';
import style from './style';

export default class ScheduleTime extends Component {


    renderOptions(cant, d) {
        return _.times(cant, (i) => <option value={i}> {i}{d} </option> );
    }

    render() {
        const {hours, minutes, seconds, shutdown, suspend} = this.props;
        return (
            <div class={style.section}>
                <h3> Schedule time</h3>
                <div>
                    <select disabled={shutdown || suspend} name="hours"
                        type="select" value={hours} onChange={this.props.onChanges}>

                        {this.renderOptions(3, 'h')}

                    </select>
                    <select disabled={shutdown || suspend} name="minutes"
                        type="select" value={minutes} onChange={this.props.onChanges}>

                        {this.renderOptions(59, 'm')}

                    </select>
                    <select disabled={shutdown || suspend} name="seconds"
                        type="select" value={seconds} onChange={this.props.onChanges}>

                        {this.renderOptions(59, 's')}

                    </select>
                </div>
                <div>
                    <div>
                        <h5> to shutdown </h5>
                        <label class={style.switch}>
                          <input name="shutdown" type="checkbox" checked={shutdown} onChange={this.props.onChanges}/>
                          <span class={style.slider}/>
                        </label>
                    </div>
                    <div>
                        <h5> to make sleep </h5>
                        <label class={style.switch}>
                          <input name="suspend" type="checkbox" checked={suspend} onChange={this.props.onChanges}/>
                          <span class={style.slider}/>
                        </label>
                    </div>
                </div>
            </div>
        );
    }
}