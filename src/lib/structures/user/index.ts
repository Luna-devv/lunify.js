import { Lunify } from '../..';
import { ApiImage, ApiUser } from '../../../interfaces/user';
import { UserOauth } from './Oauth';
import { Player } from '../player';

export * from './Oauth';

export class User {
    public player: Player;

    constructor(
        public client: Lunify,
        public oauth: UserOauth,
    ) {
        this.player = new Player(client, this);

    }

}