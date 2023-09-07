import { Lunify } from '../..';
import { Player } from '.';
import { ApiDevice } from '../../../interfaces/player';
import { PlayerDevice } from './Device';

export class PlayerDevices {

    constructor(
        public client: Lunify,
        private player: Player,
    ) { }

    async fetch() {

        const res = await this.client.rest.get<{ devices: ApiDevice[] }>('/me/player/devices', {
            headers: {
                Authorization: this.player.user.oauth.getAuthorization()
            }
        });

        const devices: PlayerDevice[] = [];

        for (const apiDevice of res.devices) devices.push(new PlayerDevice(this.client, this.player.user, apiDevice));

        return devices;
    }

    async transferPlaybackTo(device: string | string[]) {

        const finalDevices: string[] = [];

        if (typeof device !== 'string') {
            for (const d of device) finalDevices.push(d);
        }
        else {
            finalDevices.push(device);
        }

        await this.client.rest.put('/me/player', {
            headers: {
                Authorization: this.player.user.oauth.getAuthorization()
            },
            body: {
                device_ids: finalDevices
            }
        });

        return true;
    }

}