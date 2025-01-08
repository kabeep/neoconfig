<div align="center">

<h1>NeoConfig</h1>

A Node.js CLI for the `NeoFetch` configuration file manager.

[![NodeJS][node-image]][node-url]
[![Install Size][install-size-image]][install-size-url]
[![NPM][npm-image]][npm-url]
[![code style][code-style-image]][code-style-url]
[![License][license-image]][license-url]

English | [简体中文][zh-cn-url]

<img width="814" src="docs/images/usage.gif" alt="usage-gif">

</div>

## 📖 Introduction

> [!TIP]
>
> By default, the themes directory is empty. You can add your custom configuration files or use configurations shared by
> the open-source community (see the "Related Repositories" section below).

Easily switch between custom NeoFetch themes from the command line, enabling quick transitions between presets for
screen recording and presentation scenarios.

## ⚙️ Prerequisites

***\> Install [NeoFetch][neofetch-url]. Without it, this package serves no purpose.***

1. NPM ([Node.js][node-url])
    ```bash
    npm i -g neofetch
    ```

2. Windows
    ```bash
    scoop i -g neofetch
    ```

3. MacOS
    ```bash
    brew i -g neofetch
    ```

***\> Use a terminal that supports Unicode Symbols for the best experience with `NeoFetch` and `NeoConfig`.***

> Many terminals, such as zsh, CMD, PowerShell, and JetBrains, support such fonts natively, so this step may be
> optional.

Some terminals have limited or no support, especially those based on `xterm-256color`, like `Microsoft/VSCode` or
`Vercel/Hyper`.
See https://github.com/xtermjs/xterm.js/issues/2693 for details.

In such cases, you'll need to download a compatible font. We recommend [Nerd Symbols Font][nerd-url], which is widely
used in command-line applications.

After downloading the font, configure your terminal accordingly. For example, on Windows 11 and Hyper:

Install the font via `Settings` > `Personalization` > `Fonts`.
Add the font name to the `fontFamily` setting in `Hyper`'s configuration file.
The same applies to editors like `Sublime Text` and `VSCode`.

## 📦 Installation

```bash
npm install --global @kabeep/neoconfig
```

```bash
yarn add --global @kabeep/neoconfig
```

```bash
pnpm add --global @kabeep/neoconfig
```

## 🚀 Usage

#### \$ Show help_

```bash
neoconfig -h
```

```
neoconfig [options]

Options:
  -h, --help     Show help                                             [boolean]
  -v, --version  Show version number                                   [boolean]
```

#### \$ Interactive configuration_

```bash
neoconfig
```

```
? Please select a neofetch theme.
❯ ⚙️ default.conf
  📁 large
  📁 small
  📁 termux
(Use arrow keys)
------------------
Press ▲  / ▼  to move the cursor.
Press ► / ENTER to enter the selected directory.
Press ◄ to return to the parent directory.
Press ENTER to switch themes.
Press CTRL - C to exit the interaction.
```

#### $ See more_

[![asciicast][asciinema-image]][asciinema-url]

## 📄 Supported directory structure

```
~/.config/neofetch               # Root directory
├── config.conf                  # Current configuration file
└── themes                       # Fixed themes directory
    ├── default.conf             # Single configuration file
    └── large                    # Grouped configurations (no restriction on directory names or nesting depth)
        ├── myTheme1             # Custom configuration
        │   ├── ascii.txt        # ASCII art file
        │   └── config.conf      # Configuration file
        └── myTheme2             # Nested custom configuration
            ├── config.conf      # Configuration file
            └── assets           # Assets referenced by configuration (no restriction on directory names or nesting depth)
                └── ascii.txt    # ASCII art file
```

## 🌐 i18n

| Language Name      | Native Name | ISO-639-1 | ISO-3166-1 (Alpha-2) | Locale File                  |
|:-------------------|:-----------:|:---------:|:--------------------:|:-----------------------------|
| English            |      -      |    en     |          US          | [en-US.ts][locale-en-us-url] |
| Chinese Simplified |    简体中文     |    zh     |          CN          | [zh-CN.ts][locale-zh-cn-url] |

## 🔗 Related

- [neofetch-themes][neofetch-themes-url] - Neofetch configs put into a convinient repository.
- [NeoCat][neocat-url] - NeoFetch Theme Pack.

## 🤝 Contribution

Contributions via Pull Requests or [Issues][issues-url] are welcome.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE][license-url] file for details.


[node-image]: https://img.shields.io/node/v/%40kabeep%2Fneoconfig?color=lightseagreen
[node-url]: https://nodejs.org/

[npm-image]: https://img.shields.io/npm/d18m/%40kabeep%2Fneoconfig?color=fa6673
[npm-url]: https://www.npmjs.com/package/@kabeep/neoconfig

[install-size-image]: https://packagephobia.com/badge?p=@kabeep/neoconfig
[install-size-url]: https://packagephobia.com/result?p=@kabeep/neoconfig

[code-style-image]: https://img.shields.io/badge/Formatted_with-Biome-cornflowerblue?style=flat&logo=biome
[code-style-url]: https://biomejs.dev/

[asciinema-image]: https://asciinema.org/a/697466.svg
[asciinema-url]: https://asciinema.org/a/697466

[license-image]: https://img.shields.io/github/license/kabeep/neoconfig?color=slateblue
[license-url]: LICENSE

[en-us-url]: README.md
[zh-cn-url]: README.zh-CN.md

[locale-en-us-url]: src/locale/en-US.ts
[locale-zh-cn-url]: src/locale/zh-CN.ts

[neofetch-url]: https://github.com/dylanaraps/neofetch
[nerd-url]: https://www.nerdfonts.com/font-downloads
[neofetch-themes-url]: https://github.com/Chick2D/neofetch-themes
[neocat-url]: https://github.com/m3tozz/NeoCat

[issues-url]: https://github.com/kabeep/neoconfig/issues
