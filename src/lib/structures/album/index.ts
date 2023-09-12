import { Lunify, PartialTrack } from '../..';
import { ApiAlbum, ApiPartialAlbum } from '../../../interfaces/album';
import { ApiImage } from '../../../interfaces/user';
// import { ApiArtist } from '../../../interfaces/artists';

export class PartialAlbum {
    public totalTracks: number;
    public markets: string[];
    public externalUrls: Record<string, string>;
    public url: string;
    public id: string;
    public images: ApiImage[];
    public name: string;
    public release: Date;
    public releasePrecision: ApiPartialAlbum['release_date_precision'];
    public restrictions: ApiPartialAlbum['restrictions']['reason'];
    public type: ApiPartialAlbum['album_type'];
    public uri: string;

    constructor(
        public client: Lunify,
        data?: ApiPartialAlbum
    ) {
        this.totalTracks = data.total_tracks;
        this.markets = data.available_markets;
        this.externalUrls = data.external_urls;
        this.url = data.href;
        this.id = data.id;
        this.images = data.images;
        this.name = data.name;
        this.release = new Date(data.release_date);
        this.restrictions = data.restrictions?.reason;
        this.type = data.album_type;
        this.uri = data.uri;
    }

}

export class Album extends PartialAlbum {
    public tracks: Omit<Omit<ApiAlbum['tracks'], 'href'>, 'items'> & { url: string; items: PartialTrack[] };
    public copyrights: ApiAlbum['copyrights'];
    public externalIds: Record<string, string>;
    public genres: string[];
    public label: string;
    public popularity: number;

    constructor(
        public client: Lunify,
        data?: ApiAlbum
    ) {
        super(client, data);

        this.tracks = {
            ...data.tracks,
            url: data.tracks.href,
            items: (() => {
                const items: PartialTrack[] = [];
                for (const item of data.tracks.items) items.push(new PartialTrack(client, item));
                return items;
            })()
        };

        this.copyrights = data.copyrights;
        this.externalIds = data.external_ids;
        this.genres = data.genres;
        this.label = data.label;
        this.popularity = data.popularity;
    }

}