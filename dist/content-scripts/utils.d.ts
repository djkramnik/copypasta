export declare const sleep: (ms?: number) => Promise<unknown>;
export declare function getDoTasks(ms?: number): (tasks: Array<() => ({})>) => Promise<void>;
export declare function opportunisticallyInjectButton(inject: () => {
    stop: boolean;
}, pause?: number): void;
