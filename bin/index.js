#!/usr/bin/env node

'use strict';

const program = require('commander');
const packageInfo = require('../package.json');

program.version(packageInfo.version);

program
  .command('init')
  .description('初始化一个项目')
  .alias('i')
  .action(() => {
    require('../lib/init.js')();
  });

program.parse(process.argv);

if (!program.args.length) {
  program.help();
}
