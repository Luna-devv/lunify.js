import { Lunify, Track } from '../..';
import { ApiEpisode, ApiPlaybackState } from '../../../interfaces/player';
import { ApiTrack } from '../../../interfaces/track';
import { PartialUser, User } from '../user';
import { PlayerDevice } from './Device';

export class CurrentPlayback {
    public device: PlayerDevice;
    public repeat: 'track' | 'context' | false;
    public shuffle: boolean;
    public context: Omit<Omit<ApiPlaybackState['context'], 'external_urls'>, 'href'> & { externalUrls: Record<string, string>, url: string; };
    public timestamp: number;
    public progress: number;
    public playing: boolean;
    public item: Track | ApiEpisode;
    public playingType: ApiPlaybackState['currently_playing_type'];

    constructor(
        public client: Lunify,
        public user: User | PartialUser,
        data: ApiPlaybackState
    ) {
        this.device = new PlayerDevice(this.client, user, data.device);
        this.repeat = data.repeat_state !== 'off' ? data.repeat_state : false;
        this.shuffle = data.shuffle_state;
        this.context = { type: data.context?.type || null, url: data.context?.href || null, externalUrls: data.context?.external_urls || null, uri: data.context?.uri || null };
        this.timestamp = data.timestamp;
        this.progress = data.progress_ms;
        this.playing = data.is_playing;

        if (data.item.type === 'track') this.item = new Track(client, data.item as ApiTrack);
        else this.item = data.item;

        this.playingType = data.currently_playing_type;
    }

}