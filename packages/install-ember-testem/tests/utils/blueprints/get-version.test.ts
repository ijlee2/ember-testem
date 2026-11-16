import { assert, test } from '@codemod-utils/tests';

import { getLatestVersion } from '../../../src/utils/blueprints.js';

test('utils | blueprints | get-version', function () {
  assert.strictEqual(getLatestVersion('ember-testem'), '^1.0.0');
});
