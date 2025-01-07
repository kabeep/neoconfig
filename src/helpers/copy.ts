import type { PathLike } from 'node:fs';
import { copyFile } from 'node:fs/promises';
import { join } from 'node:path';
import { isFile, readDir } from '../utils';

async function copy(src: PathLike, dest: PathLike) {
    const isConf = await isFile(src);

    if (isConf) {
        await copyFile(src, join(`${dest}`, 'config.conf'));
        return;
    }

    const entries = await readDir(src);
    for (const entry of entries) {
        const sourcePath = join(`${src}`, entry.name);
        const targetPath = join(`${dest}`, entry.name);

        if (entry.isDirectory()) {
            await copy(sourcePath, targetPath);
        } else if (entry.isFile()) {
            await copyFile(sourcePath, targetPath);
        }
    }
}

export default copy;
