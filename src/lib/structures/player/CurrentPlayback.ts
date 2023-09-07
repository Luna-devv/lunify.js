import { Lunify } from '../..';
import { ApiPlaybackState } from '../../../interfaces/player';
import { User } from '../user';
import { PlayerDevice } from './Device';

export class CurrentPlayback {
    public device: PlayerDevice;
    public repeat: 'track' | 'context' | false;
    public shuffle: boolean;

    constructor(
        public client: Lunify,
        public user: User,
        data: ApiPlaybackState
    ) {
        this.device = new PlayerDevice(this.client, user, data.device);
        this.repeat = data.repeat_state !== 'off' ? data.repeat_state : false;
        this.shuffle = data.shuffle_state;
    }

}