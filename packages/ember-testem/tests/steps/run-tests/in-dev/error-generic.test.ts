import { normalize } from 'node:path';

import { assert, test } from '@codemod-utils/tests';
import { stub } from 'sinon';

import { runTests } from '../../../../src/steps/index.js';
import { options } from '../../../helpers/shared-test-setups/my-project.js';
import { restoreMethods, stubMethods } from '../../../helpers/stub.js';

test('steps | run-tests | run-tests-in-dev > error (generic)', async function () {
  const stubs = stubMethods();

  stubs.chokidarWatch.returns({ on: stub() });
  stubs.testemStartCI.yields(0);
  stubs.testemStartDev.yields(0, new Error('Some error'));

  await runTests({
    ...options,
    launchBrowser: true,
  });

  assert.strictEqual(stubs.chokidarWatch.calledOnce, true);
  assert.strictEqual(stubs.consoleError.calledOnce, true);
  assert.strictEqual(stubs.testemRestart.notCalled, true);
  assert.strictEqual(stubs.testemSetDefaultOptions.calledOnce, true);
  assert.strictEqual(stubs.testemStartCI.notCalled, true);
  assert.strictEqual(stubs.testemStartDev.calledOnce, true);

  assert.strictEqual(stubs.consoleError.args[0]?.[0], 'Some error');

  assert.deepStrictEqual(stubs.testemSetDefaultOptions.args[0]?.[0], {
    config_dir: 'tmp/my-project',
    cwd: normalize('tmp/my-project/dist'),
    launch: false,
    port: 0,
    query_params: '',
  });

  assert.deepStrictEqual(stubs.testemStartDev.args[0]?.[0], {
    launch: false,
    port: 0,
  });

  restoreMethods();
});
