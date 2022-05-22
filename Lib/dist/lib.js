"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.incS = exports.inc = void 0;
;
function inc(k, a) {
    a.gmapT(k);
    return a;
}
exports.inc = inc;
function incS(k, S) {
    S.salary = S.salary * (1 + k);
    return S;
}
exports.incS = incS;
