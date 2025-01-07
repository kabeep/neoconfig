import { type PathLike, stat } from 'node:fs';

function isFile(path: PathLike): Promise<boolean> {
    return new Promise((resolve, reject) => {
        stat(path, (err, stats) => {
            if (err) reject(err);

            resolve(stats.isFile());
        });
    });
}

export default isFile;
