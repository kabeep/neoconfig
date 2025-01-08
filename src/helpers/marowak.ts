import { FIGURES } from '../constants';
import { i18n, palette } from '../utils';

function marowak() {
    return `
     ⠐⢷⣦⣄⣀⢀⣀⣀⣤⣤⣤⣀⣀⠀⣀⣤⣶⡶
      ⠈⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏          ${palette.cyan('_   _             ____             __ _')}
       ⢰⣿⣿⣿⣿⣿⣿⡟${palette.yellow('⠉⣉')}⡺⣿⣿⣧⡀         ${palette.cyan('| \\ | | ___  ___  / ___|___  _ __  / _(_) __ _')}
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

export default marowak;
