export interface ApiUser {
    country?: string;
    display_name: string | null;
    email?: string;
    explicit_content?: {
        filter_enabled: boolean;
        filter_locked: boolean;
    };
    external_urls: Record<string, string>;
    followers: {
        href: string;
        total: number;
    };
    href: string;
    id: string;
    images: ApiImage[];
    product?: 'premium' | 'free' | 'open';
}

export interface ApiImage {
    url: string;
    height: number;
    width: number;
}