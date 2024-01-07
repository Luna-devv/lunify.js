import { Lunify } from '../..';
import { Player } from '.';
import { ApiDevice } from '../../../interfaces/player';
import { PlayerDevice } from './Device';

export class PlayerDeviceManager {

    constructor(
        public client: Lunify,
        private player: Player,
    ) { }

    /**
     * Fetch all available devices for the user and current playback
     * @example ```ts
     * await player.devices.fetch();
     * ```
     */
    async fetch() {

        const res = await this.client.rest.get<{ devices: ApiDevice[] }>('/me/player/devices', {
            headers: {
                Authorization: await this.player.user.oauth.getAuthorization()
            }
        });

        const devices: PlayerDevice[] = [];

        for (const apiDevice of res.devices) devices.push(new PlayerDevice(this.client, this.player.user, apiDevice));

        return devices;
    }

    /**
     * Transfer the current playback to provided device
     * @param {string | string[]} device - id of the playback device
     * @example ```ts
     * const devices = await player.devices.fetch();
     * const deviceId = devices[0].id;
     * player.devices.transferPlaybackTo(deviceId);
     * ```
     */
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
                Authorization: await this.player.user.oauth.getAuthorization()
            },
            body: {
                device_ids: finalDevices
            }
        });

        return true;
    }

}