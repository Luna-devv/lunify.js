import { ApiArtist } from './artist';
import { ApiPartialTrack } from './track';
import { ApiImage } from './user';

export interface ApiPartialAlbum {
    album_type: 'album' | 'single' | 'compilation';
    total_tracks: number;
    available_markets: string[];
    external_urls: Record<string, string>;
    href: string;
    id: string;
    images: ApiImage[];
    name: string;
    release_date: string;
    release_date_precision: 'year' | 'month' | 'day';
    restrictions: {
        reason: 'market' | 'product' | 'explicit';
    };
    type: string;
    uri: string;
    artists: ApiArtist[];
}

export interface ApiAlbum extends ApiPartialAlbum {
    tracks: {
        href: string;
        limit: number;
        next: string | null;
        offset: number;
        previous: string | null;
        total: number;
        items: (Omit<ApiPartialTrack, 'album'>)[];
    }
    copyrights: {
        text: string;
        type: 'C' | 'P'
    }[]
    external_ids: Record<string, string>;
    genres: string[];
    label: string;
    popularity: number;
}