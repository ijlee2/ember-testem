import EmberExamTestLoader from './-private/ember-exam-test-loader.js';
import { patchTestemOutput } from './-private/patch-testem-output.js';

let loaded = false;

export async function loadTests(qunit, options = {}) {
  const { availableModules } = options;

  if (loaded) {
    return;
  }

  loaded = true;

  const dependencies = {
    qunit,
    testem: window.Testem,
  };

  const testLoader = new EmberExamTestLoader(dependencies);

  patchTestemOutput(dependencies, testLoader.urlParams);

  await testLoader.loadModules({ availableModules });
}
