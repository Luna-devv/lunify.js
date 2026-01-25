import type { ApiEpisode } from "./episode";
import type { ApiTrack } from "./track";

import type { ApiImage } from ".";

export interface ApiUserPlaylists {
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
    items: ApiPartialPlaylist[];
}

export interface ApiPlaylistOwner {
    external_urls: Record<string, string>;
    followers: {
        href: string;
        total: number;
    };
    href: string;
    id: string;
    type: "user";
    uri: string;
    display_name: string | null;
}

export interface ApiPartialPlaylist {
    collaborative: boolean;
    description: string | null;
    external_urls: Record<string, string>;
    href: string;
    id: string;
    images: ApiImage[];
    name: string;
    owner: ApiPlaylistOwner;
    public: boolean;
    snapshot_id: string;
    tracks: {
        href: string;
        total: number;
    } | null;
    type: string;
    uri: string;
}

// no ApiPlaylist for now since only ApiPartialPlaylist is used to get users' playlists.
// export interface ApiPlaylist extends ApiPartialPlaylist {}

export interface ApiPlaylistTrack<T extends ApiTrack | ApiEpisode> {
    // Will only be `null` in very old playlists.
    added_at: string | null;
    // Will only be `null` in very old playlists.
    added_by: Omit<ApiPlaylistOwner, "display_name"> | null;
    is_local: boolean;
    track: T;
}