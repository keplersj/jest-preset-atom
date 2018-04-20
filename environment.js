"use strict";

const mock = require('jest-mock');
const {FakeTimers, installCommonGlobals} = require('jest-util');

class AtomEnvironment {
  constructor(config) {
    const global = (this.global = window);
    installCommonGlobals(global, config.globals);
    this.moduleMocker = new mock.ModuleMocker(global);
    this.fakeTimers = new FakeTimers({
      config,
      global,
      moduleMocker: this.moduleMocker,
    });
  }

  setup() {
    return Promise.resolve();
  }

  teardown() {
    return Promise.resolve();
  }

  runScript(script) {
    return script.runInThisContext();
  }
}

module.exports = AtomEnvironment;
