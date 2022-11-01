"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const utils_1 = require("./utils");
const USERPROFILE = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];
const CONFIG_PATH = path.join(USERPROFILE, '.init-project');
class LocalStorage {
    constructor(name, data) {
        const savePath = path.join(CONFIG_PATH, `${name}.json`);
        let iData = data || {};
        if (fs.existsSync(savePath)) {
            try {
                iData = require(savePath);
            }
            catch (er) {
                fs.writeFileSync(savePath, JSON.stringify(iData, null, 2));
            }
        }
        else {
            (0, utils_1.makeAsync)(async () => {
                await fs.mkdirSync(path.dirname(savePath));
                await (0, utils_1.makeAwait)((next) => {
                    fs.writeFile(savePath, JSON.stringify(data, null, 2), () => {
                        next();
                    });
                });
            });
        }
        this.savePath = savePath;
        this.defaultData = data;
    }
    async get() {
        if (fs.existsSync(this.savePath)) {
            await (0, utils_1.makeAwait)((next) => {
                fs.readFile(this.savePath, (err, data) => {
                    try {
                        this.data = JSON.parse(data.toString());
                    }
                    catch (err) {
                        this.data = this.defaultData;
                    }
                    next();
                });
            });
        }
        return Promise.resolve(this.data);
    }
    async set(data) {
        this.data = data;
        await (0, utils_1.makeAwait)((next) => {
            fs.writeFile(this.savePath, JSON.stringify(this.data, null, 2), () => {
                next();
            });
        });
        return this.data;
    }
}
exports.default = LocalStorage;
