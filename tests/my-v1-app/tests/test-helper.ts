import { setApplication } from '@ember/test-helpers';
// @ts-expect-error: Incorrect type
import { start as startEmberExam } from 'ember-exam/test-support';
import { setupEmberOnerrorValidation } from 'ember-qunit';
import Application from 'my-v1-app/app';
import config from 'my-v1-app/config/environment';
import QUnit from 'qunit';
import { setup } from 'qunit-dom';
import { restore } from 'sinon';

setApplication(Application.create(config.APP));

setup(QUnit.assert);
setupEmberOnerrorValidation();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
startEmberExam();

QUnit.testDone(function () {
  restore();
});
