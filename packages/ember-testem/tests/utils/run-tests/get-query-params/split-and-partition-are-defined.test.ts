import { assert, test } from '@codemod-utils/tests';

import { getQueryParams } from '../../../../src/utils/run-tests/get-query-params.js';

test('utils | run-tests | get-query-params > split and partition are defined', function () {
  const queryParams = getQueryParams({
    parallelization: {
      partition: 1,
      split: 4,
    },
    qunit: {
      filter: undefined,
      module: undefined,
      seed: undefined,
    },
  });

  assert.strictEqual(queryParams, 'partition=1&split=4');
});
