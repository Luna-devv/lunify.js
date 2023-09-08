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
    }

    /**
     * Refresh the spotify access token
     */
    async refresh() {
        if (!this.refreshToken) return undefined;

        const data = await this.client.oauth.refreshToken(this.refreshToken);
        this.accessToken = data.accessToken;

        return data.accessToken;
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