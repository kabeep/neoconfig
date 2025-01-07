import { osLocaleSync } from 'os-locale';
import enUS from './en-US';
import zhCN from './zh-CN';

function getLocale() {
    const localeAbbr = osLocaleSync().split('-')[0];

    switch (localeAbbr) {
        case 'zh': {
            return zhCN;
        }

        default: {
            return enUS;
        }
    }
}

const locale = { ...enUS, ...getLocale() };

export default locale;
