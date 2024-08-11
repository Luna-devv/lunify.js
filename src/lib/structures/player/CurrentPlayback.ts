import { Lunify, Track } from '../..';
import { ApiPlaybackState, CurrentlyPlayingType, PlayerContextType } from '../../../interfaces/player';
import { ApiTrack } from '../../../interfaces/track';
import { PlayerDevice } from './Device';
import { Player } from '.';
import { ApiEpisode } from '../../../interfaces/episode';

export class CurrentPlayback {
    public device: PlayerDevice;
    public repeat: 'track' | 'context' | false;
    public shuffle: boolean;
    public context?: {
        type: PlayerContextType;
        url: string;
        externalUrls: Record<string, string>;
        uri: string;
    };
    public timestamp: number;
    public progress: number;
    public playing: boolean;
    public item: Track | ApiEpisode;
    public playingType: CurrentlyPlayingType;

    constructor(
        public client: Lunify,
        public player: Player,
        data: ApiPlaybackState
    ) {
        this.device = new PlayerDevice(this.client, player, data.device);
        this.repeat = data.repeat_state !== 'off' ? data.repeat_state : false;
        this.shuffle = data.shuffle_state;
        this.context = data.context
            ? { type: data.context.type, url: data.context.href, externalUrls: data.context.external_urls, uri: data.context.uri }
            : null;
        this.timestamp = data.timestamp;
        this.progress = data.progress_ms;
        this.playing = data.is_playing;

        if (data.item.type === 'track') this.item = new Track(client, data.item as ApiTrack);
        else this.item = data.item;

        this.playingType = data.currently_playing_type;
    }

}