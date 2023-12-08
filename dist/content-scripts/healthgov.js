"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthGovScript = void 0;
function healthGovScript() {
    console.log('IM treading lightly -- health gov edition');
    opportunisticallyInjectButton(injectHealthGovDom);
    function opportunisticallyInjectButton(inject, pause = 3000) {
        console.log('no more couch surfing', inject);
        const { stop } = inject();
        if (stop) {
            return;
        }
        setTimeout(() => opportunisticallyInjectButton(inject, pause), pause);
    }
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
    function injectHealthGovDom() {
        const planTitleClassName = `.pet-c-plan-title__issuer`;
        const planTitles = document.querySelectorAll(planTitleClassName);
        planTitles.forEach((el, index) => {
            if (!!el.querySelector(`#copy-extension-button-${index}}`)) {
                return;
            }
            console.log('just in case');
            const button = document.createElement('button');
            button.innerHTML = 'Copy';
            // @ts-ignore
            button.style = 'margin-left: 24px';
            button.setAttribute('id', `copy-extension-button-${index}`);
            el.appendChild(button);
            console.log('burning to death in space');
            button.addEventListener('click', (event) => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7;
                const searchResult = (_b = (_a = el === null || el === void 0 ? void 0 : el.parentNode) === null || _a === void 0 ? void 0 : _a.parentNode) !== null && _b !== void 0 ? _b : el;
                const carrierName = ((_d = (_c = searchResult.querySelector('.pet-c-plan-title__issuer')) === null || _c === void 0 ? void 0 : _c.textContent) !== null && _d !== void 0 ? _d : '')
                    .replace('Copy', '');
                const planName = (_f = (_e = searchResult.querySelector('.pet-c-plan-title__name')) === null || _e === void 0 ? void 0 : _e.textContent) !== null && _f !== void 0 ? _f : '';
                const info = searchResult.querySelector('.pet-c-plan-title__info');
                const metalLevel = (_h = (_g = info === null || info === void 0 ? void 0 : info.querySelector('[aria-label="Metal Level"]')) === null || _g === void 0 ? void 0 : _g.textContent) !== null && _h !== void 0 ? _h : '';
                const planType = (_k = (_j = info === null || info === void 0 ? void 0 : info.querySelector('[aria-label="Plan type"]')) === null || _j === void 0 ? void 0 : _j.textContent) !== null && _k !== void 0 ? _k : '';
                const planId = (_m = (_l = info === null || info === void 0 ? void 0 : info.querySelector('[aria-label="Plan ID"]')) === null || _l === void 0 ? void 0 : _l.textContent) !== null && _m !== void 0 ? _m : '';
                const rating = (_r = (_q = (_p = (_o = info === null || info === void 0 ? void 0 : info.querySelector('.ds-c-icon--star ')) === null || _o === void 0 ? void 0 : _o.parentNode) === null || _p === void 0 ? void 0 : _p.querySelector('.ds-u-visibility--screen-reader')) === null || _q === void 0 ? void 0 : _q.textContent) !== null && _r !== void 0 ? _r : '';
                const premium = (_t = (_s = searchResult.querySelector(`[aria-labelledby="${planId}-premium-label"]`)) === null || _s === void 0 ? void 0 : _s.textContent) !== null && _t !== void 0 ? _t : '';
                const [, deductibleEl, oopEl,] = Array.from(searchResult.querySelectorAll('.pet-c-plan-cost-row .pet-c-plan__currency-container'));
                const benefits = Array.from(searchResult.querySelectorAll('.pet-c-plan-benefit-name'));
                const primaryCare = benefits.find(el => el.textContent === 'Primary care');
                const specialistCare = benefits.find(el => el.textContent === 'Specialist care');
                const emergencyRoom = benefits.find(el => el.textContent === 'Emergency room');
                const genericDrugs = benefits.find(el => el.textContent === 'Generic drugs');
                const result = {
                    carrierName,
                    planName,
                    metalLevel,
                    planType,
                    planId,
                    rating,
                    premium,
                    deductible: (_u = deductibleEl === null || deductibleEl === void 0 ? void 0 : deductibleEl.textContent) !== null && _u !== void 0 ? _u : '',
                    oop: (_v = oopEl === null || oopEl === void 0 ? void 0 : oopEl.textContent) !== null && _v !== void 0 ? _v : '',
                    primaryCare: primaryCare
                        ? (_y = (_x = (_w = primaryCare.parentNode) === null || _w === void 0 ? void 0 : _w.querySelector('.pet-c-plan-benefit-cost')) === null || _x === void 0 ? void 0 : _x.textContent) !== null && _y !== void 0 ? _y : ''
                        : '',
                    specialistCare: specialistCare
                        ? (_1 = (_0 = (_z = specialistCare.parentNode) === null || _z === void 0 ? void 0 : _z.querySelector('.pet-c-plan-benefit-cost')) === null || _0 === void 0 ? void 0 : _0.textContent) !== null && _1 !== void 0 ? _1 : ''
                        : '',
                    emergencyRoom: emergencyRoom
                        ? (_4 = (_3 = (_2 = emergencyRoom.parentNode) === null || _2 === void 0 ? void 0 : _2.querySelector('.pet-c-plan-benefit-cost')) === null || _3 === void 0 ? void 0 : _3.textContent) !== null && _4 !== void 0 ? _4 : ''
                        : '',
                    genericDrugs: genericDrugs
                        ? (_7 = (_6 = (_5 = genericDrugs.parentNode) === null || _5 === void 0 ? void 0 : _5.querySelector('.pet-c-plan-benefit-cost')) === null || _6 === void 0 ? void 0 : _6.textContent) !== null && _7 !== void 0 ? _7 : ''
                        : '',
                };
                console.log(JSON.stringify(result));
                chrome.storage.session.set({ test: result });
            });
        });
        return { stop: false };
    }
}
exports.healthGovScript = healthGovScript;
