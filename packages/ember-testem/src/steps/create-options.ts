import type { CodemodOptions, Options } from '../types/index.js';

export function createOptions(codemodOptions: CodemodOptions): Options {
  const { buildPath, parallelization, port, projectRoot, qunit, server } =
    codemodOptions;

  return {
    buildPath,
    launchBrowser: Boolean(server),
    parallelization,
    port,
    projectRoot,
    qunit,
  };
}
