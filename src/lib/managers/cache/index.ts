export class CacheManager<K, V> extends Map<K, V> {
    constructor() {
        super();
    }

    /**
     * Finds a value in the cache that satisfies the predicate
     * @param fn The predicate function
     */
    find(fn: (value: V, key: K, collection: this) => boolean): V | undefined {
        for (const [key, val] of this) {
            if (fn(val, key, this)) return val;
        }

        return undefined;
    }
}