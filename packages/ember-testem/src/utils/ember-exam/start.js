import { start as qunitStart } from 'ember-qunit';

import { loadEmberExam } from './load.js';

/**
 * Equivalent to ember-qunit's loadTest() except this does not create a new TestLoader instance
 *
 * @function loadTests
 * @param {*} testLoader
 * @param {*} loaderOptions
 */
async function loadTests(testLoader, loaderOptions = {}) {
  if (testLoader === undefined) {
    throw new Error(
      'A testLoader instance has not been created. You must call `loadEmberExam()` before calling `loadTest()`.',
    );
  }

  await testLoader.loadModules(loaderOptions);
}

/**
 * Ember-exam's own start function to set up EmberExamTestLoader, load tests and calls start() from
 * ember-qunit
 *
 * @function start
 * @param {*} qunitOptions
 */
export async function start(qunit, qunitOptions = {}) {
  const { availableModules, ...modifiedOptions } =
    qunitOptions || Object.create(null);

  modifiedOptions.loadTests = false;

  const testLoader = loadEmberExam(qunit);

  await loadTests(testLoader, { availableModules });

  qunitStart(modifiedOptions);
}
