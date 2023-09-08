import { ApiImage } from './user';

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