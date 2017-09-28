import { h, Component } from 'preact';

import ScheduleTime from './time';
import Volume from './volume';
import style from './style.less';

export default class Home extends Component {

    render() {
        const {hours, minutes, seconds, shutdown, suspend} = this.props.scheduleState;
        const {volume, control} = this.props.volumeState;

        return (
            <div class={style.home}>
                <Volume volume={volume}
                    control={control}
                    onChange={this.props.onVolumeChanges}
                />
                <ScheduleTime
                    hours={hours}
                    minutes={minutes}
                    seconds={seconds}
                    shutdown={shutdown}
                    suspend={suspend}
                    onChanges={this.props.onTimeChanges}
                />
            </div>
        );
    }
}
