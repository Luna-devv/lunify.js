import { Options } from '../interfaces/rest';
import { OauthManager } from './managers/oauth';
import { RestManager } from './managers/rest';

export class Lunify {
    public rest: RestManager;
    public oauth: OauthManager;
    public users: UsersManager;

    constructor(public options: Required<Options>) {
        this.rest = new RestManager(this);
        this.oauth = new OauthManager(this);
    }

}

export * from './managers/oauth';
export * from './structures/player';
export * from './managers/rest';
export * from './structures/user';
export * from './Constants';