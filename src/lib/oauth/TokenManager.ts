import Lunify from '..';
import { ApiRefreshTokenResponse, ApiTokenResponse } from '../../interfaces/oauth';

export class OauthTokenManager {
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
     * @returns Whenever the refresh was successfull or not
     */
    async refresh() {
        if (!this.refreshToken) return false;

        const data = await this.client.oauth.refreshToken(this.refreshToken);
        this.accessToken = data.accessToken;

        return true;
    }

    /**
     * Generates a authorization token header
     */
    getAuthorization() {
        return this.tokenType + ' ' + this.accessToken;
    }

}