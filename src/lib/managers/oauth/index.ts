import { EventEmitter } from 'stream';
import { ApiTokenResponse } from '../../../interfaces/oauth';
import { Lunify, LunifyErrors, RequestDomain, Scopes } from '../..';
import { UserOauth } from '../../structures/user';

export class OauthManager extends EventEmitter {

    constructor(public client: Lunify) {
        super();
    }

    /**
     * Create a oAuth url for users to authorize
     * @param {Scopes[]} scopes - A list of spotify scopes {@link https://developer.spotify.com/documentation/web-api/concepts/scopes}
     */
    generateUrl(scopes: Scopes[]) {
        if (!this.client.options.oauth.redirectUri) throw Error(LunifyErrors.NoRedirectUri);

        const params = new URLSearchParams();
        params.append('response_type', 'code');
        params.append('client_id', this.client.options.clientId);
        params.append('redirect_uri', this.client.options.oauth.redirectUri);
        params.append('scope', scopes.join(' '));
        params.append('state', crypto.randomUUID());

        return 'https://accounts.spotify.com/authorize?' + params.toString();
    }

    /**
     * Get a spotify access token from a oAuth code
     * @param {string} code - oauth response query code
     * @example ```ts
     * const code = req.query.code;
     * const access = await api.oauth.fetchToken(code);
     * ```
     */
    async fetchToken(code: string) {
        if (!this.client.options.oauth.redirectUri) throw Error(LunifyErrors.NoRedirectUri);

        const params = new URLSearchParams();
        params.append('grant_type', 'authorization_code');
        params.append('redirect_uri', this.client.options.oauth.redirectUri);
        params.append('code', code);

        const res = await this.client.rest.post<ApiTokenResponse>('/token', {
            domain: RequestDomain.Accounts,
            authRequired: true,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        });

        res.created_timestamp = Date.now();
        return new UserOauth(this.client, res);
    }

    /**
     * Refresh a spotify access token
     * @param {string} refreshToken - oauth refresh token
     * @example ```ts
     * const refreshToken = ...;
     * await api.oauth.refreshToken(refreshToken);
     * ```
     */
    async refreshToken(refreshToken: string) {

        const params = new URLSearchParams();
        params.append('grant_type', 'refresh_token');
        params.append('refresh_token', refreshToken);

        const res = await this.client.rest.post<ApiTokenResponse>('/token', {
            domain: RequestDomain.Accounts,
            authRequired: true,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        });

        if ('message' in res) {
            throw Error(res.message as string);
        }

        // Sometimes, <UserOauth>.refreshToken is null for some reason.
        // Spotify claims they return a new refresh token, but I don't trust them.
        // I am just testing things and see what sticks, will be removed if this doesn't fix it.
        // It only happens sometimes, it seems to only appear after a few days without restarting the node process.
        // Contact me: luna@waya.one - https://discord.gg/yYd6YKHQZH
        // https://developer.spotify.com/documentation/web-api/tutorials/refreshing-tokens
        res.refresh_token ||= refreshToken;

        res.created_timestamp = Date.now();
        return new UserOauth(this.client, res);
    }

}