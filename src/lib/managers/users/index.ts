import { Lunify, UserOauth, User } from '../..';
import { ApiUser } from '../../../interfaces/user';
import { CacheManager } from '../cache';

export class UsersManager {
    public cache: CacheManager<string, User>;

    constructor(public client: Lunify) {
        this.cache = new CacheManager();
    }

    /**
     * Fetch a user accociated with its access token
     * @example ```ts
     * // will try to get cached user to avoid requesting the spotify api
     * const access = await lunify.oauth.fetchToken(code);
     * const user = await lunify.users.fetch(access);
     * ```
     * @example ```ts
     * // will fetch from the spotify api regardless if it's cached or not
     * const access = await lunify.oauth.fetchToken(code);
     * const user = await lunify.users.fetch(access, { force: true });
     * ```
     */
    async fetch(access: UserOauth, options?: { force: boolean; }) {
        let user: User | undefined;

        if (!options?.force) {
            // not sure if there is a better way
            user = this.cache.find((u) => u.oauth.refreshToken === access.refreshToken);
            if (user) return user;
        }

        const res = await this.client.rest.get<ApiUser>('/me', {
            headers: {
                Authorization: await access.getAuthorization()
            }
        });

        user = new User(this.client, access, res);
        this.cache.set(user.id, user);

        return user;
    }

}