import type { Dirent } from 'node:fs';
import { extname } from 'node:path';
import { to } from 'await-to-js';
import type { Choice } from '../components';
import { FIGURES } from '../constants';
import { i18n, palette, readDir } from '../utils';

export interface ThemeOptions {
    name: string;
    path: string;
    status: ThemeTypes;
}

export enum ThemeTypes {
    CONF = 'CONF',
    CONF_DIR = 'CONF_DIR',
    FILL_DIR = 'FILL_DIR',
    EMPTY_DIR = 'EMPTY_DIR',
    EACCES_DIR = 'EACCES_DIR',
}

async function getThemeType(dirent: Dirent) {
    if (dirent.isFile()) return ThemeTypes.CONF;

    const [err, entries] = await to(
        readDir(`${dirent.parentPath ?? dirent.path}\\${dirent.name}`),
    );

    if (err || !entries) return ThemeTypes.EACCES_DIR;

    if (!entries.length) return ThemeTypes.EMPTY_DIR;

    if (entries.some((file) => file.name === 'config.conf')) {
        return ThemeTypes.CONF_DIR;
    }

    return ThemeTypes.FILL_DIR;
}

function getSymbol(type: ThemeTypes) {
    switch (type) {
        case ThemeTypes.CONF:
            return FIGURES.CONF;
        case ThemeTypes.CONF_DIR:
            return palette.blue(FIGURES.CONF_DIR);
        case ThemeTypes.FILL_DIR:
            return palette.blue(FIGURES.FILL_DIR);
        case ThemeTypes.EMPTY_DIR:
            return palette.grey(FIGURES.EMPTY_DIR);
        case ThemeTypes.EACCES_DIR:
            return palette.red(FIGURES.EACCES_DIR);
    }
}

function getTips(type: ThemeTypes, tips: Record<string, string>) {
    switch (type) {
        case ThemeTypes.CONF:
            return [
                tips.TIP_MOVE_CURSOR,
                tips.TIP_RETURN_PARENT,
                tips.TIP_SWITCH_THEME,
                tips.TIP_EXIT,
            ].join('\n');
        case ThemeTypes.CONF_DIR:
            return [
                tips.TIP_MOVE_CURSOR,
                tips.TIP_RETURN_PARENT,
                tips.TIP_SWITCH_THEME,
                tips.TIP_EXIT,
            ].join('\n');
        case ThemeTypes.FILL_DIR:
            return [
                tips.TIP_MOVE_CURSOR,
                tips.TIP_ENTER_DIRECTORY,
                tips.TIP_RETURN_PARENT,
                tips.TIP_EXIT,
            ].join('\n');
        case ThemeTypes.EMPTY_DIR:
            return '';
        case ThemeTypes.EACCES_DIR:
            return '';
    }
}

async function remapping(entries: Dirent[]) {
    const result: Array<
        Omit<Choice<ThemeOptions>, 'name'> &
            Required<Pick<Choice<ThemeOptions>, 'name'>>
    > = [];

    const TIP_MOVE_CURSOR = i18n.t('CMD_TIP.MOVE_CURSOR', {
        key: `${palette.yellow(FIGURES.ARROW_TOP)}  / ${palette.yellow(FIGURES.ARROW_BOTTOM)} `,
    });
    const TIP_ENTER_DIRECTORY = i18n.t('CMD_TIP.ENTER_DIRECTORY', {
        key: `${palette.yellow(FIGURES.ARROW_RIGHT)}  / ${palette.yellow('ENTER')}`,
    });
    const TIP_RETURN_PARENT = i18n.t('CMD_TIP.RETURN_PARENT', {
        key: palette.yellow(FIGURES.ARROW_LEFT),
    });
    const TIP_SWITCH_THEME = i18n.t('CMD_TIP.SWITCH_THEME', {
        key: palette.yellow('ENTER'),
    });
    const TIP_EXIT = i18n.t('CMD_TIP.EXIT', {
        key: palette.yellow('CTRL - C'),
    });

    const tips = {
        TIP_MOVE_CURSOR,
        TIP_ENTER_DIRECTORY,
        TIP_RETURN_PARENT,
        TIP_SWITCH_THEME,
        TIP_EXIT,
    };

    for (const file of entries) {
        const isFile = file.isFile();
        const name = file.name;
        if (isFile && extname(name) !== '.conf') continue;

        const status = await getThemeType(file);
        const prefix = getSymbol(status);
        const value = {
            name,
            status,
            path: `${file.parentPath ?? file.path}\\${name}`,
        };

        result.push({
            name,
            value,
            short: name,
            prefix: `${prefix}  `,
            description: `------------------\n${getTips(status, tips)}`,
            disabled: [ThemeTypes.EMPTY_DIR, ThemeTypes.EACCES_DIR].includes(
                status,
            ),
        });
    }

    return result;
}

export default remapping;
