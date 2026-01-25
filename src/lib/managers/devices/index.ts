import type { ApiDevice } from "../../../interfaces/player";
import type { Lunify, Player } from "../..";
import { PlayerDevice } from "../..";

export class PlayerDeviceManager {

    constructor(
        public client: Lunify,
        public player: Player
    ) {}

    /**
     * Fetch all available devices for the user and current playback
     * @example ```ts
     * await player.devices.fetch();
     * ```
     */
    async fetch() {

        const res = await this.client.rest.get<{ devices: ApiDevice[]; }>("/me/player/devices", {
            headers: {
                Authorization: await this.player.user.oauth.getAuthorization()
            }
        });

        return res.devices.map((device) =>
            new PlayerDevice(this.client, this.player, device)
        );
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
    async transferPlaybackTo(deviceId: string | string[]) {

        await this.client.rest.put("/me/player", {
            headers: {
                Authorization: await this.player.user.oauth.getAuthorization()
            },
            body: {
                device_ids: typeof deviceId === "string"
                    ? [deviceId]
                    : deviceId
            }
        });

        return true;
    }

}