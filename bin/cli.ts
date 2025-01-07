#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import process from 'node:process';
import updateNotifier from 'update-notifier';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';
import main from '../src';

process.on('SIGINT', () => {
    process.exit(0);
});

const pkg = JSON.parse(
    readFileSync(new URL('../package.json', import.meta.url)).toString('utf8'),
);

updateNotifier({ pkg }).notify({ isGlobal: true });

main(
    yargs(hideBin(process.argv))
        .scriptName('neoconfig')
        .usage('$0 [options]')
        .alias('h', 'help')
        .alias('v', 'version')
        .parseSync(),
)
    .then(() => {
        process.exit(0);
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
