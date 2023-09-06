export interface ApiGetDevice {
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
    device: ApiGetDevice;
    repeat_state: 'off' | 'track' | 'context';
    shuffle_state: boolean;
    context?: {
        type: 'artist' | 'playlist' | 'album' | 'show';
        href: string;
        external_urls: Record<string, string>;
        uri: string;
    };
    timestamp: number;
    progress_ms: number;
    is_playing: boolean;
    item?: (ApiTrack | ApiEpisode)[];
    currently_playing_type: 'track' | 'episode' | 'unknown';
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

interface ApiTrack {
    album: ApiAlbum;
    artists: ApiArtist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: Record<string, string>;
    external_urls: Record<string, string>;
    href: string;
    id: string;
    is_playable: boolean;
    linked_from: {
        // Include properties related to linked tracks here
    };
    name: string;
    popularity: number;
    preview_url: string | null;
    track_number: number;
    type: 'track';
    uri: string;
    is_local: boolean;
}

interface ApiEpisode {
    audio_preview_url: string | null;
    description: string;
    html_description: string;
    duration_ms: number;
    explicit: boolean;
    external_urls: Record<string, string>;
    href: string;
    id: string;
    images: ApiImage[];
    is_externally_hosted: boolean;
    is_playable: boolean;
    /**
     * @deprecated {@link https://developer.spotify.com/documentation/web-api/reference/get-information-about-the-users-current-playback}
     */
    language?: string;
    languages: string[];
    name: string;
    release_date: string;
    release_date_precision: 'year' | 'month' | 'day';
    resume_point: {
        fully_played: boolean;
        resume_position_ms: number;
    };
    type: 'episode';
    uri: string;
    rescritions: {
        reason: 'market' | 'product' | 'explicit'
    };
    show: {
        available_markets: string[];
        copyrights: {
            text: string;
            type: 'C' | 'P'
        }
        description: string;
        html_description: string;
        explicit: boolean;
        external_urls: Record<string, string>;
        href: string;
        id: string;
        images: ApiImage[];
        is_externally_hosted: boolean | null;
        languages: string[];
        media_type: string;
        name: string;
        publisher: string;
        type: 'show';
        uri: string;
        total_episodes: number;
    };
}

export interface ApiAlbum {
    album_type: 'album' | 'single' | 'compilation'
    total_tracks: number
    available_markets: string[]
    external_urls: Record<string, string>;
    href: string
    id: string
    images: ApiImage[]
    name: string
    release_date: string
    release_date_precision: 'year' | 'month' | 'day';
    rescritions: {
        reason: 'market' | 'product' | 'explicit'
    };
    type: string
    uri: string
    artists: ApiArtist[]
}

export interface ApiArtist {
    external_urls: Record<string, string>;
    followers: {
        href: string;
        total: number;
    };
    genres: string[]
    href: string
    id: string
    images: ApiImage[]
    name: string
    popularity: number
    type: 'artist'
    uri: string
}

export interface ApiImage {
    url: string;
    height: number;
    width: number;
}