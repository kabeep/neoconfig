import { type PathLike, readdir } from 'node:fs';

function isEmpty(path: PathLike): Promise<boolean> {
    return new Promise((resolve, reject) => {
        readdir(path, (err, files) => {
            if (err) reject(err);
            resolve(!files?.length);
        });
    });
}

export default isEmpty;
