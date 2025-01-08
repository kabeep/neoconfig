export default {
    CMD_NAVIGATE: 'Please select a NeoFetch theme:',
    CMD_SUCCESS: 'Theme {{name}} has been successfully applied.',

    CMD_TIP: {
        MOVE_CURSOR: 'Press {{key}} to move the cursor.',
        ENTER_DIRECTORY: 'Press {{key}} to enter the selected directory.',
        RETURN_PARENT: 'Press {{key}} to return to the parent directory.',
        SWITCH_THEME: 'Press {{key}} to switch themes.',
        EXIT: 'Press {{key}} to exit the interaction.',
    },

    CMD_ERR: {
        DEFAULT: 'Oops! An error occurred. If the issue persists, please report it at https://github.com/kabeep/neofetch-configurator/issues.',
        ENSURE: 'Failed to create the "themes" directory: {{reason}}.',
        CANCEL: 'Operation canceled by the user.',
        TRASH: 'Unable to clean up old theme files in the directory: {{path}}.',
        COPY: 'Failed to copy theme files: {{reason}}.',
        ENOTDIR: 'The specified path is not a directory: {{path}}.',
        E_NOT_FILE: 'The specified path is not a file: {{path}}.',
        ENOENT_FILE: 'The file does not exist: {{path}}.',
        ENOENT_CONF: 'The theme file does not exist: {{path}}.',
        ENOENT_DIR: 'The directory does not exist: {{path}}.',
        EACCES_R_DIR: 'The directory is not readable: {{path}}.',
        EACCES_W_DIR: 'The directory is not writable: {{path}}.',
        E_EMPTY_DIR: 'No available themes were found in the directory: {{path}}.',
    },
};
