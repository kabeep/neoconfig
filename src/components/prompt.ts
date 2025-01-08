import type { Status, Theme } from '@inquirer/core';
import {
    Separator,
    createPrompt,
    isEnterKey,
    makeTheme,
    useEffect,
    useKeypress,
    useMemo,
    usePagination,
    usePrefix,
    useRef,
    useState,
} from '@inquirer/core';
import type { PartialDeep } from '@inquirer/type';
import { FIGURES } from '../constants';
import { i18n, palette } from '../utils';

type SearchTheme = {
    icon: { cursor: string };
    style: {
        disabled: (text: string) => string;
        searchTerm: (text: string) => string;
        description: (text: string) => string;
    };
    helpMode: 'always' | 'never' | 'auto';
};

const searchTheme: SearchTheme = {
    icon: { cursor: FIGURES.POINT },
    style: {
        disabled: (text: string) => palette.dim(`- ${text}`),
        searchTerm: (text: string) => palette.cyan(text),
        description: (text: string) => palette.cyan(text),
    },
    helpMode: 'auto',
};

export type Choice<Value> = {
    value: Value;
    name?: string;
    description?: string;
    short?: string;
    prefix?: string;
    disabled?: boolean | string;
    type?: never;
};

export type NormalizedChoice<Value> = {
    value: Value;
    name: string;
    description?: string;
    short: string;
    prefix: string;
    disabled: boolean | string;
};

type SearchConfig<
    Value,
    ChoicesObject =
        | ReadonlyArray<string | Separator>
        | ReadonlyArray<Choice<Value> | Separator>,
> = {
    message: string;
    source: (
        term: string | undefined,
        opt: { signal: AbortSignal },
    ) => ChoicesObject extends ReadonlyArray<string | Separator>
        ? ChoicesObject | Promise<ChoicesObject>
        :
              | ReadonlyArray<Choice<Value> | Separator>
              | Promise<ReadonlyArray<Choice<Value> | Separator>>;
    validate?: (value: Value) => boolean | string | Promise<string | boolean>;
    pageSize?: number;
    theme?: PartialDeep<Theme<SearchTheme>>;
    eventKeys?: string[];
    subscriber?: (key: string, selected?: NormalizedChoice<Value>) => void;
};

type Item<Value> = Separator | NormalizedChoice<Value>;

function isSelectable<Value>(
    item: Item<Value>,
): item is NormalizedChoice<Value> {
    return !Separator.isSeparator(item) && !item.disabled;
}

function normalizeChoices<Value>(
    choices:
        | ReadonlyArray<string | Separator>
        | ReadonlyArray<Choice<Value> | Separator>,
): Array<NormalizedChoice<Value> | Separator> {
    return choices.map((choice) => {
        if (Separator.isSeparator(choice)) return choice;

        if (typeof choice === 'string') {
            return {
                value: choice as Value,
                name: choice,
                short: choice,
                prefix: '',
                disabled: false,
            };
        }

        const name = choice.name ?? String(choice.value);
        return {
            value: choice.value,
            name,
            description: choice.description,
            short: choice.short ?? name,
            prefix: choice.prefix ?? '',
            disabled: choice.disabled ?? false,
        };
    });
}

function brandAsciiArt() {
    return `
     ⠐⢷⣦⣄⣀⢀⣀⣀⣤⣤⣤⣀⣀⠀⣀⣤⣶⡶
      ⠈⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏          ${palette.cyan('_   _             ____             __ _')}
       ⢰⣿⣿⣿⣿⣿⣿⡟⠉⣉⡺⣿⣿⣧⡀         ${palette.cyan('| \\ | | ___  ___  / ___|___  _ __  / _(_) __ _')}
       ⢸⣿⣿⣿⣿⣿⡿${palette.yellow('⢀⡾⣯⣷⣹')}⣿⣿⣿⣶⣦⡀      ${palette.cyan("|  \\| |/ _ \\/ _ \\| |   / _ \\| '_ \\| |_| |/ _` |")}
      ⣠⣿⣿⣿⣿⣿⣿⣇${palette.yellow('⠈⠂⢹⣿⢧')}⣿⣿⣿⡿⠋       ${palette.cyan('| |\\  |  __/ (_) | |__| (_) | | | |  _| | (_| |')}
    ⠠⣾⣿⣿⣿⣿⠿⣿⣿⣿⣷⣮⣭⣭⣽⣿⣿⡿⠁        ${palette.cyan('|_| \\_|\\___|\\___/ \\____\\___/|_| |_|_| |_|\\__, |')}
     ⣿⣿⣿⣿⠃ ⡻⣿⣿⣿⡟${palette.yellow('⣛⣛⣋')}             ${palette.magenta('A NeoFetch configuration file manager.')}  ${palette.cyan('|___/')}
     ⠙⠻⢿⣿⣶⣞⣛⣭⣙⣟${palette.yellow('⣼⣿⣿⣍⡳⣦⣀')}
      ${palette.yellow('⣠⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣮⣿⣷⣦⣀')}       ${i18n.t('CMD_TIP.MOVE_CURSOR', { key: `${palette.yellow(FIGURES.ARROW_TOP)}  / ${palette.yellow(FIGURES.ARROW_BOTTOM)} ` })}
    ${palette.yellow('⣠⣾⣿⣿⣟⣽⣿⣿')}⣿⣿⣿⣿⣿⣿⣿⣿⣿⡌${palette.yellow('⠛⢿⣿⡷')}      ${i18n.t('CMD_TIP.ENTER_DIRECTORY', { key: `${palette.yellow(FIGURES.ARROW_RIGHT)}  / ${palette.yellow('ENTER')}` })}
  ${palette.yellow('⠐⡦')}⣨⣾⢚${palette.yellow('⣷⣿⣿⣿')}⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿${palette.yellow('⣳⣷⡀')}        ${i18n.t('CMD_TIP.RETURN_PARENT', { key: `${palette.yellow(FIGURES.ARROW_LEFT)} ` })}
   ⣱⣿⡃${palette.yellow('⢸⣿⣿⣿⣿')}⣿⣿⣿⣿⣿⣿⣿⣿⠟${palette.yellow('⣱⣿⣿⠃')}        ${i18n.t('CMD_TIP.SWITCH_THEME', { key: palette.yellow('ENTER') })}
⣀⣤⣾⣿⡇ ${palette.yellow('⢸⣿⣿⣿⣿⠟')}⠵⠿⠿⠟⠛⠋${palette.yellow('⠵⠿')}⢿⡿⣃         ${i18n.t('CMD_TIP.EXIT', { key: palette.yellow('CTRL - C') })}
⠻⠛⠛⠿⠇ ⠈⠻⡿⠉
`;
}

export default createPrompt(
    <Value>(config: SearchConfig<Value>, done: (value: Value) => void) => {
        const { pageSize = 7, validate = () => true } = config;
        const theme = makeTheme<SearchTheme>(searchTheme, config.theme);
        const firstRender = useRef(true);
        const [status, setStatus] = useState<Status>('loading');

        const [searchTerm, setSearchTerm] = useState<string>('');
        const [searchResults, setSearchResults] = useState<
            ReadonlyArray<Item<Value>>
        >([]);
        const [searchError, setSearchError] = useState<string>();

        const prefix = usePrefix({ status, theme });

        const bounds = useMemo(() => {
            const first = searchResults.findIndex(isSelectable);
            const last = searchResults.findLastIndex(isSelectable);

            return { first, last };
        }, [searchResults]);

        const [active = bounds.first, setActive] = useState<number>();

        useEffect(() => {
            const controller = new AbortController();

            setStatus('loading');
            setSearchError(undefined);

            const fetchResults = async () => {
                try {
                    const results = await config.source(
                        searchTerm || undefined,
                        {
                            signal: controller.signal,
                        },
                    );

                    if (!controller.signal.aborted) {
                        // Reset the pointer
                        setActive(undefined);
                        setSearchError(undefined);
                        setSearchResults(normalizeChoices(results));
                        setStatus('idle');
                    }
                } catch (error: unknown) {
                    if (!controller.signal.aborted && error instanceof Error) {
                        setSearchError(error.message);
                    }
                }
            };

            void fetchResults();

            return () => {
                controller.abort();
            };
        }, [searchTerm]);

        // Safe to assume the cursor position never points to a Separator.
        const selectedChoice = searchResults[active] as
            | NormalizedChoice<Value>
            | undefined;

        useKeypress(async (key, rl) => {
            if (status !== 'loading' && config.eventKeys?.includes(key.name)) {
                config.subscriber?.(key.name, selectedChoice);
                setSearchTerm(rl.line);
            } else if (isEnterKey(key)) {
                if (selectedChoice) {
                    setStatus('loading');
                    const isValid = await validate(selectedChoice.value);
                    setStatus('idle');

                    if (isValid === true) {
                        setStatus('done');
                        done(selectedChoice.value);
                    } else if (selectedChoice.name === searchTerm) {
                        setSearchError(
                            isValid || 'You must provide a valid value',
                        );
                    } else {
                        // Reset line with new search term
                        rl.write(selectedChoice.name);
                        setSearchTerm(selectedChoice.name);
                    }
                } else {
                    // Reset the readline line value to the previous value. On line event, the value
                    // get cleared, forcing the user to re-enter the value instead of fixing it.
                    rl.write(searchTerm);
                }
            } else if (key.name === 'tab' && selectedChoice) {
                rl.clearLine(0); // Remove the tab character.
                rl.write(selectedChoice.name);
                setSearchTerm(selectedChoice.name);
            } else if (
                status !== 'loading' &&
                (key.name === 'up' || key.name === 'down')
            ) {
                rl.clearLine(0);
                if (
                    (key.name === 'up' && active !== bounds.first) ||
                    (key.name === 'down' && active !== bounds.last)
                ) {
                    const offset = key.name === 'up' ? -1 : 1;
                    let next = active;
                    do {
                        next =
                            (next + offset + searchResults.length) %
                            searchResults.length;
                    } while (!isSelectable(searchResults[next]));
                    setActive(next);
                }
            } else {
                setSearchTerm(rl.line);
            }
        });

        const message = theme.style.message(config.message, status);

        if (active > 0) {
            firstRender.current = false;
        }

        let helpTip = '';
        if (
            searchResults.length > 1 &&
            (theme.helpMode === 'always' ||
                (theme.helpMode === 'auto' && firstRender.current))
        ) {
            helpTip =
                searchResults.length > pageSize
                    ? `\n${theme.style.help('(Use arrow keys to reveal more choices)')}`
                    : `\n${theme.style.help('(Use arrow keys)')}`;
        }

        // TODO: What to do if no results are found? Should we display a message?
        const page = usePagination({
            items: searchResults,
            active,
            renderItem({ item, isActive }) {
                if (Separator.isSeparator(item)) {
                    return ` ${item.separator}`;
                }

                if (item.disabled) {
                    const disabledLabel =
                        typeof item.disabled === 'string'
                            ? item.disabled
                            : '(disabled)';
                    return theme.style.disabled(
                        `${item.prefix}${item.name} ${disabledLabel}`,
                    );
                }

                const color = isActive
                    ? theme.style.highlight
                    : (x: string) => x;
                const cursor = isActive ? theme.icon.cursor : ' ';
                return color(`${cursor} ${item.prefix}${item.name}`);
            },
            pageSize,
            loop: false,
        });

        let error: string | undefined;
        if (searchError) {
            error = theme.style.error(searchError);
        } else if (
            searchResults.length === 0 &&
            searchTerm !== '' &&
            status === 'idle'
        ) {
            error = theme.style.error('No results found');
        }

        if (status === 'done' && selectedChoice) {
            const answer = selectedChoice.short;
            return `${prefix} ${message} ${theme.style.answer(answer)}`;
        }

        const searchStr = theme.style.searchTerm(searchTerm);
        const choiceDescription = selectedChoice?.description
            ? `\n${theme.style.description(selectedChoice.description)}`
            : '';

        return [
            [brandAsciiArt(), '\n', prefix, message, searchStr]
                .filter(Boolean)
                .join(' '),
            `${error ?? page}${helpTip}${choiceDescription}`,
        ];
    },
);
