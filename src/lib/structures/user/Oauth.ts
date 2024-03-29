import { Lunify, LunifyErrors, Scopes } from '../..';
import { ApiRefreshTokenResponse, ApiTokenResponse } from '../../../interfaces/oauth';

export class UserOauth {
    public accessToken: string;
    public refreshToken: string | null;
    public tokenType: string;
    public scope: Scopes[];
    public expiresIn: number;
    public expiresTimestamp: number;
    public createdTimestamp: number;
    public revoked: boolean;

    constructor(
        public client: Lunify,
        data: ApiTokenResponse | ApiRefreshTokenResponse
    ) {
        this.refreshToken = null;
        if ('refresh_token' in data) this.refreshToken = data.refresh_token;

        this.accessToken = data.access_token;
        this.tokenType = data.token_type;
        this.scope = this.convertScopesToStringArray(data.scope);
        this.expiresIn = data.expires_in * 1000;
        this.expiresTimestamp = data.created_timestamp + data.expires_in * 1000;
        this.createdTimestamp = data.created_timestamp;
        this.revoked = false;
    }

    private convertScopesToStringArray(scopesString: string): Scopes[] {
        const scopesArray: string[] = scopesString.split(' ');
        const enumValues = Object.values(Scopes);

        return scopesArray
            .filter((scope) => enumValues.includes(scope as Scopes)) as Scopes[];
    }

    /**
     * Refresh a spotify access token
     * @param {string} refreshToken - oauth refresh token
     * @example ```ts
     * await access.refresh();
     * ```
     * Or if you want to use a specific refresh token, like from a database
     * @example ```ts
     * const refreshToken = ...; // from the database for example
     * await access.refresh(refreshToken);
     * ```
     */
    async refresh(refreshToken?: string) {
        if (refreshToken) this.refreshToken = refreshToken;

        if (this.revoked) throw Error(LunifyErrors.TokenRevoked);
        if (!this.refreshToken) throw Error(LunifyErrors.NoRefreshToken);

        const res = await this.client.oauth.refreshToken(this.refreshToken);

        if (!res) {
            this.revoked = true;
            throw Error(LunifyErrors.TokenRevoked);
        }

        this.accessToken = res.accessToken;
        return res.accessToken;
    }

    /**
     * Generates a authorization token header
     */
    async getAuthorization() {
        if (this.expiresTimestamp < Date.now()) {
            await this.refresh();
        }

        return this.tokenType + ' ' + this.accessToken;
    }

    /**
     * Check if the access token is still valid (expires after 1 hour of creating, usually)
     */
    isValid() {
        if (this.expiresTimestamp < Date.now()) return false;
        return true;
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