import type { CodemodOptions, Options } from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  buildPath: 'dist',
  parallelization: {
    partition: undefined,
    split: undefined,
  },
  port: 0,
  projectRoot: 'tmp/my-project',
  qunit: {
    filter: undefined,
    module: undefined,
    random: undefined,
  },
  server: undefined,
};

const options: Options = {
  buildPath: 'dist',
  launchBrowser: false,
  parallelization: {
    partition: undefined,
    split: undefined,
  },
  port: 0,
  projectRoot: 'tmp/my-project',
  qunit: {
    filter: undefined,
    module: undefined,
    seed: undefined,
  },
};

export { codemodOptions, options };
