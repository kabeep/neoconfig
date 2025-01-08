import type { PathLike } from 'node:fs';
import { prompt } from '../components';
import { fuzzySearch, i18n, readDir, to } from '../utils';
import { type ThemeOptions, ThemeTypes, remapping, validate } from './index';

async function navigate(path: PathLike, parentPath?: PathLike) {
    await validate.dir(path);

    let eventKey: string | undefined;
    let current: ThemeOptions | undefined;

    const abortController = new AbortController();

    const entries = await readDir(path);
    const choices = await remapping(entries);

    const [err, answer] = await to(
        prompt<ThemeOptions>(
            {
                message: i18n.t('CMD_NAVIGATE'),
                source: (term?: string) => {
                    if (!term) return choices;

                    return choices.filter((item) =>
                        fuzzySearch(
                            term.toLowerCase(),
                            item.name.toLowerCase(),
                        ),
                    );
                },
                pageSize: 12,
                eventKeys: ['left', 'right', 'enter', 'return'],
                subscriber: (key: string, selected) => {
                    current = undefined;
                    eventKey = key;
                    if (['enter', 'return'].includes(key) && selected) {
                        eventKey = 'enter';
                        current = selected.value;
                        abortController.abort(
                            'Enter the selected directory or return answer',
                        );
                    } else if (key === 'left' && parentPath) {
                        abortController.abort('Return to the parent directory');
                    } else if (
                        key === 'right' &&
                        selected?.value?.status === ThemeTypes.FILL_DIR
                    ) {
                        current = selected.value;
                        abortController.abort('Enter the selected directory');
                    }
                },
            },
            { clearPromptOnDone: true, signal: abortController.signal },
        ),
    );

    const isAbort = err && ~err.message.indexOf('aborted');
    if (isAbort) {
        if (
            eventKey === 'enter' &&
            current?.status &&
            [ThemeTypes.CONF, ThemeTypes.CONF_DIR].includes(current.status)
        ) {
            return current;
        }
        if (eventKey === 'left' && parentPath) {
            return await navigate(parentPath);
        }
        if (
            (eventKey === 'enter' || eventKey === 'right') &&
            current?.status === ThemeTypes.FILL_DIR
        )
            return await navigate(current.path, path);
    } else if (err) {
        throw new Error(i18n.t('CMD_ERR.CANCEL'));
    }

    if (!answer) throw new Error(i18n.t('CMD_ERR'));
    if (answer.status === ThemeTypes.FILL_DIR) {
        return await navigate(answer.path, path);
    }

    return answer;
}

export default navigate;
