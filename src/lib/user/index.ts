import { Lunify } from '..';
import { OauthTokenManager } from '../oauth/TokenManager';
import { PlayerManager } from '../player';

export class UserManager {
    public player: PlayerManager;

    constructor(
        public client: Lunify,
        public oauth: OauthTokenManager,
    ) {
        this.player = new PlayerManager(client, this);
    }

}