import { Lunify, RequestDomain } from '../..';
import { ApiCredentialsResponse } from '../../../interfaces/oauth';

export class CredentialsManager {
    public accessToken?: string;
    public tokenType?: string;
    public scope?: string;
    public expiresIn?: number;
    public expiresTimestamp?: number;
    public createdTimestamp?: number;

    constructor(
        public client: Lunify
    ) {}

    /**
     * Fetches client credentials from the spotify api
     */
    async fetch() {
        const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');
        params.append('client_id', this.client.options.clientId);
        params.append('client_secret', this.client.options.clientSecret);

        const res = await this.client.rest.post<ApiCredentialsResponse>('/token', {
            domain: RequestDomain.Accounts,
            authRequired: true,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        });

        res.created_timestamp = Date.now();

        this.accessToken = res.access_token;
        this.tokenType = res.token_type;
        this.expiresIn = res.expires_in * 1000;
        this.expiresTimestamp = res.created_timestamp + res.expires_in * 1000;
        this.createdTimestamp = res.created_timestamp;

        return this;
    }

    /**
     * Generates a authorization token header
     */
    async getAuthorization() {

        if (
            !this.accessToken ||
            this.expiresTimestamp < Date.now()
        ) {
            this.accessToken = (await this.fetch()).accessToken;
        }

        return this.tokenType + ' ' + this.accessToken;
    }

}