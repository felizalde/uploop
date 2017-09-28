const util = require('util');
const exec = util.promisify(require('child_process').exec);


class SoundHelper {

    constructor() {
        const platform = process.platform;
        switch (platform) {
            case 'linux':
                this.manager = new Amixer();
                break;

            default:
                throw 'Platform not supported';
        }
    }

    getVolume() {
        return this.manager.getVolume();
    }

    setVolume( percent ) {
        if ((percent >= 0) && (percent <= 100)) {
            this.manager.setVolume(percent)
                .then(() => {
                    console.log(`volume setted to ${percent}%`);
                });
        }
    }
}


class Amixer {

    constructor() {
        this.scontrol = 'Master';
    }

    async getVolume() {
        const { stdout } = await exec(`amixer sget '${this.scontrol}'`);
        //eslint-disable-next-line
        const re = /(?:\d*\%)/g;
        const volume = re[Symbol.match](stdout);
        return parseInt(volume[0].substring(0, volume[0].length - 1), 10);
    }

    setVolume( percent ) {
        return exec(`amixer sset '${this.scontrol}' ${percent}%`);
    }
}

module.exports = new SoundHelper();
