import { setApplication } from '@ember/test-helpers';
import { setupEmberOnerrorValidation, start } from 'ember-qunit';
import { loadTests } from 'ember-testem';
import Application from 'my-v1-app/app';
import config from 'my-v1-app/config/environment';
import QUnit from 'qunit';
import { setup } from 'qunit-dom';
import { restore } from 'sinon';

setApplication(Application.create(config.APP));

setup(QUnit.assert);
setupEmberOnerrorValidation();
loadTests(QUnit);
start({
  // @ts-expect-error: Incorrect type
  loadTests: false,
});

QUnit.testDone(function () {
  restore();
});
