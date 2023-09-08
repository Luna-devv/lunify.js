import { ApiAlbum } from './album';
import { ApiArtist } from './artists';

export interface ApiTrack {
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
    linked_from: Record<string, string>;
    restrictions: 'market' | 'product' | 'explicit';
    name: string;
    popularity: number;
    preview_url: string | null;
    track_number: number;
    type: 'track';
    uri: string;
    is_local: boolean;
}