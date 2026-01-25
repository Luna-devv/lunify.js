import type { ApiUserPlaylists } from "../../../interfaces/playlist";
import type { Lunify, PartialUser, User } from "../..";
import { PartialPlaylist } from "../../structures/playlist";
import { CacheManager } from "../cache";

export class UserPlaylistsManager {
    public cache: CacheManager<string, PartialPlaylist>;

    constructor(
        public client: Lunify,
        public user: PartialUser | User
    ) {
        this.cache = new CacheManager();
    }

    async fetch(page?: number) {

        const params = new URLSearchParams();
        params.append("limit", "50");
        params.append("offset", ((page || 0) * 50).toString() || "0");

        const res = await this.client.rest.get<ApiUserPlaylists>(`/me/playlists?${params.toString()}`, {
            headers: {
                Authorization: await this.user.oauth.getAuthorization()
            }
        });

        const playlists = res.items.map((playlist) =>
            new PartialPlaylist(this.client, playlist, this.user.oauth)
        );

        for (const playlist of playlists) this.cache.set(playlist.id, playlist);

        return playlists;
    }
}