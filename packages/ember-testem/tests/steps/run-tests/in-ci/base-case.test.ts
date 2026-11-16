import { normalize } from 'node:path';

import { assert, test } from '@codemod-utils/tests';

import { runTests } from '../../../../src/steps/index.js';
import { options } from '../../../helpers/shared-test-setups/my-project.js';
import { restoreMethods, stubMethods } from '../../../helpers/stub.js';

test('steps | run-tests | run-tests-in-ci > base case', async function () {
  const stubs = stubMethods();

  stubs.testemStartCI.yields(0);
  stubs.testemStartDev.yields(0);

  await runTests({
    ...options,
    launchBrowser: false,
  });

  assert.strictEqual(stubs.chokidarWatch.notCalled, true);
  assert.strictEqual(stubs.consoleError.notCalled, true);
  assert.strictEqual(stubs.testemRestart.notCalled, true);
  assert.strictEqual(stubs.testemSetDefaultOptions.calledOnce, true);
  assert.strictEqual(stubs.testemStartCI.calledOnce, true);
  assert.strictEqual(stubs.testemStartDev.notCalled, true);

  assert.deepStrictEqual(stubs.testemSetDefaultOptions.args[0]?.[0], {
    config_dir: 'tmp/my-project',
    cwd: normalize('tmp/my-project/dist'),
    launch: false,
    parallel: 1,
    port: 0,
    query_params: '',
  });

  assert.deepStrictEqual(stubs.testemStartCI.args[0]?.[0], {
    launch: false,
    port: 0,
  });

  restoreMethods();
});
