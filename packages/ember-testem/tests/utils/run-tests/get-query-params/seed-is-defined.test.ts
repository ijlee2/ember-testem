import { assert, test } from '@codemod-utils/tests';

import { getQueryParams } from '../../../../src/utils/run-tests/get-query-params.js';

test('utils | run-tests | get-query-params > seed is defined', function () {
  const queryParams = getQueryParams({
    parallelization: {
      partition: undefined,
      split: undefined,
    },
    qunit: {
      filter: undefined,
      module: undefined,
      seed: 'gflqlwrm59j',
    },
  });

  assert.strictEqual(queryParams, 'seed=gflqlwrm59j');
});
