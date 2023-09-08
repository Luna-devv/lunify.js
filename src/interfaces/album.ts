import { ApiArtist } from './artists';
import { ApiImage } from './user';

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