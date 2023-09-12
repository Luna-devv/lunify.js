import { ApiImage } from './user';

export interface ApiPartialArtist {
    external_urls: Record<string, string>;
    href: string;
    id: string;
    name: string;
    type: 'artist';
    uri: string;
}

export interface ApiArtist extends ApiPartialArtist {
    followers: {
        href: string;
        total: number;
    };
    genres: string[];
    images: ApiImage[];
    popularity: number;
}