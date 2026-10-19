import { join } from 'node:path';

import Testem from 'testem';

import type { Options } from '../../types/index.js';
import { getQueryParams } from '../../utils/run-tests/get-query-params.js';

export async function runTestsInCI(options: Options): Promise<void> {
  const { buildPath, port, projectRoot } = options;

  const testemInstance = new Testem();

  const startOptions = {
    launch: false,
    port,
  };

  testemInstance.setDefaultOptions({
    ...startOptions,
    config_dir: projectRoot,
    cwd: join(projectRoot, buildPath),
    parallel: 4,
    query_params: getQueryParams(options),
    test_page: [
      'tests/index.html?hidepassed&nolint&split=4&partition=1',
      'tests/index.html?hidepassed&nolint&split=4&partition=2',
      'tests/index.html?hidepassed&nolint&split=4&partition=3',
      'tests/index.html?hidepassed&nolint&split=4&partition=4',
    ],
  });

  return new Promise((resolve, reject) => {
    testemInstance.startCI(startOptions, (exitCode, error) => {
      if (error) {
        reject(error);
      } else if (exitCode !== 0) {
        reject(
          new Error(`testem finished with the non-zero exit code ${exitCode}`),
        );
      } else {
        resolve();
      }
    });
  });
}
