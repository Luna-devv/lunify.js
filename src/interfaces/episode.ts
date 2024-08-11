import { ApiImage } from '.';

export interface ApiEpisode {
    audio_preview_url: string | null;
    description: string;
    html_description: string;
    duration_ms: number;
    explicit: boolean;
    external_urls: Record<string, string>;
    href: string;
    id: string;
    images: ApiImage[];
    is_externally_hosted: boolean;
    is_playable: boolean;
    /**
     * @deprecated {@link https://developer.spotify.com/documentation/web-api/reference/get-information-about-the-users-current-playback}
     */
    language?: string;
    languages: string[];
    name: string;
    release_date: string;
    release_date_precision: 'year' | 'month' | 'day';
    resume_point: {
        fully_played: boolean;
        resume_position_ms: number;
    };
    type: 'episode';
    uri: string;
    restrictions: {
        reason: 'market' | 'product' | 'explicit'
    };
    show: {
        available_markets: string[];
        copyrights: {
            text: string;
            type: 'C' | 'P'
        }
        description: string;
        html_description: string;
        explicit: boolean;
        external_urls: Record<string, string>;
        href: string;
        id: string;
        images: ApiImage[];
        is_externally_hosted: boolean | null;
        languages: string[];
        media_type: string;
        name: string;
        publisher: string;
        type: 'show';
        uri: string;
        total_episodes: number;
    };
}