import { constants, type PathLike } from 'node:fs';
import { access } from 'node:fs/promises';

async function isWritable(path: PathLike) {
    try {
        await access(path, constants.W_OK);
        return true;
    } catch {
        return false;
    }
}

export default isWritable;
