import EmberExamTestLoader from './-private/ember-exam-test-loader.js';
import { patchTestemOutput } from './-private/patch-testem-output.js';

let loaded = false;

/**
 * Setup EmberExamTestLoader to enable ember exam functionalities
 *
 * @function loadEmberExam
 * @return {*} testLoader
 */
export function loadEmberExam(qunit) {
  if (loaded) {
    console.warn('Attempted to load Ember Exam more than once.');
    return;
  }

  loaded = true;

  const testLoader = new EmberExamTestLoader(window.Testem);

  if (window.Testem) {
    patchTestemOutput(testLoader.urlParams, qunit);
  }

  return testLoader;
}
