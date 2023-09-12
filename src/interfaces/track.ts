import { ApiPartialAlbum } from './album';
import { ApiArtist, ApiPartialArtist } from './artist';

export interface ApiPartialTrack {
    album: ApiPartialAlbum;
    artists: ApiPartialArtist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_urls: Record<string, string>;
    href: string;
    id: string;
    is_playable: boolean;
    linked_from: Record<string, string>;
    restrictions: {
        reason: 'market' | 'product' | 'explicit';
    };
    name: string;
    preview_url: string | null;
    track_number: number;
    type: 'track';
    uri: string;
    is_local: boolean;
}

export interface ApiTrack extends ApiPartialTrack {
    artists: ApiArtist[];
    external_ids: Record<string, string>;
    popularity: number;
}