"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.opportunisticallyInjectButton = exports.getDoTasks = exports.sleep = void 0;
const sleep = (ms = 1000) => {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
};
exports.sleep = sleep;
function getDoTasks(ms = 1000) {
    return function doTasks(tasks) {
        return tasks.reduce((acc, task) => {
            return acc.then(() => {
                return new Promise(resolve => {
                    setTimeout(() => {
                        task();
                        resolve();
                    }, ms);
                });
            });
        }, Promise.resolve());
    };
}
exports.getDoTasks = getDoTasks;
function opportunisticallyInjectButton(inject, pause = 1000) {
    console.log('errmmmmmm', inject);
    const { stop } = inject();
    if (stop) {
        return;
    }
    setTimeout(() => opportunisticallyInjectButton(inject, pause), pause);
}
exports.opportunisticallyInjectButton = opportunisticallyInjectButton;
