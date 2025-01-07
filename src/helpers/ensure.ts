import type { PathLike } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import { isExists } from '../utils';

async function ensure(path: PathLike) {
    const _isExists = await isExists(path);
    if (!_isExists) {
        await mkdir(path);
    }
}

export default ensure;
