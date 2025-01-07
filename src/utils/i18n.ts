import locale from '../locale';

type LocaleDictionary = {
    [key: string]: string | LocaleDictionary;
};

class I18n {
    private static instance: I18n;
    private dictionary: LocaleDictionary = {};

    private constructor() {}

    public static getInstance(): I18n {
        if (!I18n.instance) {
            I18n.instance = new I18n();
        }
        return I18n.instance;
    }

    private static escapeHtml(value: string): string {
        return value.replace(
            /[&<>"']/g,
            (char) =>
                ({
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                    '"': '&quot;',
                    "'": '&#39;',
                })[char] || char,
        );
    }

    public load(locale: LocaleDictionary): void {
        this.dictionary = locale;
    }

    public t(
        path: string,
        variables?: Record<string, string>,
        defaultValue?: string,
    ): string {
        const value = this.get(this.dictionary, path);

        if (typeof value === 'object')
            return this.t(`${path}.DEFAULT`, variables, defaultValue);

        return typeof value === 'string'
            ? this.compiled(value, variables)
            : defaultValue || path;
    }

    private get(
        obj: Record<string, unknown>,
        path: string,
    ): LocaleDictionary[string] | undefined {
        return path.split('.').reduce<LocaleDictionary[string] | undefined>(
            (acc, key) => {
                if (acc && typeof acc === 'object' && key in acc) {
                    return (acc as Record<string, unknown>)[
                        key
                    ] as LocaleDictionary[string];
                }
                return undefined;
            },
            obj as unknown as LocaleDictionary[string],
        );
    }

    private compiled(
        value: string,
        variables?: Record<string, string>,
    ): string {
        if (variables) {
            return value.replace(/{{\s*(\w+)\s*}}/g, (_, key) =>
                I18n.escapeHtml(variables[key] || ''),
            );
        }
        return value;
    }
}

const i18n = I18n.getInstance();

i18n.load(locale);

export default i18n;
