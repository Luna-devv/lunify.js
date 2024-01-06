export enum Scopes {
    UgcImageUpload = 'ugc-image-upload',
    UserReadPlaybackState = 'user-read-playback-state',
    UserModifyPlaybackState = 'user-modify-playback-state',
    UserReadCurrentlyPlaying = 'user-read-currently-playing',
    AppRemoteControl = 'app-remote-control',
    Streaming = 'streaming',
    PlaylistReadPrivate = 'playlist-read-private',
    PlaylistReadCollaborative = 'playlist-read-collaborative',
    PlaylistModifyPrivate = 'playlist-modify-private',
    PlaylistModifyPublic = 'playlist-modify-public',
    UserFollowModify = 'user-follow-modify',
    UserFollowRead = 'user-follow-read',
    UserReadPlaybackPosition = 'user-read-playback-position',
    UserTopRead = 'user-top-read',
    UserReadRecentlyPlayed = 'user-read-recently-played',
    UserLibraryModify = 'user-library-modify',
    UserLibraryRead = 'user-library-read',
    UserReadEmail = 'user-read-email',
    UserReadPrivate = 'user-read-private',
    UserSoaLink = 'user-soa-link',
    UserSoaUnlink = 'user-soa-unlink',
    UserManageEntitlements = 'user-manage-entitlements',
    UserManagePartner = 'user-manage-partner',
    UserCreatePartner = 'user-create-partner',
}

export enum RequestDomain {
    Accounts = 'https://accounts.spotify.com/api',
    Api = 'https://api.spotify.com/v1'
}

export enum LunifyErrors {
    TokenRevoked = 'User refresh token was revoked',
    NoRefreshToken = 'No refresh token was provided to refresh users access token',
    NoRedirectUri = 'No redirect uri was provided to manage oauth2 authorization, https://github.com/Luna-devv/lunify.js#initiate-lunifyjs',
    ClientNotReady = 'Request "![[PATH]]" failed: client was not ready, https://github.com/Luna-devv/lunify.js#example'
}

export const userAgent = 'Lunify.js (https://github.com/Luna-devv/lunify.js)' as const;