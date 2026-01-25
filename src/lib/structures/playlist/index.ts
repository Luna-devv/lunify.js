import type { ApiImage } from "../../../interfaces";
import type { ApiPartialPlaylist, ApiPlaylistOwner } from "../../../interfaces/playlist";
import type { Lunify, UserOauth } from "../..";
import { PlaylistTracksManager } from "../../managers/playlists/Tracks";

export class PartialPlaylist {
    public tracks: PlaylistTracksManager;

    public collaborative: boolean;
    public description: string | null;
    public externalUrls: Record<string, string>;
    public url: string;
    public id: string;
    public images: ApiImage[];
    public name: string;
    public owner: ApiPlaylistOwner;
    public public: boolean;
    public uri: string;

    constructor(
        public client: Lunify,
        data: ApiPartialPlaylist,
        oauth: UserOauth
    ) {
        this.tracks = new PlaylistTracksManager(client, this, oauth);

        this.collaborative = data.collaborative;
        this.description = data.description;
        this.externalUrls = data.external_urls;
        this.url = data.href;
        this.id = data.id;
        this.images = data.images;
        this.name = data.name;
        this.owner = data.owner;
        this.public = data.public;
        this.uri = data.uri;
    }
}