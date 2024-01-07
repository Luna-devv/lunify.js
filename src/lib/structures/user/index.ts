import { Lunify } from '../..';
import { ApiImage, ApiUser } from '../../../interfaces/user';
import { UserOauth } from './Oauth';
import { Player } from '../player';

export * from './Oauth';

export class PartialUser {
    /**
     * Control user playback
     */
    public player: Player;

    constructor(
        public client: Lunify,
        public oauth: UserOauth,
    ) {
        this.player = new Player(client, this);
    }

}

export class User extends PartialUser {

    public country?: string;
    public displayName: string | null;
    public email?: string;
    public explicitContent?: {
        enabled: boolean;
        locked: boolean;
    };
    public externalUrls: Record<string, string>;
    public followers: {
        url: string;
        total: number;
    };
    public url: string;
    public id: string;
    public images: ApiImage[];
    public product?: 'premium' | 'free' | 'open';

    constructor(
        public client: Lunify,
        public oauth: UserOauth,
        data: ApiUser
    ) {
        super(client, oauth);

        this.country = data.country;
        this.displayName = data.display_name;
        this.email = data.email;
        this.explicitContent = { enabled: data.explicit_content?.filter_enabled || null, locked: data.explicit_content?.filter_locked || null };
        this.externalUrls = data.external_urls;
        this.followers = { url: data.followers?.href, total: data.followers?.total };
        this.url = data.href;
        this.id = data.id;
        this.images = data.images;
        this.product = data.product;
    }

}