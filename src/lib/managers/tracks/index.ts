import { Lunify } from '../..';
import { StructureFetchOptions } from '../../../interfaces/rest';
import { ApiTrack } from '../../../interfaces/track';
import { Track } from '../../structures/track';
import { CacheManager } from '../cache';

export class TracksManager {
    public cache: CacheManager<string, Track>;

    constructor(public client: Lunify) {
        this.cache = new CacheManager();
    }

    /**
     * Fetch a track with a track id
     * @param {string} trackId - spotify track id: https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT <-- last part after /track/
     * @param {StructureFetchOptions?} options
     * @example ```ts
     * // will try to get cached track to avoid requesting the spotify api
     * const track = await lunify.tracks.fetch("4cOdK2wGLETKBW3PvgPWqT");
     * ```
     */
    async fetch(trackId: string, options?: StructureFetchOptions) {
        let track: Track | undefined;

        if (!options?.force) {
            track = this.cache.get(trackId);
            if (track) return track;
        }

        const res = await this.client.rest.get<ApiTrack>('/tracks/' + trackId, {
            advancedAuthRequired: true
        });

        track = new Track(this.client, res);
        this.cache.set(track.id, track);

        return track;
    }

    /**
     * Fetch multiple tracks with a list track of id, the api will only be requested once no matter how many tracks are provided
     * @param {string[]} trackIds - list of spotify track ids: https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT <-- last part after /track/
     * @param {StructureFetchOptions?} options
     * @example ```ts
     * // will try to get cached tracks* to avoid requesting the spotify api,
     * // *only works if all tracks were cached already
     * const tracks = await lunify.tracks.list(["4cOdK2wGLETKBW3PvgPWqT", "1jcp5qEaDLT4gsIUjDPJo9"]);
     * ```
     */
    async list(trackIds: string[], options?: StructureFetchOptions) {
        let tracks: Track[] = [];

        if (!options?.force) {
            for await (const trackId of trackIds) tracks.push(this.cache.get(trackId));
            if (tracks.filter((track) => track).length === trackIds.length) return tracks;
        }

        tracks = [];
        const res = await this.client.rest.get<{ tracks: ApiTrack[] }>('/tracks', {
            query: {
                ids: trackIds.join(',')
            },
            advancedAuthRequired: true
        });

        for await (const r of res?.tracks || []) {
            const track = new Track(this.client, r);
            this.cache.set(track.id, track);
            tracks.push(track);
        }

        return tracks;
    }

}