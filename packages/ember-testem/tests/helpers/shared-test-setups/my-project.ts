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
    testModule: undefined,
  },
  server: undefined,
};

const options: Options = {
  buildPath: 'dist',
  parallelization: {
    partition: undefined,
    split: undefined,
  },
  launchBrowser: false,
  port: 0,
  projectRoot: 'tmp/my-project',
  qunit: {
    filter: undefined,
    testModule: undefined,
  },
};

export { codemodOptions, options };
