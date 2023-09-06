import Lunify from '..';
import { ApiGetDevice } from '../../interfaces/player';
import { UserManager } from '../user';

export class PlayerDeviceManager {
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
        public user: UserManager,
        data: ApiGetDevice
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
     * Refresh the spotify access token
     * @returns Whenever the refresh was successfull or not
     */
    async transferPlaybackTo() {
        if (this.active) return false;

        await this.user.player.devices.transferPlaybackTo(this.id);

        return true;
    }

}