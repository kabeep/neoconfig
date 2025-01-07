import type { PathLike } from 'node:fs';
import { join } from 'node:path';
import {
    i18n,
    isDir,
    isEmpty,
    isExists,
    isFile,
    isReadable,
    pipeline,
} from '../utils';

const isNonEmpty = async (path: PathLike) => !(await isEmpty(path));

async function validateDir(path: PathLike) {
    return await pipeline<PathLike, boolean>(path, [
        [isExists, i18n.t('CMD_ERR.ENOENT_DIR', { path: `${path}` })],
        [isDir, i18n.t('CMD_ERR.ENOTDIR', { path: `${path}` })],
        [isReadable, i18n.t('CMD_ERR.EACCES_R_DIR', { path: `${path}` })],
        [isNonEmpty, i18n.t('CMD_ERR.E_EMPTY_DIR', { path: `${path}` })],
    ]);
}

async function validateConf(path: PathLike) {
    return await pipeline<PathLike, boolean>(path, [
        [isExists, i18n.t('CMD_ERR.ENOENT_FILE', { path: `${path}` })],
        [isReadable, i18n.t('CMD_ERR.EACCES_R_DIR', { path: `${path}` })],
    ]);
}

const createConfExistsValidate = (path: PathLike) => async () =>
    await isExists(path);

const createConfFileValidate = (path: PathLike) => async () =>
    await isFile(path);

async function validateTheme(path: PathLike) {
    const confPath = join(`${path}`, 'config.conf');
    return await pipeline<PathLike, boolean>(path, [
        [isExists, i18n.t('CMD_ERR.ENOENT_FILE', { path: `${path}` })],
        [isDir, i18n.t('CMD_ERR.ENOTDIR', { path: `${path}` })],
        [isReadable, i18n.t('CMD_ERR.EACCES_R_DIR', { path: `${path}` })],
        [isNonEmpty, i18n.t('CMD_ERR.E_EMPTY_DIR', { path: `${path}` })],
        [
            createConfExistsValidate(confPath),
            i18n.t('CMD_ERR.ENOENT_CONF', { path: confPath }),
        ],
        [
            createConfFileValidate(confPath),
            i18n.t('CMD_ERR.E_NOT_FILE', { path: confPath }),
        ],
    ]);
}

const validate = {
    dir: validateDir,
    conf: validateConf,
    theme: validateTheme,
};

export default validate;
