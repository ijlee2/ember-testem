#!/usr/bin/env node
'use strict';

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { run } from '../src/run.js';
import type { CodemodOptions } from '../src/types/index.js';

// Provide a title to the process in `ps`
process.title = 'ember-test';

// Set codemod options
const argv = yargs(hideBin(process.argv))
  .option('filter', {
    alias: 'f',
    describe: 'Specify a keyword for which modules and tests to run',
    type: 'string',
  })
  .option('module', {
    alias: 'm',
    describe: 'Specify the name of a module to run',
    type: 'string',
  })
  .option('partition', {
    describe: 'Which partition to run (one-indexed)',
    type: 'number',
  })
  .option('path', {
    default: 'dist',
    describe: 'Relative path to the test build',
    type: 'string',
  })
  .option('port', {
    describe:
      'Port for running tests. Pass 0 to automatically pick an available port.',
    type: 'number',
  })
  .option('root', {
    describe: 'Project root',
    type: 'string',
  })
  .option('server', {
    alias: 's',
    describe: 'Launch test browser',
    type: 'boolean',
  })
  .option('split', {
    describe: 'How many partitions to split tests into',
    type: 'number',
  })
  .option('test-port', {
    describe:
      'Port for running tests. Pass 0 to automatically pick an available port.',
    type: 'number',
  })
  .deprecateOption('test-port', 'Use --port instead.')
  .parseSync();

const codemodOptions: CodemodOptions = {
  buildPath: argv['path'],
  parallelization: {
    partition: argv['partition'],
    split: argv['split'],
  },
  port: argv['test-port'] ?? argv['port'],
  projectRoot: argv['root'] ?? process.cwd(),
  qunit: {
    filter: argv['filter'],
    testModule: argv['module'],
  },
  server: argv['server'],
};

void run(codemodOptions);
