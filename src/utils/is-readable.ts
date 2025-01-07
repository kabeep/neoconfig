import { constants, type PathLike } from 'node:fs';
import { access } from 'node:fs/promises';

async function isReadable(path: PathLike) {
    try {
        await access(path, constants.R_OK);
        return true;
    } catch {
        return false;
    }
}

export default isReadable;
