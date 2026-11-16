import { assert, test } from '@codemod-utils/tests';

import { getQueryParams } from '../../../../src/utils/run-tests/get-query-params.js';

test('utils | run-tests | get-query-params > filter is defined', function () {
  const queryParams = getQueryParams({
    parallelization: {
      partition: undefined,
      split: undefined,
    },
    qunit: {
      filter: 'Integration |',
      module: undefined,
      seed: undefined,
    },
  });

  assert.strictEqual(queryParams, 'filter=Integration |');
});
