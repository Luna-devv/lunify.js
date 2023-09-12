import { Lunify } from '../..';
import { ApiPartialTrack, ApiTrack } from '../../../interfaces/track';
import { PartialAlbum } from '../album';
import { Artist, PartialArtist } from '../artist';

export class PartialTrack {
    public album: PartialAlbum;
    public artists: PartialArtist[];
    public markets: string[];
    public disc: number;
    public duration: number;
    public explicit: boolean;
    public externalUrls: Record<string, string>;
    public url: string;
    public id: string;
    public playable: boolean;
    public linkedFrom: Record<string, string>;
    public restrictions: 'market' | 'product' | 'explicit';
    public name: string;
    public previewUrl: string | null;
    public track: number;
    public type: 'track';
    public uri: string;
    public local: boolean;

    constructor(
        public client: Lunify,
        data?: Omit<ApiPartialTrack, 'album'> & { album?: ApiPartialTrack['album'] }
    ) {
        if (data.album) this.album = new PartialAlbum(client, data.album);

        this.artists = [];
        for (const artist of data.artists) this.artists.push(new PartialArtist(client, artist));

        this.markets = data.available_markets;
        this.disc = data.disc_number;
        this.duration = data.duration_ms;
        this.explicit = data.explicit;
        this.externalUrls = data.external_urls;
        this.url = data.href;
        this.id = data.id;
        this.playable = data.is_playable;
        this.linkedFrom = data.linked_from;
        this.restrictions = data.restrictions?.reason;
        this.name = data.name;
        this.previewUrl = data.preview_url;
        this.track = data.track_number;
        this.type = data.type;
        this.uri = data.uri;
        this.local = data.is_local;
    }

}

export class Track extends PartialTrack {
    public artists: Artist[];
    public externalIds: Record<string, string>;
    public popularity: number;

    constructor(
        public client: Lunify,
        data?: ApiTrack
    ) {
        super(client, data);

        this.artists = [];
        for (const artist of data.artists) this.artists.push(new Artist(client, artist));

        this.externalIds = data.external_ids;
        this.popularity = data.popularity;
    }

}