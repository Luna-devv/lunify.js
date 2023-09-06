import { Readable } from 'node:stream';

export interface Options {
    oAuth: {
        clientId: string;
        clientSecret: string;
        redirectUri: string;
    },
}

export enum RequestDomain {
    Accounts = 'https://accounts.spotify.com/api',
    Api = 'https://api.spotify.com/v1'
}

export interface RequestData {
    /**
     * The domain used for making requests
     * @default https://api.spotify.com/v1
     */
    domain?: RequestDomain

    /**
     * If this requests requires client authentication (not oAuth)
     * @default false
     */
    authRequired?: boolean;

    /**
     * The body of the request.
     * If providing as BodyInit, set `passThroughBody: true` in the request options.
     */
    body?: BodyInit | Record<string, unknown>;

    /**
     * Additional headers to be sent with this request.
     */
    headers?: Record<string, string>;

    /**
     * Query string parameters to be appended to the endpoint URL.
     */
    query?: Record<string, string | number | boolean>;
}

export type RouteLike = string;

export enum RequestMethod {
    Get = 'GET',
    Post = 'POST',
    Put = 'PUT',
    Patch = 'PATCH',
    Delete = 'DELETE'
}

export interface InternalRequest extends RequestData {
    route: RouteLike;
    method: RequestMethod;
}

export interface ResponseLike
    extends Pick<
        Response,
        'arrayBuffer' | 'bodyUsed' | 'headers' | 'json' | 'ok' | 'status' | 'text'
    > {
    body: Readable | ReadableStream | null;
}