import { assert, test } from '@codemod-utils/tests';

import { getQueryParams } from '../../../../src/utils/run-tests/get-query-params.js';

test('utils | run-tests | get-query-params > filter and module are defined', function () {
  const queryParams = getQueryParams({
    parallelization: {
      partition: undefined,
      split: undefined,
    },
    qunit: {
      filter: 'we can pass',
      testModule: 'Integration | Component | ui/form/input',
    },
  });

  assert.strictEqual(
    queryParams,
    'module=Integration | Component | ui/form/input&filter=we can pass',
  );
});
