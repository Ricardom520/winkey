"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedFull2Short = void 0;
const WINKEY_SEED_FULL_PREFIX = 'winkey-init-project-seed-';
const SEED_FULL_PREFIX = 'winkey-init-project-seed-';
const WINKEY_SEED_SHORT_PREFIX = 'winkey-';
const REG = {
    WINKEY_SEED_FULL_PREFIX: new RegExp(`^${WINKEY_SEED_FULL_PREFIX}`),
    WINKEY_SEED_SHORT_PREFIX: new RegExp(`^${WINKEY_SEED_FULL_PREFIX}`),
    SEED_FULL_PREFIX: new RegExp(`^${SEED_FULL_PREFIX}`),
    NODE_HANDLE: /(node\.exe|node)$/
};
const seedFull2Short = (name) => {
    return name
        .replace(REG.WINKEY_SEED_FULL_PREFIX, WINKEY_SEED_SHORT_PREFIX)
        .replace(REG.SEED_FULL_PREFIX, '');
};
exports.seedFull2Short = seedFull2Short;
