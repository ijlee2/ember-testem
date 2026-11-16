import { setApplication } from '@ember/test-helpers';
import Application from 'dummy/app';
import config from 'dummy/config/environment';
// @ts-expect-error: Incorrect type
import { start as startEmberExam } from 'ember-exam/test-support';
import { setupEmberOnerrorValidation } from 'ember-qunit';
import QUnit from 'qunit';
import { setup } from 'qunit-dom';

setApplication(Application.create(config.APP));
setup(QUnit.assert);
setupEmberOnerrorValidation();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
startEmberExam();
