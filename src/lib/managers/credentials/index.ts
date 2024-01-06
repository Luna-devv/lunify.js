import { Lunify } from '../..';
import { ApiCredentialsResponse } from '../../../interfaces/oauth';

export class ClientCredentials {
    public accessToken: string;
    public tokenType: string;
    public scope: string;
    public expiresIn: number;
    public expiresTimestamp: number;
    public createdTimestamp: number;

    constructor(
        public client: Lunify,
        data: ApiCredentialsResponse
    ) {
        this.accessToken = data.access_token;
        this.tokenType = data.token_type;
        this.expiresIn = data.expires_in * 1000;
        this.expiresTimestamp = data.created_timestamp + data.expires_in * 1000;
        this.createdTimestamp = data.created_timestamp;
    }

    /**
     * Generates a authorization token header
     */
    async getAuthorization() {
        if (this.expiresTimestamp < Date.now()) {
            this.accessToken = (await this.client.fetchCredentials()).accessToken;
        }

        return this.tokenType + ' ' + this.accessToken;
    }

}