function createPalette(open: number, close: number) {
    return (text: string) => `\u001B[${open}m${text}\u001B[${close}m`;
}

const palette = Object.assign(
    (open: number, close: number) => createPalette(open, close),
    {
        dim: createPalette(2, 22),
        black: createPalette(30, 39),
        red: createPalette(31, 39),
        green: createPalette(32, 39),
        yellow: createPalette(33, 39),
        blue: createPalette(34, 39),
        magenta: createPalette(35, 39),
        cyan: createPalette(36, 39),
        white: createPalette(37, 39),
        grey: createPalette(90, 39),
    },
);

export default palette;
