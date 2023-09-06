import { Options } from '../interfaces/rest';
import { OauthManager } from './oauth';
import { RestManager } from './rest';

export default class Lunify {
    public rest: RestManager;
    public oauth: OauthManager;

    constructor(public options: Required<Options>) {
        this.rest = new RestManager(this);
        this.oauth = new OauthManager(this);
    }

}