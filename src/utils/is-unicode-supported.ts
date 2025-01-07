import process from 'node:process';

function isUnicodeSupported(strict?: boolean) {
    const { env } = process;
    const { TERM, TERM_PROGRAM } = env;

    if (process.platform !== 'win32') return TERM !== 'linux'; // Linux console (kernel)

    if (
        strict &&
        // See https://github.com/xtermjs/xterm.js/issues/2693
        (TERM_PROGRAM === 'vscode' || TERM_PROGRAM === 'Hyper') &&
        TERM === 'xterm-256color'
    )
        return false;

    return (
        Boolean(env.WT_SESSION) || // Windows Terminal
        Boolean(env.TERMINUS_SUBLIME) || // Terminus (<0.2.27)
        env.ConEmuTask === '{cmd::Cmder}' || // ConEmu and cmder
        TERM_PROGRAM === 'Terminus-Sublime' ||
        TERM === 'xterm-256color' ||
        TERM === 'alacritty' ||
        TERM === 'rxvt-unicode' ||
        TERM === 'rxvt-unicode-256color' ||
        env.TERMINAL_EMULATOR === 'JetBrains-JediTerm'
    );
}

export default isUnicodeSupported;
