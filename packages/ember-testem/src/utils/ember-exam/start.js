import { start as qunitStart } from 'ember-qunit';

import EmberExamTestLoader from './-private/ember-exam-test-loader.js';
import { patchTestemOutput } from './-private/patch-testem-output.js';

let loaded = false;

/**
 * Ember-exam's own start function to set up EmberExamTestLoader, load tests and calls start() from
 * ember-qunit
 *
 * @function start
 * @param {*} qunitOptions
 */
export async function start(qunit, qunitOptions = {}) {
  const { availableModules, ...modifiedOptions } = qunitOptions;

  modifiedOptions.loadTests = false;

  if (loaded) {
    return;
  }

  loaded = true;

  const testLoader = new EmberExamTestLoader(window.Testem);

  if (window.Testem) {
    patchTestemOutput(testLoader.urlParams, qunit);
  }

  await testLoader.loadModules({ availableModules });

  qunitStart(modifiedOptions);
}
