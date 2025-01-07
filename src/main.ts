import { to } from 'await-to-js';
import type { Ora } from 'ora';
import trash from 'trash';
import { CONFIG_DIR, THEME_DIR } from './constants';
import {
    ThemeTypes,
    boundary,
    copy,
    ensure,
    navigate,
    validate,
} from './helpers';
import { i18n, isWritable } from './utils';

export interface Options {
    _: (string | number)[];
    $0: string;
}

async function main(_: Options, spinner: Ora) {
    const _isWritable = await isWritable(CONFIG_DIR);
    if (!_isWritable)
        throw new Error(i18n.t('CMD_ERR.EACCES_W_DIR', { path: CONFIG_DIR }));

    const [ensureErr] = await to(ensure(THEME_DIR));
    if (ensureErr)
        throw new Error(
            i18n.t('CMD_ERR.ENSURE', { reason: ensureErr.message }),
        );

    const { name, status, path } = (await navigate(THEME_DIR)) ?? {};
    if (!path) throw new Error(i18n.t('CMD_ERR'));

    const root = CONFIG_DIR.replaceAll('\\', '/');
    const [trashErr] = await to(
        trash([`${root}/*`, `!${root}/themes`], {
            glob: true,
        }),
    );
    if (trashErr)
        throw new Error(i18n.t('CMD_ERR.TRASH', { path: CONFIG_DIR }));

    const isConf = status === ThemeTypes.CONF;
    if (isConf) await validate.conf(path);
    else await validate.theme(path);

    const [copyErr] = await to(copy(path, CONFIG_DIR));
    if (copyErr)
        throw new Error(i18n.t('CMD_ERR.COPY', { reason: copyErr.message }));
    spinner.succeed(i18n.t('CMD_SUCCESS', { name }));
}

export default boundary<[Options]>(main);
