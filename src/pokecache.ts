export type CacheEntry<T> = {
    createdAt: number;
    val: T
};

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(interval: number) {
        this.#interval = interval;
        this.#startReapLoop();
    };

    add<T>(key: string, val: T) {
        const entry = {
            createdAt: Date.now(),
            val: val,
        };
        this.#cache.set(key, entry);
    }

    get<T>(key: string): T | undefined {
        return this.#cache.get(key)?.val;
    }

    #reap(){
        for(let [key, entry] of this.#cache){
            if(entry.createdAt < Date.now() - this.#interval){
                this.#cache.delete(key);
            }
        }
    }

    #startReapLoop(){
        this.#reapIntervalId = setInterval(() => {this.#reap()}, this.#interval);
    }

    stopReapLoop(){
        if(this.#reapIntervalId){
            clearInterval(this.#reapIntervalId);
            this.#reapIntervalId = undefined;
        }
    }
}

