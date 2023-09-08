import { ApiCredentialsResponse } from '../interfaces/oauth';
import { Options } from '../interfaces/rest';
import { RequestDomain } from './Constants';
import { ClientCredentials } from './managers/credentials';
import { OauthManager } from './managers/oauth';
import { RestManager } from './managers/rest';
import { TracksManager } from './managers/tracks';
import { UsersManager } from './managers/users';

export class Lunify {
    public credentials?: ClientCredentials;
    public rest: RestManager;
    public oauth: OauthManager;
    public users: UsersManager;
    public tracks: TracksManager;

    /**
     * Whenever the clients token credetials are present or not
     */
    public ready: boolean;

    constructor(public options: Required<Options>) {
        this.rest = new RestManager(this);
        this.oauth = new OauthManager(this);
        this.users = new UsersManager(this);
        this.tracks = new TracksManager(this);

        this.ready = false;
    }

    /**
     * Fetches the spotify client access token
     */
    async fetchCredentials() {

        const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');
        params.append('client_id', this.options.clientId);
        params.append('client_secret', this.options.clientSecret);

        const res = await this.rest.post<ApiCredentialsResponse>('/token', {
            domain: RequestDomain.Accounts,
            authRequired: true,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        });
        res.created_timestamp = Date.now();
        this.ready = true;

        this.credentials = new ClientCredentials(this, res);
        console.log(this.credentials);
        return this.credentials;
    }

}

export * from './managers/oauth';
export * from './structures/player';
export * from './managers/rest';
export * from './structures/user';
export * from './Constants';