import type { ApiEpisode } from "../../../interfaces/episode";
import type { ApiPlaylistTrack } from "../../../interfaces/playlist";
import type { ApiTrack } from "../../../interfaces/track";
import type { Lunify, PartialPlaylist, UserOauth } from "../..";
import { PlaylistTrack } from "../..";
import { CacheManager } from "../cache";

const FETCH_TRACK_CHUNK_SIZE = 100;

export class PlaylistTracksManager {
    public cache: CacheManager<string, PlaylistTrack | ApiEpisode>;

    constructor(
        public client: Lunify,
        public playlist: PartialPlaylist, // | Playlist
        private oauth: UserOauth
    ) {
        this.cache = new CacheManager();
    }

    async fetchSinglePage(page: number) {

        const params = new URLSearchParams();
        params.append("limit", FETCH_TRACK_CHUNK_SIZE.toString());
        params.append("offset", (page * FETCH_TRACK_CHUNK_SIZE).toString() || "0");

        const res = await this.client.rest.get<{ items: ApiPlaylistTrack<ApiTrack | ApiEpisode>[]; }>("/playlists/" + this.playlist.id + "/tracks?" + params.toString(), {
            headers: {
                Authorization: await this.oauth.getAuthorization()
            }
        });

        const tracks = res.items.map((track) =>
            track.track.type === "episode"
                ? track.track
                : new PlaylistTrack(this.client, track as ApiPlaylistTrack<ApiTrack>)
        );

        for (const track of tracks) this.cache.set(track.id, track);

        return tracks;
    }

    private async fetchMany(page: number): Promise<(PlaylistTrack | ApiEpisode)[]> {
        const res = await this.fetchSinglePage(page);

        if (res.length >= FETCH_TRACK_CHUNK_SIZE) {
            return [
                ...res,
                ...(await this.fetchMany(page + 1))
            ];
        }

        return res;
    }

    fetch() {
        return this.fetchMany(0);
    }
}