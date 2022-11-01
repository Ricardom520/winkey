"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const localStorage_1 = require("./localStorage");
const pkg = require('../../package.json');
const DEFAULT_PKG_CONFIG = {
    name: 'init-project-plugins',
    version: pkg.version,
    description: 'plugin manage',
    license: 'ISC',
    repostory: {},
    repository: {},
    dependencies: {},
    devDependencies: {}
};
const DEFAULT_CONFIG = {
    seeds: [],
    seedMap: {}
};
const DEFAULT_LOCAL_SEED_CONFIG = {};
class LocalConfig {
    constructor() {
        this.handle = new localStorage_1.default('config', DEFAULT_CONFIG);
        this.pkgHandle = new localStorage_1.default('plugins/package', DEFAULT_PKG_CONFIG);
        this.seedHandle = new localStorage_1.default('local-seed.config', DEFAULT_LOCAL_SEED_CONFIG);
    }
    async get() {
        return await this.handle.get();
    }
    async updateSeedInfo() {
        // update config
        const setting = await this.handle.get();
        const pluginPkg = await this.pkgHandle.get();
        setting.seeds = Object.keys(pluginPkg.dependencies);
        setting.seedMap = {};
        setting.seeds.forEach((seedName) => {
            const seedPath = path.join(path.dirname(this.pkgHandle.savePath), 'node_modules', seedName);
            const seedPkgPath = path.join(seedPath, 'package.json');
            if (fs.existsSync(seedPkgPath)) {
                const pkg = require(seedPkgPath);
                setting.seedMap[seedName] = {
                    name: seedName,
                    version: pkg.version,
                    main: path.resolve(seedPath, pkg.main)
                };
            }
        });
        const localSeedMap = await this.seedHandle.get();
        Object.keys(localSeedMap).forEach((seedName) => {
            if (setting.seeds.indexOf(seedName) === -1) {
                setting.seeds.push(seedName);
            }
            setting.seedMap[seedName] = localSeedMap[seedName];
        });
        return await this.handle.set(setting);
    }
    // 重置 config
    async reset() {
        await this.handle.set(DEFAULT_CONFIG);
        await this.pkgHandle.set(DEFAULT_PKG_CONFIG);
        await this.seedHandle.set(DEFAULT_LOCAL_SEED_CONFIG);
        await this.updateSeedInfo();
        return await this.get();
    }
}
exports.default = LocalConfig;
