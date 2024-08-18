export declare class Container {
    private readonly _definitions;
    private _resolvedEntries;
    private constructor();
    static create(definitions: any): Container;
    has(key: string): boolean;
    get<T = any>(key: string): T;
}
