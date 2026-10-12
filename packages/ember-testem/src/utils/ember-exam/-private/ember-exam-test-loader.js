/* globals requirejs, require */
import AsyncIterator from './async-iterator.js';
import { filterTestModules } from './filter-test-modules.js';
import getUrlParams from './get-url-params.js';
import splitTestModules from './split-test-modules.js';
import weightTestModules from './weight-test-modules.js';

let moduleLoadFailures = [];

/**
 * EmberExamQUnitTestLoader allows delayed requiring of test modules to enable test load balancing
 * It extends ember-qunit/test-loader used by `ember test`, since it overrides moduleLoadFailure()
 * to log a test failure when a module fails to load
 * @class EmberExamQUnitTestLoader
 * @extends {TestLoader}
 */
export default class EmberExamTestLoader {
  get urlParams() {
    return this._urlParams;
  }

  constructor(dependencies) {
    this._didLogMissingUnsee = false;
    this._testModules = [];
    this._testem = dependencies.testem;
    this._qunit = dependencies.qunit;
    this._urlParams = getUrlParams();

    this._qunit.done(function () {
      let length = moduleLoadFailures.length;

      try {
        if (length === 0) {
          // do nothing
        } else if (length === 1) {
          throw moduleLoadFailures[0];
        } else {
          throw new Error('\n' + moduleLoadFailures.join('\n'));
        }
      } finally {
        // ensure we release previously captured errors.
        moduleLoadFailures = [];
      }
    });
  }

  listModules() {
    return Object.keys(requirejs.entries);
  }

  listTestModules() {
    let moduleNames = this.listModules();
    let testModules = [];
    let moduleName;

    for (let i = 0; i < moduleNames.length; i++) {
      moduleName = moduleNames[i];

      if (this.shouldLoadModule(moduleName)) {
        testModules.push(moduleName);
      }
    }

    return testModules;
  }

  /**
   * Allow loading one module at a time.
   *
   * @method loadIndividualModule
   * @param {string} moduleName
   */
  async loadIndividualModule(moduleName) {
    if (moduleName === undefined) {
      throw new Error(
        'Failed to load a test module. `moduleName` is undefined in `loadIndividualModule`.',
      );
    }

    if (this._modules) {
      let loader = this._modules[moduleName];

      /**
       * If it's not a function, it's already loaded
       */
      if (typeof loader === 'function') {
        await loader();
      }

      return;
    }

    this.requireSuper(moduleName);
    this.unseeSuper(moduleName);
  }

  /**
   * Loads the test modules depending on the urlParam
   *
   * @method loadModules
   */
  async loadModules(modules) {
    const loadBalance = this._urlParams.get('loadBalance');
    const browserId = this._urlParams.get('browser');
    const modulePath = this._urlParams.get('modulePath');
    const filePath = this._urlParams.get('filePath');
    let partitions = this._urlParams.get('partition');
    let split = parseInt(this._urlParams.get('split'), 10);

    split = isNaN(split) ? 1 : split;

    if (partitions === undefined) {
      partitions = [1];
    } else if (!Array.isArray(partitions)) {
      partitions = [partitions];
    }

    if (modules === undefined) {
      let testModules = this.listTestModules();
      let testModule;

      for (let i = 0; i < testModules.length; i++) {
        testModule = testModules[i];
        this.require(testModule);
        this.unsee(testModule);
      }
    } else {
      this._modules = modules;
      this._testModules = Object.keys(modules);
    }

    this.setupModuleMetadataHandler();

    if (modulePath || filePath) {
      this._testModules = filterTestModules(
        this._testModules,
        modulePath,
        filePath,
      );
    }

    if (loadBalance && this._testem) {
      this.setupLoadBalanceHandlers();
      this._testModules = splitTestModules(
        weightTestModules(this._testModules),
        split,
        partitions,
      );

      this._testem.emit(
        'testem:set-modules-queue',
        this._testModules,
        browserId,
      );
    } else {
      this._testModules = splitTestModules(
        this._testModules,
        split,
        partitions,
      );

      if (this._modules) {
        await Promise.all(
          this._testModules.map(async (moduleName) => {
            let loader = this._modules[moduleName];

            /**
             * If it's not a function, it's already loaded
             */
            if (typeof loader === 'function') {
              await loader();
            }
          }),
        );

        return;
      }

      /**
       * Legacy support
       */
      this._testModules.forEach((moduleName) => {
        this.requireSuper(moduleName);
        this.unseeSuper(moduleName);
      });
    }
  }

  moduleLoadFailure(moduleName, error) {
    moduleLoadFailures.push(error);

    this._qunit.module('TestLoader Failures');
    this._qunit.test(moduleName + ': could not be loaded', function () {
      throw error;
    });
  }

  /**
   * require() collects the full list of modules before requiring each module with
   * requireSuper(), instead of requiring and unseeing a module when each gets loaded.
   *
   * @method require
   * @param {string} moduleName
   */
  require(moduleName) {
    this._testModules.push(moduleName);
  }

  requireSuper(moduleName) {
    try {
      require(moduleName);
    } catch (e) {
      this.moduleLoadFailure(moduleName, e);
    }
  }

  /**
   * setupLoadBalanceHandlers() registers QUnit callbacks needed for the load-balance option.
   *
   * @method setupLoadBalanceHandlers
   */
  setupLoadBalanceHandlers() {
    // nextModuleAsyncIterator handles the async testem events
    // it returns an element of {value: <moduleName>, done: boolean}
    const nextModuleAsyncIterator = new AsyncIterator(this._testem, {
      request: 'testem:next-module-request',
      response: 'testem:next-module-response',
      timeout: this._urlParams.get('asyncTimeout'),
      browserId: this._urlParams.get('browser'),
      emberExamExitOnError: this._urlParams.get('_emberExamExitOnError'),
    });

    const nextModuleHandler = () => {
      // if there are already tests queued up, don't request next module
      // this is possible if a test file has multiple qunit modules
      if (this._qunit.config.queue.length > 0) {
        return;
      }

      return nextModuleAsyncIterator
        .next()
        .then(async (response) => {
          if (!response.done) {
            const moduleName = response.value;
            await this.loadIndividualModule(moduleName);

            // if no tests were added, request the next module
            if (this._qunit.config.queue.length === 0) {
              return nextModuleHandler();
            }
          }
        })
        .catch((e) => {
          if (
            typeof e === 'object' &&
            e !== null &&
            typeof e.message === 'string'
          ) {
            e.message = `EmberExam: Failed to get next test module: ${e.message}`;
          }
          throw new Error(`EmberExam: Failed to get next test module: ${e}`);
        });
    };

    // it registers qunit begin callback to ask for a next test moudle to execute when the test suite begins.
    // By default ember-qunit adds `Ember.onerror` test to a qunit processing queue and once the test is complete it execute _qunit.moduleDone callback.
    // However, when `setupEmberOnerrorValidation: false` is passed the test is disabled and _qunit.begin callback needs to request a next test module to run.
    this._qunit.begin(() => {
      return nextModuleHandler();
    });

    this._qunit.moduleDone(() => {
      return nextModuleHandler();
    });
  }

  /**
   * setupModuleMetadataHandler() register QUnit callback to enable generating module metadata file.
   *
   * @method setupModuleMetadataHandler
   */
  setupModuleMetadataHandler() {
    this._qunit.testDone((metadata) => {
      if (typeof this._testem !== 'undefined' && this._testem !== null) {
        // testem:test-done-metadata is sent to server to track test module details.
        // metadata contains name, module, failed, passed, total, duration, skipped, and todo.
        // https://api.qunitjs.com/callbacks/QUnit.testDone
        this._testem.emit('testem:test-done-metadata', metadata);
      }
    });
  }

  shouldLoadModule(moduleName) {
    return moduleName.match(/[-_]test$/);
  }

  /**
   * Make unsee a no-op to avoid any unwanted resets
   *
   * @method unsee
   */
  unsee() {}

  unseeSuper(moduleName) {
    if (typeof require.unsee === 'function') {
      require.unsee(moduleName);
    } else if (!this._didLogMissingUnsee) {
      this._didLogMissingUnsee = true;
      if (typeof console !== 'undefined') {
        console.warn(
          'unable to require.unsee, please upgrade loader.js to >= v3.3.0',
        );
      }
    }
  }
}
