import { setApplication } from '@ember/test-helpers';
import {
  type EmberExamStartOptions,
  start as startEmberExam,
  // @ts-expect-error: Incorrect type
} from 'ember-exam/test-support';
import { setupEmberOnerrorValidation } from 'ember-qunit';
import Application from 'my-v2-app/app';
import config from 'my-v2-app/config/environment';
import QUnit from 'qunit';
import { setup } from 'qunit-dom';
import { restore } from 'sinon';

QUnit.config.urlConfig.push({
  id: 'mirageLogging',
  label: 'Mirage logging',
});

export interface ExtendedQUnitConfig extends Config {
  mirageLogging: boolean;
}

export async function start(options: EmberExamStartOptions): Promise<void> {
  setApplication(Application.create(config.APP));

  setup(QUnit.assert);
  setupEmberOnerrorValidation();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  await startEmberExam(options);

  QUnit.testDone(function () {
    restore();
  });
}
