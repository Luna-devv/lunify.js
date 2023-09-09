import { Lunify } from '../..';
import { ApiRefreshTokenResponse, ApiTokenResponse } from '../../../interfaces/oauth';

export class UserOauth {
    public accessToken: string;
    public refreshToken: string;
    public tokenType: string;
    public scope: string;
    public expiresIn: number;
    public expiresTimestamp: number;
    public createdTimestamp: number;
    public revoked: boolean;

    constructor(
        public client: Lunify,
        data: ApiTokenResponse | ApiRefreshTokenResponse
    ) {
        if ('refresh_token' in data) this.refreshToken = data.refresh_token;
        this.accessToken = data.access_token;
        this.tokenType = data.token_type;
        this.scope = data.scope;
        this.expiresIn = data.expires_in * 1000;
        this.expiresTimestamp = data.created_timestamp + data.expires_in * 1000;
        this.createdTimestamp = data.created_timestamp;
        this.revoked = false;
    }

    /**
     * Refresh the spotify access token
     */
    async refresh() {
        if (this.revoked) throw Error('Refresh token revoked');
        if (!this.refreshToken) return undefined;

        const res = await this.client.oauth.refreshToken(this.refreshToken)
            .catch((e) => e);

        if ('message' in res && res.message.includes('revoked')) {
            this.revoked = true;
            throw Error(res);
        }

        this.accessToken = res.accessToken;

        return res.accessToken;
    }

    /**
     * Generates a authorization token header
     */
    async getAuthorization() {
        if (this.expiresTimestamp < Date.now()) await this.refresh();
        return this.tokenType + ' ' + this.accessToken;
    }

    /**
     * Fetch the user accociated with this access token
     * @example ```ts
     * const user = await access.fetchUser();
     * ```
     */
    async fetchUser() {
        return await this.client.users.fetch(this);
    }

}