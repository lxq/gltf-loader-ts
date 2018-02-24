// Adapted from THREE.LoadingManager
// https://raw.githubusercontent.com/mrdoob/three.js/master/src/loaders/LoadingManager.js

type OnStartOnProgressCallback = ((url: string, itemsLoaded: number, itemsTotal: number) => void) | undefined;

export class LoadingManager {
    private isLoading = false;
    private itemsLoaded = 0;
    private itemsTotal = 0;

    urlModifier: ((url: string) => string) | undefined = undefined;
    onStart: OnStartOnProgressCallback = undefined;
    onLoad: (() => void) | undefined = undefined;
    onProgress: OnStartOnProgressCallback = undefined;
    onError: ((url: string) => void) | undefined = undefined;

    itemStart(url: string) {
        this.itemsTotal++;
        if (this.isLoading && this.onStart) {
            this.onStart(url, this.itemsLoaded, this.itemsTotal);
        }
        this.isLoading = true;
    }

    itemEnd(url: string) {
        this.itemsLoaded++;
        if (this.onProgress) {
            this.onProgress(url, this.itemsLoaded, this.itemsTotal);
        }
        if (this.itemsLoaded === this.itemsTotal) {
            this.isLoading = false;
            if (this.onLoad) {
                this.onLoad();
            }
        }
    }

    itemError(url: string) {
        if (this.onError) {
            this.onError(url);
        }
    }

    resolveURL(url: string) {
        if (this.urlModifier) {
            return this.urlModifier(url);
        }
        return url;
    }
}
