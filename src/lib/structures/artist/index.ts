import { Lunify } from '../..';
import { ApiArtist, ApiPartialArtist } from '../../../interfaces/artist';

export class PartialArtist {
    public externalUrls: Record<string, string>;
    public url: string;
    public id: string;
    public name: string;
    public type: ApiPartialArtist['type'];
    public uri: string;

    constructor(
        public client: Lunify,
        data?: ApiPartialArtist
    ) {
        this.externalUrls = data.external_urls;
        this.url = data.href;
        this.id = data.id;
        this.name = data.name;
        this.type = data.type;
        this.uri = data.uri;
    }

}

export class Artist extends PartialArtist {
    public followers: {
        url: string;
        total: number;
    };
    public genres: string[];
    public images: ApiArtist['images'];
    public popularity: number;

    constructor(
        public client: Lunify,
        data?: ApiArtist
    ) {
        super(client, data);

        this.followers = { url: data.followers?.href, total: data.followers?.total };
        this.genres = data.genres;
        this.images = data.images;
        this.popularity = data.popularity;
    }

}