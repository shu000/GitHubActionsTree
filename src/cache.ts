export class PageCache {
    public save(key: string, value: string): void {
        const cache = document.getElementById("ghatree-cache");
        if (cache) {
            cache.dataset[key] = value;
            return;
        }

        const newCache = document.createElement("div");
        newCache.id = "ghatree-cache";
        newCache.dataset[key] = value;
        document.body.appendChild(newCache);
    }

    public get(key: string): string {
        const cache = document.getElementById("ghatree-cache");
        if (cache) {
            const value = cache.dataset[key];
            return value ?? "";
        }

        return "";
    }
}
