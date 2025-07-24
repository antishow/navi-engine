declare function addAction(
    hookName: string,
    namespace: string,
    callback: Function,
    priority: Number
): void;

declare function removeAction(
    hookName: string,
    namespace: string | null,
): void;

declare function removeAllActions(
    hookName: string,
): void;

declare function addSceneAction(
    hookName: string,
    namespace: string,
    callback: Function,
    priority: Number
): void;

declare function doAction(
    hookName: string,
    ...args: any[],
): void;

declare function addFilter(
    hookName: string,
    namespace: string,
    callback: Function,
    priority: Number,
): void;

declare function removeFilter(
    hookName: string,
    namespace: string,
): void;

declare function removeAllFilters(
    hookName: string,
): void;

declare function applyFilters(
    hookName: string,
    content: any,
    ...args: any[],
): any;

export {
    addAction,
    removeAction,
    removeAllActions,
    addSceneAction,
    doAction,
    addFilter,
    removeFilter,
    removeAllFilters,
    applyFilters,
};