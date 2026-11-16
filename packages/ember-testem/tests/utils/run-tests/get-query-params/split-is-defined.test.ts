import { assert, test } from '@codemod-utils/tests';

import { getQueryParams } from '../../../../src/utils/run-tests/get-query-params.js';

test('utils | run-tests | get-query-params > split is defined', function () {
  const queryParams = getQueryParams({
    parallelization: {
      partition: undefined,
      split: 4,
    },
    qunit: {
      filter: undefined,
      module: undefined,
      seed: undefined,
    },
  });

  assert.strictEqual(queryParams, 'split=4');
});
