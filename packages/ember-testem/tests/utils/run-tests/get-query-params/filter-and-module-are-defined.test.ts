import { assert, test } from '@codemod-utils/tests';

import { getQueryParams } from '../../../../src/utils/run-tests/get-query-params.js';

test('utils | run-tests | get-query-params > filter and module are defined', function () {
  const queryParams = getQueryParams({
    qunit: {
      filter: 'we can pass',
      module: 'Integration | Component | ui/form/input',
      seed: undefined,
    },
  });

  assert.strictEqual(
    queryParams,
    'filter=we can pass&module=Integration | Component | ui/form/input',
  );
});
