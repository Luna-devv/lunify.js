import { Lunify } from '../..';
// import { ApiAlbum } from '../../../interfaces/album';
// import { ApiArtist } from '../../../interfaces/artists';
import { ApiTrack } from '../../../interfaces/track';

export class Track {
    // public album: ApiAlbum; // TODO
    // public artists: ApiArtist[]; // TODO
    public markets: string[];
    public disc: number;
    public duration: number;
    public explicit: boolean;
    public externalIds: Record<string, string>;
    public externalUrls: Record<string, string>;
    public url: string;
    public id: string;
    public playable: boolean;
    public linkedFrom: Record<string, string>;
    public restrictions: 'market' | 'product' | 'explicit';
    public name: string;
    public popularity: number;
    public previewUrl: string | null;
    public track: number;
    public type: 'track';
    public uri: string;
    public local: boolean;

    constructor(
        public client: Lunify,
        data?: ApiTrack
    ) {
        // this.album = data.album;
        // this.artists = data.artists;
        this.markets = data.available_markets;
        this.disc = data.disc_number;
        this.duration = data.duration_ms;
        this.explicit = data.explicit;
        this.externalIds = data.external_ids;
        this.externalUrls = data.external_urls;
        this.url = data.href;
        this.id = data.id;
        this.playable = data.is_playable;
        this.linkedFrom = data.linked_from;
        this.restrictions = data.restrictions;
        this.name = data.name;
        this.popularity = data.popularity;
        this.previewUrl = data.preview_url;
        this.track = data.track_number;
        this.type = data.type;
        this.uri = data.uri;
        this.local = data.is_local;
    }

}