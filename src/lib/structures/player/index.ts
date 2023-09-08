import { Lunify } from '../..';
import { PartialUser, User } from '../user';
import { PlayerDeviceManager } from './DeviceManager';

export * from './Device';
export * from './DeviceManager';

export class Player {
    public devices: PlayerDeviceManager;

    constructor(
        public client: Lunify,
        public user: User | PartialUser,
    ) {
        this.devices = new PlayerDeviceManager(this.client, this);
    }

    /**
     * Start playing a track on users current device
     * @param {string | string[]} track - A spotify track id or a list of spotify track ids
     * @example ```ts
     * player.start('6IRdLKIyS4p7XNiP8r6rsx');
     * ```
     */
    async play(trackId: string | string[]) {

        const finalTracks: string[] = [];

        if (typeof trackId !== 'string') {
            for (const t of trackId) finalTracks.push('spotify:track:' + t);
        }
        else {
            finalTracks.push('spotify:track:' + trackId);
        }

        await this.client.rest.put('/me/player/play', {
            headers: {
                Authorization: await this.user.oauth.getAuthorization()
            },
            body: {
                uris: finalTracks
            }
        });

        return true;
    }

    /**
     * Resume playback on users current device with paused track
     * @example ```ts
     * player.resume();
     * ```
     * Use `.play(...)` to start playing a new track
     */
    async resume() {

        await this.client.rest.put('/me/player/play', {
            headers: {
                Authorization: await this.user.oauth.getAuthorization()
            }
        });

        return true;
    }

    /**
     * Stop playback on users current device
     * @example ```ts
     * player.stop();
     * ```
     */
    async stop() {

        await this.client.rest.put('/me/player/pause', {
            headers: {
                Authorization: await this.user.oauth.getAuthorization()
            }
        });

        return true;
    }

    /**
     * Skip the current track and start playing the next one
     * @example ```ts
     * player.skip();
     * ```
     */
    async skip() {

        await this.client.rest.post('/me/player/next', {
            headers: {
                Authorization: await this.user.oauth.getAuthorization()
            }
        });

        return true;
    }

    /**
     * Start playing the track before the current one (starts playing previous track)
     * @example ```ts
     * player.rewind();
     * ```
     */
    async rewind() {

        await this.client.rest.post('/me/player/previous', {
            headers: {
                Authorization: await this.user.oauth.getAuthorization()
            }
        });

        return true;
    }

    /**
     * Seek to any position in the current playback
     * @param {number} position - position in milliseconds (seconds x1000)
     * @example ```ts
     * player.seek(16 * 1000); // 16 seconds
     * ```
     */
    async seekTo(position: number) {

        await this.client.rest.put('/me/player/seek', {
            headers: {
                Authorization: await this.user.oauth.getAuthorization()
            },
            query: {
                position_ms: position
            }
        });

        return true;
    }

    /**
     * Set the repeat mode for the current playback
     * @param {'track' | 'context' | false} mode - track, context, false
     * - track: repeat the current track
     * - context: repeat the current context
     * - false: turn repeat off
     * @example ```ts
     * player.repeat('track');
     * player.repeat('context');
     * player.repeat(false);
     * ```
     */
    async repeat(mode: 'track' | 'context' | false) {

        await this.client.rest.put('/me/player/repeat', {
            headers: {
                Authorization: await this.user.oauth.getAuthorization()
            },
            query: {
                state: mode || 'off'
            }
        });

        return true;
    }

    /**
     * Set the volume for the current playback device
     * @param {number} percentage - volume in percent %
     * @example ```ts
     * player.volumeTo(69); // 69%
     * ```
     */
    async volumeTo(percentage: number) {

        await this.client.rest.put('/me/player/volume', {
            headers: {
                Authorization: await this.user.oauth.getAuthorization()
            },
            query: {
                volume_percent: percentage
            }
        });

        return true;
    }

    /**
     * Toggle shuffle on or off for playback
     * @param {number} state - volume in percent %
     * @example ```ts
     * player.shuffle(true);
     * ```
     */
    async shuffle(state: boolean) {

        await this.client.rest.put('/me/player/shuffle', {
            headers: {
                Authorization: await this.user.oauth.getAuthorization()
            },
            query: {
                state
            }
        });

        return true;
    }

}