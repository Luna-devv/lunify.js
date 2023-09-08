export interface ApiRefreshTokenResponse {
    access_token: string;
    token_type: string;
    scope: string;
    expires_in: number;
    created_timestamp: number;
}

export interface ApiTokenResponse extends ApiRefreshTokenResponse {
    refresh_token: string;
}

export interface ApiCredentialsResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    created_timestamp: number;
}