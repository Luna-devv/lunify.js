import { Options } from '../interfaces/rest';
import { OauthManager } from './oauth';
import { RestManager } from './rest';

export class Lunify {
    public rest: RestManager;
    public oauth: OauthManager;

    constructor(public options: Required<Options>) {
        this.rest = new RestManager(this);
        this.oauth = new OauthManager(this);
    }

}

export * from './oauth';
export * from './player';
export * from './rest';
export * from './user';
export * from './Constants';