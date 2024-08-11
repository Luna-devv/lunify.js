import { ApiTrack } from './track';
import { ApiEpisode } from './episode';

export enum PlayerContextType {
    Artist = 'artist',
    Playlist = 'playlist',
    Album = 'album',
    Show = 'show',
}

export enum CurrentlyPlayingType {
    Track = 'track',
    Episode = 'episode',
    // when not even spotify knows what you're playing, you music taste might suck
    Unknown = 'unknown'
}

export interface ApiDevice {
    id?: string;
    is_active: boolean;
    is_private_session: boolean;
    is_restricted: boolean;
    name: string;
    type: string;
    volume_percent: number | null;
    supports_volume: boolean;
}

export interface ApiPlaybackState {
    device: ApiDevice;
    repeat_state: 'off' | 'track' | 'context';
    shuffle_state: boolean;
    context?: {
        type: PlayerContextType;
        href: string;
        external_urls: Record<string, string>;
        uri: string;
    };
    timestamp: number;
    progress_ms: number;
    is_playing: boolean;
    item?: ApiTrack | ApiEpisode;
    currently_playing_type: CurrentlyPlayingType;
    actions: {
        interrupting_playback: boolean
        pausing: boolean
        resuming: boolean
        seeking: boolean
        skipping_next: boolean
        skipping_prev: boolean
        toggling_repeat_context: boolean
        toggling_shuffle: boolean
        toggling_repeat_track: boolean
        transferring_playback: boolean
    };
}