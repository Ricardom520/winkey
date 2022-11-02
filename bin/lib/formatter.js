"use strict";
exports.__esModule = true;
exports.seedFull2Short = void 0;
var WINKEY_SEED_FULL_PREFIX = 'winkey-init-project-seed-';
var SEED_FULL_PREFIX = 'winkey-init-project-seed-';
var WINKEY_SEED_SHORT_PREFIX = 'winkey-';
var REG = {
    WINKEY_SEED_FULL_PREFIX: new RegExp("^".concat(WINKEY_SEED_FULL_PREFIX)),
    WINKEY_SEED_SHORT_PREFIX: new RegExp("^".concat(WINKEY_SEED_FULL_PREFIX)),
    SEED_FULL_PREFIX: new RegExp("^".concat(SEED_FULL_PREFIX)),
    NODE_HANDLE: /(node\.exe|node)$/
};
var seedFull2Short = function (name) {
    return name
        .replace(REG.WINKEY_SEED_FULL_PREFIX, WINKEY_SEED_SHORT_PREFIX)
        .replace(REG.SEED_FULL_PREFIX, '');
};
exports.seedFull2Short = seedFull2Short;
