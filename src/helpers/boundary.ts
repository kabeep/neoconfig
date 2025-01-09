import { FIGURES } from '../constants';
import { i18n, palette, to } from '../utils';

// biome-ignore lint/suspicious/noExplicitAny: type inference
function boundary<T extends (...args: any[]) => Promise<any>>(fn: T) {
    return async (...args: Parameters<T>): Promise<void> => {
        const [err, stdout] = await to(fn(...args));

        const prefix = err
            ? palette.red(FIGURES.CROSS)
            : palette.green(FIGURES.TICK);

        if (err) {
            const stderr = err.message || i18n.t('CMD_ERR');
            console.error(`${prefix} ${stderr}`);

            return;
        }

        console.log(`${prefix} ${stdout}`);
    };
}

export default boundary;
