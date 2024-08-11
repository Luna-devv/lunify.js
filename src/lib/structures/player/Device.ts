import { Lunify } from '../..';
import { ApiDevice } from '../../../interfaces/player';
import { Player } from '.';

export class PlayerDevice {
    public id?: string;
    public active: boolean;
    public privateSession: boolean;
    public restricted: boolean;
    public name: string;
    public type: string;
    public volume: number;
    public supportsVolume: boolean;

    constructor(
        public client: Lunify,
        public player: Player,
        data: ApiDevice
    ) {
        this.id = data.id;
        this.active = data.is_active;
        this.privateSession = data.is_private_session;
        this.restricted = data.is_restricted;
        this.name = data.name;
        this.type = data.type;
        this.volume = data.volume_percent ?? 100;
        this.supportsVolume = data.supports_volume;
    }

    /**
     * Transfer the current playback to this device
     * @returns Whenever the refresh was successfull or not
     */
    async transferPlaybackTo() {
        if (this.active) return false;

        await this.player.devices.transferPlaybackTo(this.id);

        return true;
    }

}