import { Options, RequestDomain } from '../../../interfaces/rest';
import { EventEmitter } from 'stream';
import { ApiTokenResponse } from '../../../interfaces/oauth';
import { Lunify, Scopes } from '../..';
import { UserOauth } from '../../structures/user';

export class OauthManager extends EventEmitter {
    private options: Options['oAuth'];

    constructor(public client: Lunify) {
        super();
        this.options = client.options.oAuth;
    }

    /**
     * Create a oAuth url for users to authorize
     * @param {Scopes[]} scopes - A list of spotify scopes {@link https://developer.spotify.com/documentation/web-api/concepts/scopes}
     */
    generateUrl(scopes: Scopes[]) {

        const params = new URLSearchParams();
        params.append('response_type', 'code');
        params.append('client_id', this.options.clientId);
        params.append('redirect_uri', this.options.redirectUri);
        params.append('scope', scopes.join(' '));
        params.append('state', crypto.randomUUID());

        return 'https://accounts.spotify.com/authorize?' + params.toString();
    }

    /**
     * Get a spotify access token from a oAuth code
     * @param {string} code - oAuth code
     */
    async fetchToken(code: string) {

        const params = new URLSearchParams();
        params.append('grant_type', 'authorization_code');
        params.append('redirect_uri', this.options.redirectUri);
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
     * @param {string} refreshToken - oAuth refresh token
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
        res.created_timestamp = Date.now();

        return new UserOauth(this.client, res);
    }

}