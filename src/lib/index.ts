import { Options } from '../interfaces/rest';
import { CredentialsManager } from './managers/credentials';
import { OauthManager } from './managers/oauth';
import { RestManager } from './managers/rest';
import { TracksManager } from './managers/tracks';
import { UsersManager } from './managers/users';

export class Lunify {
    public credentials: CredentialsManager;
    public rest: RestManager;
    public oauth: OauthManager;
    public users: UsersManager;
    public tracks: TracksManager;

    constructor(public options: Options) {
        this.credentials = new CredentialsManager(this);
        this.rest = new RestManager(this);
        this.oauth = new OauthManager(this);
        this.users = new UsersManager(this);
        this.tracks = new TracksManager(this);
    }
}

export * from './managers';
export * from './structures';
export * from './Constants';
export * as utils from './utils';