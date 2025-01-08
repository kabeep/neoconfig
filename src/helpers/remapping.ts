import type { Dirent } from 'node:fs';
import { extname } from 'node:path';
import type { Choice } from '../components';
import { FIGURES } from '../constants';
import { palette, readDir, to } from '../utils';

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

async function remapping(entries: Dirent[]) {
    const result: Array<
        Omit<Choice<ThemeOptions>, 'name'> &
            Required<Pick<Choice<ThemeOptions>, 'name'>>
    > = [];

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
            disabled: [ThemeTypes.EMPTY_DIR, ThemeTypes.EACCES_DIR].includes(
                status,
            ),
        });
    }

    return result;
}

export default remapping;
