import { homedir } from 'node:os';
import { join } from 'node:path';
import { isUnicodeSupported } from '../utils';

export const HOME_DIR = homedir();
export const CONFIG_DIR = join(HOME_DIR, '.config/neofetch');
export const THEME_DIR = join(CONFIG_DIR, 'themes');

export const FIGURES = isUnicodeSupported()
    ? {
          POINT: '❯',
          ARROW_LEFT: '',
          ARROW_RIGHT: '',
          ARROW_TOP: '',
          ARROW_BOTTOM: '',

          CONF: '',
          CONF_DIR: '',
          FILL_DIR: '',
          EMPTY_DIR: '',
          EACCES_DIR: '',
      }
    : {
          POINT: '>',
          ARROW_LEFT: '◄',
          ARROW_RIGHT: '►',
          ARROW_TOP: '▲',
          ARROW_BOTTOM: '▼',

          CONF: '{}',
          CONF_DIR: '[]',
          FILL_DIR: '=>',
          EMPTY_DIR: '=?',
          EACCES_DIR: '=x',
      };
