"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    INIT: {
        LIST_START: '正在拉取可运行 seed 包',
        LIST_FINISHED: '拉取可运行 seed 包 完成',
        QUEATION_SELECT_TYPE: '请选择初始化的 seed 包',
        START: 'init 运行开始',
        SEED_INSTALLING: '正在安装 seed 包',
        SEED_INSTALLED: '安装 seed 包 完成',
        SEED_LOADING: '正在加载 seed 包',
        SEED_LOAD_FINISHED: '加载完成',
        SEED_MAP_MAIN_NOT_EXISTS: 'seed 配置错误，请重新安装 seed 包',
        SEED_COPY_PATH_NOT_EXISTS: 'seed.path 路径不存在，请联系 seed 包作者',
        SEED_COPY_PATH_UNDEFINED: 'seed.path 没有设置，请联系 seed 包作者',
        SEED_COPY_PATH_PRINT: 'seed 待复制原始路径',
        SEED_COPY_MAP_PRINT: 'seed 复制路径映射预览',
        SEED_MAIN_PRINT: 'seed 包路径',
        HOOKS_BEFORE_START_RUN: 'hooks.beforeStart 触发',
        HOOKS_BEFORE_START_FINISHED: 'hooks.beforeStart 完成',
        HOOKS_BEFORE_COPY_RUN: 'hooks.beforeCopy 触发',
        HOOKS_BEFORE_COPY_FINISHED: 'hooks.beforeCopy 完成',
        HOOKS_AFTER_COPY_RUN: 'hooks.afterCopy 触发',
        HOOKS_AFTER_COPY_FINISHED: 'hooks.afterCopy 完成'
    },
    INSTALL: {
        START: 'install 运行开始',
        FINISHED: 'install 运行完成'
    },
    SEEDS: {
        START: '开始查找seeds包',
        LOADING: '查找中，请稍候',
        END: '查找结束'
    },
    WINKEY: {
        DEFAULT: 'winkey 脚手架命令行展示:',
        BUILD: 'winkey build || winkey build xxx (项目所在位置) 打包项目',
        DEV: 'winkey dev || winkey dev xxx (项目所在位置) 本地运行项目',
        LISTSEEDS: 'winkey list -s || winkey list --seeds 查看所有seeds包'
    }
};
