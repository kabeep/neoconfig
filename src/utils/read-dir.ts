import type { Dirent, PathLike } from 'node:fs';
import { readdir } from 'node:fs/promises';

function readDir(path: PathLike): Promise<Dirent[]> {
    return readdir(path, { withFileTypes: true });
}

export default readDir;
