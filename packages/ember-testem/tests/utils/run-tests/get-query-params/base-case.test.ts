import { assert, test } from '@codemod-utils/tests';

import { getQueryParams } from '../../../../src/utils/run-tests/get-query-params.js';

test('utils | run-tests | get-query-params > base case', function () {
  const queryParams = getQueryParams({
    parallelization: {
      partition: undefined,
      split: undefined,
    },
    qunit: {
      filter: undefined,
      testModule: undefined,
    },
  });

  assert.strictEqual(queryParams, '');
});
