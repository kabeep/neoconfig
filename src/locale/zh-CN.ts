export default {
    CMD_NAVIGATE: '请选择一个 NeoFetch 主题:',
    CMD_SUCCESS: '主题 {{name}} 已成功应用',

    CMD_TIP: {
        MOVE_CURSOR: '按 {{key}} 移动光标',
        ENTER_DIRECTORY: '按 {{key}} 进入选定目录',
        RETURN_PARENT: '按 {{key}} 返回上级目录',
        SWITCH_THEME: '按 {{key}} 切换主题',
        EXIT: '按 {{key}} 退出交互',
    },

    CMD_ERR: {
        DEFAULT: '意外错误! 若问题仍然存在, 请提交至 https://github.com/kabeep/neofetch-configurator/issues 获取帮助',
        ENSURE: '无法新建 themes 目录: {{reason}}',
        CANCEL: '用户主动取消',
        TRASH: '无法清理目录中旧的主题文件: {{path}}',
        COPY: '无法复制主题文件: {{reason}}',
        ENOTDIR: '路径指向的不是一个目录: {{path}}',
        E_NOT_FILE: '路径指向的不是一个文件: {{path}}',
        ENOENT_FILE: '文件不存在: {{path}}',
        ENOENT_CONF: '主题文件不存在: {{path}}',
        ENOENT_DIR: '目录不存在: {{path}}',
        EACCES_R_DIR: '目录无可读权限: {{path}}',
        EACCES_W_DIR: '目录无可写权限: {{path}}',
        E_EMPTY_DIR: '未检查到可用主题: {{path}}',
    },
};
