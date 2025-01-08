import ora, { type Ora } from 'ora';
import { i18n, to } from '../utils';

function boundary<T extends unknown[] = unknown[], R = unknown>(
    fn: (...args: [...T, Ora]) => Promise<R | undefined>,
) {
    return async (...args: T): Promise<void> => {
        const spinner = ora({ color: 'cyan' });

        const [err] = await to(fn(...args, spinner));
        if (err) {
            spinner.fail(err.message || i18n.t('CMD_ERR'));
        }
    };
}

export default boundary;
