import { Lunify, LunifyErrors, RequestDomain, userAgent } from '../..';
import { InternalRequest, RequestData, RequestMethod, ResponseLike, RouteLike } from '../../../interfaces/rest';

export class RestManager {

    constructor(public client: Lunify) { }

    private resolveUrl(domain: RequestDomain, route: RouteLike, query?: string): string {
        return `${domain || RequestDomain.Api}${route}${query ? `?${query}` : ''}`;
    }

    private async resolveRequest(request: InternalRequest): Promise<{ url: string; fetchOptions: RequestInit; }> {
        let query = '';

        if (request.query) {
            const resolvedQuery = new URLSearchParams(Object.fromEntries(Object.entries(request.query).map(([key, value]) => [key, value.toString()]))).toString();
            if (resolvedQuery !== '') query = resolvedQuery;
        }

        const headers = {
            'User-Agent': userAgent.trim()
        } as Record<string, string>;

        if (request.authRequired) {
            headers.Authorization = 'Basic ' + Buffer.from(this.client.options.clientId + ':' + this.client.options.clientSecret).toString('base64');
        }

        if (request.advancedAuthRequired) {
            if (!this.client.ready) throw Error(LunifyErrors.ClientNotReady.replace('![[PATH]]', request.route));
            headers.Authorization = await this.client.credentials.getAuthorization();
        }

        const url = this.resolveUrl(request.domain, request.route, query);
        const method = request.method.toUpperCase();
        const contentType = request.headers?.['Content-Type']?.toLowerCase();

        let finalBody: RequestInit['body'];
        if (
            request.body &&
            typeof request.body !== 'string' &&
            (!contentType || contentType === 'application/json')
        ) {
            finalBody = JSON.stringify(request.body);
        }

        if (!finalBody) finalBody = request.body as RequestInit['body'];

        return {
            url,
            fetchOptions: {
                body: ['GET', 'HEAD'].includes(method) ? undefined : finalBody,
                headers: { ...request.headers, ...headers },
                method
            }
        };
    }

    private async makeRequest<T>(url: string, options: RequestInit): Promise<ResponseLike> {
        let res: ResponseLike;

        try {
            res = await fetch(url, options);
        } catch (error: unknown) {
            if (!(error instanceof Error)) throw error;
            if ((('code' in error && error.code === 'ECONNRESET') || error.message.includes('ECONNRESET'))) {
                return null;
            }

            throw error;
        }

        if (res.status < 200 || res.status >= 300) {
            const errorText = await res.text();
            const error = new Error(res.status + ' ' + url + ': ' + errorText);

            error.info = {
                status: res.status,
                url: url,
                errorText: errorText
            }; 

            throw error;
        }

        return {
            body: res.body,
            arrayBuffer(): Promise<ArrayBuffer> {
                return res.arrayBuffer();
            },
            json(): Promise<T> {
                return res.json();
            },
            text(): Promise<string> {
                return res.text();
            },
            bodyUsed: res.bodyUsed,
            headers: res.headers,
            status: res.status,
            ok: res.ok
        };
    }

    private async parseResponse<T>(res: ResponseLike): Promise<T> {
        const contentType = res.headers.get('content-type');

        if (contentType?.startsWith('application/json')) return await res.json() as T;
        if (contentType?.startsWith('text/html')) return res.text() as T;
        if (contentType?.startsWith('image')) return await res.arrayBuffer() as T;

        return await res.text() as T;
    }

    private async request<T>(options: InternalRequest) {
        const { url, fetchOptions } = await this.resolveRequest(options);
        const res = await this.makeRequest<T>(url, fetchOptions);

        return await this.parseResponse<T>(res);
    }

    /**
     * Send a GET request to the spotify api
     * @param {string} route - The full route to query
     * @param {RequestData?} options - Optional request options
     */
    public get<T>(route: RouteLike, options: RequestData = {}) {
        return this.request<T>({ ...options, route, method: RequestMethod.Get });
    }

    /**
     * Send a DELETE request to the spotify api
     * @param {string} route - The full route to query
     * @param {RequestData?} options - Optional request options
     */
    public delete<T>(route: RouteLike, options: RequestData = {}) {
        return this.request<T>({ ...options, route, method: RequestMethod.Delete });
    }

    /**
     * Send a POST request to the spotify api
     * @param {string} route - The full route to query
     * @param {RequestData?} options - Optional request options
     */
    public post<T>(route: RouteLike, options: RequestData = {}) {
        return this.request<T>({ ...options, route, method: RequestMethod.Post });
    }

    /**
     * Send a PUT request to the spotify api
     * @param {string} route - The full route to query
     * @param {RequestData?} options - Optional request options
     */
    public put<T>(route: RouteLike, options: RequestData = {}) {
        return this.request<T>({ ...options, route, method: RequestMethod.Put });
    }

    /**
     * Send a PATCH request to the spotify api
     * @param {string} route - The full route to query
     * @param {RequestData?} options - Optional request options
     */
    public patch<T>(route: RouteLike, options: RequestData = {}) {
        return this.request<T>({ ...options, route, method: RequestMethod.Patch });
    }

}
