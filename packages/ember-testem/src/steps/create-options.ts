import type { CodemodOptions, Options } from '../types/index.js';
import { createSeed } from '../utils/create-options/create-seed.js';

export function createOptions(codemodOptions: CodemodOptions): Options {
  const { buildPath, parallelization, port, projectRoot, qunit, server } =
    codemodOptions;

  return {
    buildPath,
    launchBrowser: Boolean(server),
    parallelization,
    port,
    projectRoot,
    qunit: {
      filter: qunit.filter,
      module: qunit.module,
      seed: createSeed(qunit.random),
    },
  };
}
