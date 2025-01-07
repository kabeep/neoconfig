import { type PathLike, access } from 'node:fs';

async function isExists(path: PathLike): Promise<boolean> {
    return new Promise((resolve) => {
        access(path, (err) => {
            resolve(!err);
        });
    });
}

export default isExists;
